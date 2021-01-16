import { NextApiHandler } from 'next'
import inputController from '../../../../controllers/inputController'
import * as Yup from 'yup'
import inputView from '../../../../views/inputView'
import idHelper from '../../../../helpers/idHelper'
import userFunctions from '../../../../functions/userFunctions'
import itemFunctions from '../../../../functions/itemFunctions'

const validate = async (item: string, origin: string, quantity: number, user: string): Promise<void> => {
  const data = { item, origin, quantity, user }

  const schema = Yup.object().shape({
    item: Yup.string().required(),
    origin: Yup.string().required(),
    quantity: Yup.number().required(),
    user: Yup.string().required()
  })

  await schema.validate(data, { abortEarly: false })
}

const handle: NextApiHandler = async (req, res) => {
  try {
    const { item, origin, quantity, user } = req.body

    await validate(item, origin, quantity, user)

    if (!(await userFunctions.isMemberId(user))) {
      throw 'user not found'
    }

    if (!(await itemFunctions.isMemberId(item))) {
      throw 'item not found'
    }

    const id = await idHelper.generateNewId()

    const when = new Date()

    await inputController.store(
      id,
      item,
      origin,
      quantity,
      user,
      when
    )

    const input = await inputController.show(id)
    res.status(200).json({ input: await inputView.render(input) })
  } catch (error) {
    res.status(200).json({ error: String(error) })
  }
}

export default handle
