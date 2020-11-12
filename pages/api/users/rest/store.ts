import { NextApiHandler } from 'next'
import userController from '../../../../controllers/userController'
import * as Yup from 'yup'
import userView from '../../../../views/userView'

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
    await validate(username, firstname, lastname)
    await userController.store(username, firstname, lastname)
    const user = await userController.show(username as string)
    res.status(200).json(userView.render(user))
  } catch (error) {
    res.status(500).json({ error: String(error) })
  }
}

export default handle
