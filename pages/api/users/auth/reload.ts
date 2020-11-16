import { NextApiHandler } from 'next'
import jwt from '../../../../libs/jwt'

const handle: NextApiHandler = async (req, res) => {
  try {
    const { token } = req.body
    const data = jwt.valideToken(token)
    return res.status(200).json({ data })
  } catch (error) {
    return res.status(200).json({ error: String(error) })
  }
}

export default handle
