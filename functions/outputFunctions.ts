import ItemInterface from '../interfaces/itemInterface'
import redis from '../libs/redis'
import redisConfig from '../config/redisConfig'

const { listOutputs } = redisConfig.tables.output

const formatHashId = (id: string | number): string =>
    `output:${id}`

const getAllItems = async (): Promise<Array<ItemInterface>> =>
    Object(await Promise
      .all((await redis.smembers(listOutputs))
        .map(async id => await redis
          .hgetall(formatHashId(id))))) as Array<ItemInterface>

const isMemberId = async (id: string | number): Promise<boolean> =>
  await redis.sismember(listOutputs, String(id)) === 1

const isMemberName = async (name: string): Promise<ItemInterface> =>
  (await getAllItems()).find(item => item.name === name)

export default { formatHashId, getAllItems, isMemberId, isMemberName }
