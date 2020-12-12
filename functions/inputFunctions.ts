import ItemInterface from '../interfaces/itemInterface'
import redis from '../libs/redis'
import redisConfig from '../config/redisConfig'

const { listInputs } = redisConfig.tables.input

const formatHashId = (id: string | number): string =>
    `input:${id}`

const getAllItems = async (): Promise<Array<ItemInterface>> =>
    Object(await Promise
      .all((await redis.smembers(listInputs))
        .map(async id => await redis
          .hgetall(formatHashId(id))))) as Array<ItemInterface>

const isMemberId = async (id: string | number): Promise<boolean> =>
  await redis.sismember(listInputs, String(id)) === 1

const isMemberName = async (name: string): Promise<ItemInterface> =>
  (await getAllItems()).find(item => item.name === name)

export default { formatHashId, getAllItems, isMemberId, isMemberName }
