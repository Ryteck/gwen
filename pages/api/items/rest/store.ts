import { NextApiHandler } from 'next'
import itemController from '../../../../controllers/itemController'
import * as Yup from 'yup'
import itemView from '../../../../views/itemView'
import idHelper from '../../../../helpers/idHelper'
import userFunctions from '../../../../functions/userFunctions'

const validate = async (name: string, user: string): Promise<void> => {
  const data = { name, user }

  const schema = Yup.object().shape({
    name: Yup.string().required(),
    user: Yup.string().required()
  })

  await schema.validate(data, { abortEarly: false })
}

const handle: NextApiHandler = async (req, res) => {
  try {
    const { name, user } = req.body

    await validate(name, user)

    if (!userFunctions.isMemberId(user)) {
      throw 'user not found'
    }

    const id = await idHelper.generateNewId()

    const moment = new Date()

    await itemController.store(
      id,
      name,
      user,
      moment
    )

    const item = await itemController.show(id)
    res.status(200).json({ item: itemView.render(item) })
  } catch (error) {
    res.status(200).json({ error: String(error) })
  }
}

export default handle
