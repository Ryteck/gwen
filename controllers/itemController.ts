import redis from '../libs/redis'
import itemConfig from '../config/itemConfig'
import itemFunctions from '../functions/itemFunctions'
import ItemInterface from '../interfaces/itemInterface'

const { listItems } = itemConfig

const index = async (): Promise<Array<ItemInterface>> =>
  await itemFunctions.getAllItems()

const show = async (id: string | number): Promise<ItemInterface> => {
  if (!await itemFunctions.isMemberId(id)) {
    throw 'id não encontrado'
  }
  return Object(await redis.hgetall(itemFunctions.formatHashId(id))) as ItemInterface
}

const store = async (
  id: string | number,
  name: string,
  user: string | number,
  when: Date
): Promise<void> => {
  if (await itemFunctions.isMemberName(name)) {
    throw 'nome já existe'
  }

  const hashId = itemFunctions.formatHashId(id)

  await redis
    .multi()
    .sadd(listItems, id)
    .hset(hashId, 'id', id)
    .hset(hashId, 'name', name)
    .hset(hashId, 'user', user)
    .hset(hashId, 'when', String(when))
    .exec()
}

const update = async (
  id: string | number,
  name: string,
  user: string | number,
  when: Date
): Promise<void> => {
  if (!await itemFunctions.isMemberId(id)) {
    throw 'id não encontrado'
  }
  const hashId = itemFunctions.formatHashId(id)

  const originalItem = Object(await redis.hgetall(hashId)) as ItemInterface

  if (originalItem.name !== name) {
    if (await itemFunctions.isMemberName(name)) {
      throw 'nome já existe'
    }
  }

  await redis
    .multi()
    .hset(hashId, 'id', id)
    .hset(hashId, 'name', name)
    .hset(hashId, 'user', user)
    .hset(hashId, 'when', String(when))
    .exec()
}

const destroy = async (id: string | number): Promise<void> => {
  if (!await itemFunctions.isMemberId(id)) {
    throw 'id não encontrado'
  }

  await redis
    .multi()
    .srem(listItems, id)
    .del(itemFunctions.formatHashId(id))
    .exec()
}

export default { index, show, store, update, destroy }
