import Redis from 'ioredis'
import redisConfig from '../config/redisConfig'

const { host, port, pass } = redisConfig

const redis = new Redis({
  host: host,
  port: port,
  password: pass,
  family: 4,
  db: 1
})

export default redis
