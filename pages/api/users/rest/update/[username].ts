import { NextApiHandler } from 'next'
import userController from '../../../../../controllers/userController'
import * as Yup from 'yup'
import userView from '../../../../../views/userView'

const validate = async (newUsername: string, newFirstname: string, newLastname: string): Promise<void> => {
  const data = { newUsername, newFirstname, newLastname }

  const schema = Yup.object().shape({
    newUsername: Yup.string().required(),
    newFirstname: Yup.string().required(),
    newLastname: Yup.string().required()
  })

  await schema.validate(data, { abortEarly: false })
}

const handle: NextApiHandler = async (req, res) => {
  try {
    const { username } = req.query
    const { newUsername, newFirstname, newLastname } = req.body
    await validate(newUsername, newFirstname, newLastname)
    const originalUser = await userController.show(username as string)
    const tempNewUser = { ...originalUser, username: newUsername, firstname: newFirstname, lastname: newLastname }
    await userController.update(
      username as string,
      tempNewUser.username,
      tempNewUser.firstname,
      tempNewUser.lastname,
      tempNewUser.password,
      tempNewUser.avatar,
      tempNewUser.administrador
    )
    const newUser = await userController.show(newUsername)
    res.status(200).json(userView.render(newUser))
  } catch (error) {
    res.status(500).json({ error: String(error) })
  }
}

export default handle
