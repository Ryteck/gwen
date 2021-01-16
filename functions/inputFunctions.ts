import InputInterface from '../interfaces/inputInterface'
import redis from '../libs/redis'
import redisConfig from '../config/redisConfig'

const { listInputs } = redisConfig.tables.input

const formatHashId = (id: string | number): string =>
    `input:${id}`

const getAllInputs = async (): Promise<Array<InputInterface>> =>
    Object(await Promise
      .all((await redis.smembers(listInputs))
        .map(async id => await redis
          .hgetall(formatHashId(id))))) as Array<InputInterface>

const isMemberId = async (id: string | number): Promise<boolean> =>
  await redis.sismember(listInputs, String(id)) === 1

export default { formatHashId, getAllInputs, isMemberId }
