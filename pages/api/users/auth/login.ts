import { NextApiHandler } from 'next'
import userFunctions from '../../../../functions/userFunctions'
import crypto from '../../../../libs/crypto'
import jwt from '../../../../libs/jwt'
import userView from '../../../../views/userView'

const handle: NextApiHandler = async (req, res) => {
  try {
    const { username, password, high } = req.body

    const user = await userFunctions.isMemberUsername(username)

    if (!user) {
      throw 'username não encontrado'
    }

    if (!crypto.valideHash(password, user.password)) {
      throw 'password errada'
    }

    const token = jwt.generateToken(jwt.generateDataToken(user), high)
    return res.status(200).json({ user: userView.render(user), token })
  } catch (error) {
    return res.status(500).json({ error: String(error) })
  }
}

export default handle
