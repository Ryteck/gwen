import { NextApiHandler } from 'next'
import userController from '../../../../../controllers/userController'

const handle: NextApiHandler = async (req, res) => {
  try {
    const id = String(req.query.id)
    await userController.destroy(id)
    res.status(200).json({ message: 'ok' })
  } catch (error) {
    res.status(500).json({ error: String(error) })
  }
}

export default handle
