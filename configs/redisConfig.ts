export default {
  host: String(process.env.REDIS_HOST),
  port: Number(process.env.REDIS_PORT),
  pass: String(process.env.REDIS_PASS)
}
