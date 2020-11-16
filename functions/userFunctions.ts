import UserInterface from '../interfaces/userInterface'
import redis from '../libs/redis'
import userConfig from '../config/userConfig'

const { listUsers } = userConfig

const formatHashId = (id: string | number): string =>
    `user:${id}`

const getAllUsers = async (): Promise<Array<UserInterface>> =>
    Object(await Promise
      .all((await redis.smembers(listUsers))
        .map(async id => await redis
          .hgetall(formatHashId(id))))) as Array<UserInterface>

const isMemberId = async (id: string | number): Promise<boolean> =>
  await redis.sismember(listUsers, String(id)) === 1

const isMemberUsername = async (username: string): Promise<UserInterface> =>
  (await getAllUsers()).find(user => user.username === username)

export default { formatHashId, getAllUsers, isMemberId, isMemberUsername }
