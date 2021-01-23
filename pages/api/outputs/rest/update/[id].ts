import { NextApiHandler } from 'next'
import * as Yup from 'yup'
import inputController from '../../../../../controllers/inputController'
import outputController from '../../../../../controllers/outputController'
import outputView from '../../../../../views/outputView'

const validate = async (item: string, destiny: string, quantity: number): Promise<void> => {
  const data = { item, destiny, quantity }

  const schema = Yup.object().shape({
    item: Yup.string().required(),
    destiny: Yup.string().required(),
    quantity: Yup.number().required().positive()
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

  console.log(quantity, positive, negative)
  return quantity > positive - negative
}

const handle: NextApiHandler = async (req, res) => {
  try {
    const id = String(req.query.id)
    const { item, destiny, quantity } = req.body

    await validate(item, destiny, quantity)

    const originalOutput = await outputController.show(id)

    if (originalOutput.item === item) {
      const calc = quantity - originalOutput.quantity
      if (calc > 0) {
        if (await willNegative(item, calc)) {
          throw 'item cannot be negative'
        }
      }
    } else {
      if (await willNegative(item, quantity)) {
        throw 'item cannot be negative'
      }
    }

    const tempNewOutput = { ...originalOutput, item, destiny, quantity }

    await outputController.update(
      id,
      tempNewOutput.item,
      tempNewOutput.destiny,
      tempNewOutput.quantity,
      tempNewOutput.user,
      tempNewOutput.when
    )

    const newOutput = await outputController.show(id)
    res.status(200).json({ input: await outputView.render(newOutput) })
  } catch (error) {
    res.status(200).json({ error: String(error) })
  }
}

export default handle
