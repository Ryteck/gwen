import { NextApiHandler } from 'next'
import userController from '../../../../../controllers/userController'
import userView from '../../../../../views/userView'

const handle: NextApiHandler = async (req, res) => {
  try {
    const id = String(req.query.id)
    const user = await userController.show(id)
    res.status(200).json({ user: userView.render(user) })
  } catch (error) {
    res.status(200).json({ error: String(error) })
  }
}

export default handle
