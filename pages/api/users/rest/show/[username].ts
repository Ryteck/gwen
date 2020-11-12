import { NextApiHandler } from 'next'
import userController from '../../../../../controllers/userController'
import userView from '../../../../../views/userView'

const handle: NextApiHandler = async (req, res) => {
  try {
    const { username } = req.query
    const user = await userController.show(username as string)
    res.status(200).json(userView.render(user))
  } catch (error) {
    res.status(500).json({ error: String(error) })
  }
}

export default handle
