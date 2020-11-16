import { NextApiHandler } from 'next'
import userController from '../../../../../controllers/userController'
import * as Yup from 'yup'
import userView from '../../../../../views/userView'

const validate = async (username: string, firstname: string, lastname: string): Promise<void> => {
  const data = { username, firstname, lastname }

  const schema = Yup.object().shape({
    username: Yup.string().required(),
    firstname: Yup.string().required(),
    lastname: Yup.string().required()
  })

  await schema.validate(data, { abortEarly: false })
}

const handle: NextApiHandler = async (req, res) => {
  try {
    const id = String(req.query.id)
    const { username, firstname, lastname } = req.body
    await validate(username, firstname, lastname)
    const originalUser = await userController.show(id)
    const tempNewUser = { ...originalUser, username: username, firstname: firstname, lastname: lastname }
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
    res.status(200).json(userView.render(newUser))
  } catch (error) {
    res.status(200).json({ error: String(error) })
  }
}

export default handle
