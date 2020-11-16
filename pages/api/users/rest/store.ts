import { NextApiHandler } from 'next'
import userController from '../../../../controllers/userController'
import * as Yup from 'yup'
import userView from '../../../../views/userView'
import crypto from '../../../../libs/crypto'
import idHelper from '../../../../helpers/idHelper'

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
    const { username, firstname, lastname } = req.body

    if (username === 'root') {
      throw 'o usuário com username root não pode ser criado'
    }

    await validate(username, firstname, lastname)

    const id = await idHelper.generateNewId()
    await userController.store(
      id,
      username,
      firstname,
      lastname,
      crypto.generateDefaultPassword(),
      'default_avatar.jpg',
      'false'
    )
    const user = await userController.show(id)
    res.status(200).json(userView.render(user))
  } catch (error) {
    res.status(200).json({ error: String(error) })
  }
}

export default handle
