import redis from '../libs/redis'
import redisConfig from '../config/redisConfig'
import inputFunctions from '../functions/inputFunctions'
import InputInterface from '../interfaces/inputInterface'

const { listInputs } = redisConfig.tables.input

const index = async (): Promise<Array<InputInterface>> =>
  await inputFunctions.getAllInputs()

const show = async (id: string | number): Promise<InputInterface> => {
  if (!await inputFunctions.isMemberId(id)) {
    throw 'id não encontrado'
  }
  return Object(await redis.hgetall(inputFunctions.formatHashId(id)))
}

const store = async (
  id: string | number,
  item: string | number,
  origin: string,
  quantity: number,
  user: string | number,
  when: Date
): Promise<void> => {
  const hashId = inputFunctions.formatHashId(id)

  await redis
    .multi()
    .sadd(listInputs, id)
    .hset(hashId, 'id', id)
    .hset(hashId, 'item', item)
    .hset(hashId, 'origin', origin)
    .hset(hashId, 'quantity', quantity)
    .hset(hashId, 'user', user)
    .hset(hashId, 'when', String(when))
    .exec()
}

const update = async (
  id: string | number,
  item: string | number,
  origin: string,
  quantity: number,
  user: string | number,
  when: Date
): Promise<void> => {
  if (!await inputFunctions.isMemberId(id)) {
    throw 'id não encontrado'
  }
  const hashId = inputFunctions.formatHashId(id)

  await redis
    .multi()
    .hset(hashId, 'id', id)
    .hset(hashId, 'item', item)
    .hset(hashId, 'origin', origin)
    .hset(hashId, 'quantity', quantity)
    .hset(hashId, 'user', user)
    .hset(hashId, 'when', String(when))
    .exec()
}

const destroy = async (id: string | number): Promise<void> => {
  if (!await inputFunctions.isMemberId(id)) {
    throw 'id não encontrado'
  }

  await redis
    .multi()
    .srem(listInputs, id)
    .del(inputFunctions.formatHashId(id))
    .exec()
}

export default { index, show, store, update, destroy }
