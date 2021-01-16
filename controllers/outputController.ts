import redis from '../libs/redis'
import redisConfig from '../config/redisConfig'
import outputFunctions from '../functions/outputFunctions'
import OutputInterface from '../interfaces/outputInterface'

const { listOutputs } = redisConfig.tables.output

const index = async (): Promise<Array<OutputInterface>> =>
  await outputFunctions.getAllOutputs()

const show = async (id: string | number): Promise<OutputInterface> => {
  if (!await outputFunctions.isMemberId(id)) {
    throw 'id não encontrado'
  }
  return Object(await redis.hgetall(outputFunctions.formatHashId(id)))
}

const store = async (
  id: string | number,
  item: string | number,
  destiny: string,
  quantity: number,
  user: string | number,
  when: Date
): Promise<void> => {
  const hashId = outputFunctions.formatHashId(id)

  await redis
    .multi()
    .sadd(listOutputs, id)
    .hset(hashId, 'id', id)
    .hset(hashId, 'item', item)
    .hset(hashId, 'destiny', destiny)
    .hset(hashId, 'quantity', quantity)
    .hset(hashId, 'user', user)
    .hset(hashId, 'when', String(when))
    .exec()
}

const update = async (
  id: string | number,
  item: string | number,
  destiny: string,
  quantity: number,
  user: string | number,
  when: Date
): Promise<void> => {
  if (!await outputFunctions.isMemberId(id)) {
    throw 'id não encontrado'
  }
  const hashId = outputFunctions.formatHashId(id)

  await redis
    .multi()
    .hset(hashId, 'id', id)
    .hset(hashId, 'item', item)
    .hset(hashId, 'destiny', destiny)
    .hset(hashId, 'quantity', quantity)
    .hset(hashId, 'user', user)
    .hset(hashId, 'when', String(when))
    .exec()
}

const destroy = async (id: string | number): Promise<void> => {
  if (!await outputFunctions.isMemberId(id)) {
    throw 'id não encontrado'
  }

  await redis
    .multi()
    .srem(listOutputs, id)
    .del(outputFunctions.formatHashId(id))
    .exec()
}

export default { index, show, store, update, destroy }
