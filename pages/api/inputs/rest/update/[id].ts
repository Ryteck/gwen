import { NextApiHandler } from 'next'
import * as Yup from 'yup'
import inputController from '../../../../../controllers/inputController'
import outputController from '../../../../../controllers/outputController'
import inputView from '../../../../../views/inputView'

const validate = async (item: string, origin: string, quantity: number): Promise<void> => {
  const data = { item, origin, quantity }

  const schema = Yup.object().shape({
    item: Yup.string().required(),
    origin: Yup.string().required(),
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

  return quantity > positive - negative
}

const handle: NextApiHandler = async (req, res) => {
  try {
    const id = String(req.query.id)
    const { item, origin, quantity } = req.body

    await validate(item, origin, quantity)

    const originalInput = await inputController.show(id)

    if (originalInput.item === item) {
      const calc = originalInput.quantity - quantity
      if (calc > 0) {
        if (await willNegative(item, calc)) {
          throw 'item cannot be negative'
        }
      }
    } else {
      if (await willNegative(String(originalInput.item), quantity)) {
        throw 'item cannot be negative'
      }
    }

    const tempNewInput = { ...originalInput, item, origin, quantity }

    await inputController.update(
      id,
      tempNewInput.item,
      tempNewInput.origin,
      tempNewInput.quantity,
      tempNewInput.user,
      tempNewInput.when
    )

    const newInput = await inputController.show(id)
    res.status(200).json({ input: await inputView.render(newInput) })
  } catch (error) {
    res.status(200).json({ error: String(error) })
  }
}

export default handle
