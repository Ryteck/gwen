import redis from '../libs/redis'
import redisConfig from '../config/redisConfig'
import userFunctions from '../functions/userFunctions'
import UserInterface from '../interfaces/userInterface'

const { listUsers } = redisConfig.tables.user

const index = async (): Promise<Array<UserInterface>> =>
  await userFunctions.getAllUsers()

const show = async (id: string | number): Promise<UserInterface> => {
  if (!await userFunctions.isMemberId(id)) {
    throw 'id não encontrado'
  }
  return Object(await redis.hgetall(userFunctions.formatHashId(id))) as UserInterface
}

const store = async (
  id: string | number,
  username: string,
  firstname: string,
  lastname: string,
  password: string,
  avatar: string,
  administrador: 'true' | 'false'
): Promise<void> => {
  if (await userFunctions.isMemberUsername(username)) {
    throw 'username já existe'
  }

  const hashId = userFunctions.formatHashId(id)

  await redis
    .multi()
    .sadd(listUsers, id)
    .hset(hashId, 'id', id)
    .hset(hashId, 'username', username)
    .hset(hashId, 'firstname', firstname)
    .hset(hashId, 'lastname', lastname)
    .hset(hashId, 'password', password)
    .hset(hashId, 'avatar', avatar)
    .hset(hashId, 'administrador', administrador)
    .exec()
}

const update = async (
  id: string | number,
  username: string,
  firstname: string,
  lastname: string,
  password: string,
  avatar: string,
  administrador: boolean | 'true' | 'false'
): Promise<void> => {
  if (!await userFunctions.isMemberId(id)) {
    throw 'id não encontrado'
  }
  const hashId = userFunctions.formatHashId(id)

  const originalUser = Object(await redis.hgetall(hashId)) as UserInterface

  if (originalUser.username !== username) {
    if (await userFunctions.isMemberUsername(username)) {
      throw 'username já existe'
    }
  }

  await redis
    .multi()
    .hset(hashId, 'username', username)
    .hset(hashId, 'firstname', firstname)
    .hset(hashId, 'lastname', lastname)
    .hset(hashId, 'password', password)
    .hset(hashId, 'avatar', avatar)
    .hset(hashId, 'administrador', String(administrador))
    .exec()
}

const destroy = async (id: string | number): Promise<void> => {
  if (!await userFunctions.isMemberId(id)) {
    throw 'id não encontrado'
  }

  await redis
    .multi()
    .srem(listUsers, id)
    .del(userFunctions.formatHashId(id))
    .exec()
}

export default { index, show, store, update, destroy }
