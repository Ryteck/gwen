import OutputInterface from '../interfaces/outputInterface'
import redis from '../libs/redis'
import redisConfig from '../config/redisConfig'

const { listOutputs } = redisConfig.tables.output

const formatHashId = (id: string | number): string =>
    `output:${id}`

const getAllOutputs = async (): Promise<Array<OutputInterface>> =>
    Object(await Promise
      .all((await redis.smembers(listOutputs))
        .map(async id => await redis
          .hgetall(formatHashId(id))))) as Array<OutputInterface>

const isMemberId = async (id: string | number): Promise<boolean> =>
  await redis.sismember(listOutputs, String(id)) === 1

export default { formatHashId, getAllOutputs, isMemberId }
