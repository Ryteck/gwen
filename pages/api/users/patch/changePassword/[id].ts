import { NextApiHandler } from 'next'
import userController from '../../../../../controllers/userController'
import UserInterface from '../../../../../interfaces/userInterface'
import userView from '../../../../../views/userView'
import hash from '../../../../../libs/hash'

const handle: NextApiHandler = async (req, res) => {
  try {
    const id = String(req.query.id)
    const { password } = req.body
    const originalUser = await userController.show(id)
    const tempNewUser: UserInterface = { ...originalUser, password: hash.generateHash(password) }
    await userController.update(
      id,
      tempNewUser.username,
      tempNewUser.firstname,
      tempNewUser.lastname,
      tempNewUser.password,
      tempNewUser.avatar,
      tempNewUser.administrador
    )
    const newUser = await userController.show(id)
    res.status(200).json({ user: userView.render(newUser) })
  } catch (error) {
    res.status(200).json({ error: String(error) })
  }
}

export default handle
