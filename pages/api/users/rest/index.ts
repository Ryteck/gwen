import { NextApiHandler } from 'next'
import userController from '../../../../controllers/userController'
import userView from '../../../../views/userView'

const handle: NextApiHandler = async (req, res) => {
  try {
    const users = await userController.index()
    res.status(200).json({ users: userView.renderMany(users) })
  } catch (error) {
    res.status(200).json({ error: String(error) })
  }
}

export default handle
