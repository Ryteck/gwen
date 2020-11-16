import UserModel from '../models/userModel'
import redis from '../libs/redis'

const listUsers = 'set-users'

const formatHashId = (id: string | number): string =>
    `user:${id}`

const getAllUsers = async (): Promise<Array<UserModel>> =>
    Object(await Promise
      .all((await redis.smembers(listUsers))
        .map(async id => await redis
          .hgetall(formatHashId(id))))) as Array<UserModel>

const isMemberId = async (id: string | number): Promise<boolean> =>
  await redis.sismember(listUsers, String(id)) === 1

const isMemberUsername = async (username: string): Promise<UserModel> =>
  (await getAllUsers()).find(user => user.username === username)

export default { formatHashId, getAllUsers, isMemberId, isMemberUsername }
