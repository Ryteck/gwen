import { NextApiHandler } from 'next'
import outputController from '../../../../controllers/outputController'
import * as Yup from 'yup'
import outputView from '../../../../views/outputView'
import idHelper from '../../../../helpers/idHelper'
import userFunctions from '../../../../functions/userFunctions'
import itemFunctions from '../../../../functions/itemFunctions'
import inputController from '../../../../controllers/inputController'

const validate = async (item: string, destiny: string, quantity: number, user: string): Promise<void> => {
  const data = { item, destiny, quantity, user }

  const schema = Yup.object().shape({
    item: Yup.string().required(),
    destiny: Yup.string().required(),
    quantity: Yup.number().required().positive(),
    user: Yup.string().required()
  })

  await schema.validate(data, { abortEarly: false })
}

const willNegative = async (id: string, quantity: number): Promise<boolean> => {
  const inputs = await inputController.index()
  const outputs = await outputController.index()

  const positive = inputs.reduce((acc, cur) => {
    let ret = acc
    if (cur.item === String(id)) {
      ret += Number(cur.quantity)
    }
    return ret
  }, 0)

  const negative = outputs.reduce((acc, cur) => {
    let ret = acc
    if (cur.item === String(id)) {
      ret += Number(cur.quantity)
    }
    return ret
  }, 0)

  return quantity > positive - negative
}

const handle: NextApiHandler = async (req, res) => {
  try {
    const { item, destiny, quantity, user } = req.body

    await validate(item, destiny, quantity, user)

    if (!(await userFunctions.isMemberId(user))) {
      throw 'user not found'
    }

    if (!(await itemFunctions.isMemberId(item))) {
      throw 'item not found'
    }

    if ((await willNegative(item, quantity))) {
      throw 'item cannot be negative'
    }

    const id = await idHelper.generateNewId()

    const when = new Date()

    await outputController.store(
      id,
      item,
      destiny,
      quantity,
      user,
      when
    )

    const input = await outputController.show(id)
    res.status(200).json({ input: await outputView.render(input) })
  } catch (error) {
    res.status(200).json({ error: String(error) })
  }
}

export default handle
