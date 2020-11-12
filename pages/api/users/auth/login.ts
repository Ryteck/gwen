import { NextApiHandler } from 'next'
import crypto from '../../../../libs/crypto'
import jwt from '../../../../libs/jwt'
import redis from '../../../../libs/redisLib'
import UserModel from '../../../../models/userModel'
import userView from '../../../../views/userView'

const handle: NextApiHandler = async (req, res) => {
  try {
    const { username, password, high } = req.body

    const isMember = await redis.sismember('set-users', username)

    if (isMember === 0) {
      throw 'username não encontrado'
    }

    const user = Object(await redis.hgetall(`user:${username}`)) as UserModel

    if (crypto.valideHash(password, user.password)) {
      const token = jwt.generateToken(jwt.generateDataToken(user), high)

      return res.status(200).json({ user: userView.render(user), token })
    } else {
      throw 'wrong password'
    }
  } catch (error) {
    return res.status(500).json({ error: String(error) })
  }
}

export default handle
