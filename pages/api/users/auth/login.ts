import { NextApiHandler } from 'next'
import userFunctions from '../../../../functions/userFunctions'
import hash from '../../../../libs/hash'
import jwt from '../../../../libs/jwt'
import userView from '../../../../views/userView'

const handle: NextApiHandler = async (req, res) => {
  try {
    const { username, password, high } = req.body

    if (username === 'root') {
      if (!hash.valideRootPassword(password)) {
        throw 'password errada'
      }
      return res.status(200).json({ token: jwt.generateRootToken(high) })
    }

    const user = await userFunctions.isMemberUsername(username)

    if (!user) {
      throw 'username não encontrado'
    }

    if (!hash.valideHash(password, user.password)) {
      throw 'password errada'
    }

    const token = jwt.generateToken(jwt.generateDataToken(user), high)
    return res.status(200).json({ user: userView.render(user), token })
  } catch (error) {
    return res.status(200).json({ error: String(error) })
  }
}

export default handle
