import redis from '../libs/redis'

const idKey = 'globalId'

const generateNewId = async () => await redis.incr(idKey)

export default { generateNewId }
