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
          .hgetall(`user:${id}`)))) as Array<UserModel>
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

    const user = Object(await redis.hgetall(`user:${username}`)) as UserModel

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

    const hsetUsername = `user:${username}`

    await redis
      .multi()
      .sadd(listUsers, username)
      .hset(hsetUsername, 'username', username)
      .hset(hsetUsername, 'firstname', firstname)
      .hset(hsetUsername, 'lastname', lastname)
      .hset(hsetUsername, 'password', crypto.generateDefaultPassword())
      .hset(hsetUsername, 'avatar', 'default_avatar.jpg')
      .hset(hsetUsername, 'administrador', 'false')
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

    const hsetUsername = `user:${username}`

    if (id === username) {
      await redis
        .multi()
        .hset(hsetUsername, 'username', username)
        .hset(hsetUsername, 'firstname', firstname)
        .hset(hsetUsername, 'lastname', lastname)
        .exec()
      res.status(201).json(data)
    } else {
      isMember = await redis.sismember(listUsers, username)

      if (isMember === 1) {
        throw 'username já existe'
      }

      const hgetId = `user:${id}`

      await redis
        .multi()
        .sadd(listUsers, username)
        .hset(hsetUsername, 'username', username)
        .hset(hsetUsername, 'firstname', firstname)
        .hset(hsetUsername, 'lastname', lastname)
        .hset(hsetUsername, 'password', (await redis.hget(hgetId, 'password')))
        .hset(hsetUsername, 'avatar', (await redis.hget(hgetId, 'avatar')))
        .hset(hsetUsername, 'administrador', (await redis.hget(hgetId, 'administrador')))
        .srem(listUsers, id)
        .del(hgetId)
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
      .del(`user:${id}`)
      .exec()

    res.status(200).json({ message: 'ok' })
  } catch (error) {
    res.status(500).json({ error: String(error) })
  }
}

export default { index, show, store, update, destroy }
