import { NextApiHandler } from 'next'
import authenticationMiddleware from '../../../../middlewares/authenticationMiddleware'

const handle: NextApiHandler = async (req, res) => {
  try {
    await authenticationMiddleware(req)
    const { authorization } = req.body
    return res.status(200).json({ authorization })
  } catch (error) {
    return res.status(200).json({ error: String(error) })
  }
}

export default handle
