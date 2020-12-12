export default {
  connection: {
    host: String(process.env.REDIS_HOST),
    port: Number(process.env.REDIS_PORT),
    pass: String(process.env.REDIS_PASS)
  },
  tables: {
    user: {
      listUsers: 'set-users'
    },
    item: {
      listItems: 'set-items'
    },
    input: {
      listInputs: 'set-inputs'
    },
    output: {
      listOutputs: 'set-outputs'
    }
  }
}
