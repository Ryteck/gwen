import { NextApiHandler } from 'next'
import redis from '../libs/redisLib'
import * as Yup from 'yup'
import crypto from '../libs/crypto'
import UserModel from '../models/userModel'
import userView from '../views/userView'

const listUsers = 'set-users'

const index: NextApiHandler = async (req, res) => {
  try {
    crypto.generateHash('af')
    const usersIds = await redis.smembers(listUsers)
    const users = Object(await Promise
      .all(usersIds
        .map(async id => await redis
          .hgetall(id)))) as Array<UserModel>
    res.status(200).json(userView.renderMany(users))
  } catch (error) {
    res.status(500).json({ error: String(error) })
  }
}

const show: NextApiHandler = async (req, res) => {
  try {
    const { id } = req.query

    const username = id as string

    const isMember = await redis.sismember(listUsers, username)

    if (isMember === 0) {
      throw 'username não encontrado'
    }

    const user = Object(await redis.hgetall(username)) as UserModel

    res.status(200).json(userView.render(user))
  } catch (error) {
    res.status(500).json({ error: String(error) })
  }
}

const store: NextApiHandler = async (req, res) => {
  try {
    const { username, firstname, lastname } = req.body
    const data = { username, firstname, lastname }
    const schema = Yup.object().shape({
      username: Yup.string().required(),
      firstname: Yup.string().required(),
      lastname: Yup.string().required()
    })
    await schema.validate(data, { abortEarly: false })

    const isMember = await redis.sismember(listUsers, username)

    if (isMember === 1) {
      throw 'username já existe'
    }

    await redis
      .multi()
      .sadd(listUsers, username)
      .hset(username, 'username', username)
      .hset(username, 'firstname', firstname)
      .hset(username, 'lastname', lastname)
      .hset(username, 'password', crypto.generateDefaultPassword())
      .hset(username, 'avatar', 'default_avatar.jpg')
      .exec()
    res.status(201).json(data)
  } catch (error) {
    res.status(500).json({ error: String(error) })
  }
}

const update: NextApiHandler = async (req, res) => {
  try {
    const { id } = req.query
    const { username, firstname, lastname } = req.body
    const data = { username, firstname, lastname }
    const schema = Yup.object().shape({
      username: Yup.string().required(),
      firstname: Yup.string().required(),
      lastname: Yup.string().required()
    })
    await schema.validate(data, { abortEarly: false })

    let isMember = await redis.sismember(listUsers, id as string)

    if (isMember === 0) {
      throw 'username não existe'
    }

    if (id === username) {
      await redis
        .multi()
        .hset(username, 'username', username)
        .hset(username, 'firstname', firstname)
        .hset(username, 'lastname', lastname)
        .exec()
      res.status(201).json(data)
    } else {
      isMember = await redis.sismember(listUsers, username)

      if (isMember === 1) {
        throw 'username já existe'
      }

      await redis
        .multi()
        .sadd(listUsers, username)
        .hset(username, 'username', username)
        .hset(username, 'firstname', firstname)
        .hset(username, 'lastname', lastname)
        .hset(username, 'password', (await redis.hget(id as string, 'password')))
        .hset(username, 'avatar', (await redis.hget(id as string, 'avatar')))
        .srem(listUsers, id)
        .hdel(id as string, 'username', 'firstname', 'lastname', 'password', 'avatar')
        .exec()

      res.status(201).json(data)
    }
  } catch (error) {
    res.status(500).json({ error: String(error) })
  }
}

const destroy: NextApiHandler = async (req, res) => {
  try {
    const { id } = req.query

    const username = id as string

    const isMember = await redis.sismember(listUsers, username)

    if (isMember === 0) {
      throw 'username não encontrado'
    }

    await redis
      .multi()
      .srem(listUsers, id)
      .hdel(id as string, 'username', 'firstname', 'lastname', 'password', 'avatar')
      .exec()

    res.status(200).json({ message: 'ok' })
  } catch (error) {
    res.status(500).json({ error: String(error) })
  }
}

export default { index, show, store, update, destroy }
