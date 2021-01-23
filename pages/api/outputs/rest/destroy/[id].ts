import { NextApiHandler } from 'next'
import outputController from '../../../../../controllers/outputController'

const handle: NextApiHandler = async (req, res) => {
  try {
    const id = String(req.query.id)
    await outputController.destroy(id)
    res.status(200).json({ message: 'ok' })
  } catch (error) {
    res.status(200).json({ error: String(error) })
  }
}

export default handle
