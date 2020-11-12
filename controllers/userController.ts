import redis from '../libs/redisLib'
import crypto from '../libs/crypto'
import UserModel from '../models/userModel'

const listUsers = 'set-users'

const formatHashId = (username: string): string => `user:${username}`

const isMember = async (username: string): Promise<boolean> =>
  await redis.sismember(listUsers, username) === 1

const index = async (): Promise<Array<UserModel>> =>
  Object(await Promise
    .all((await redis.smembers(listUsers))
      .map(async username => await redis
        .hgetall(formatHashId(username))))) as Array<UserModel>

const show = async (username: string): Promise<UserModel> => {
  if (!await isMember(username)) {
    throw 'username não encontrado'
  }
  return Object(await redis.hgetall(formatHashId(username))) as UserModel
}

const store = async (username: string, firstname: string, lastname: string): Promise<void> => {
  if (await isMember(username)) {
    throw 'username já existe'
  }

  const id = formatHashId(username)

  await redis
    .multi()
    .sadd(listUsers, username)
    .hset(id, 'username', username)
    .hset(id, 'firstname', firstname)
    .hset(id, 'lastname', lastname)
    .hset(id, 'password', crypto.generateDefaultPassword())
    .hset(id, 'avatar', 'default_avatar.jpg')
    .hset(id, 'administrador', 'false')
    .exec()
}

const update = async (
  original: string,
  username: string,
  firstname: string,
  lastname: string,
  password: string,
  avatar: string,
  administrador: 'true' | 'false'
): Promise<void> => {
  if (!await isMember(original)) {
    throw 'username não encontrado'
  }

  if (original !== username) {
    if (await isMember(username)) {
      throw 'username já existe'
    }
  }

  const id = formatHashId(username)

  await redis
    .multi()
    .sadd(listUsers, username)
    .hset(id, 'username', username)
    .hset(id, 'firstname', firstname)
    .hset(id, 'lastname', lastname)
    .hset(id, 'password', crypto.generateHash(password))
    .hset(id, 'avatar', avatar)
    .hset(id, 'administrador', administrador)
    .srem(listUsers, original)
    .del(formatHashId(original))
    .exec()
}

const destroy = async (username: string): Promise<void> => {
  if (!await isMember(username)) {
    throw 'username não encontrado'
  }

  await redis
    .multi()
    .srem(listUsers, username)
    .del(formatHashId(username))
    .exec()
}

export default { index, show, store, update, destroy }
