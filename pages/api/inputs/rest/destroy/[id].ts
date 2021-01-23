import { NextApiHandler } from 'next'
import inputController from '../../../../../controllers/inputController'
import outputController from '../../../../../controllers/outputController'

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

    const { item, quantity } = await inputController.show(id)

    if (await willNegative(String(item), quantity)) {
      throw 'item cannot be negative'
    }

    await inputController.destroy(id)
    res.status(200).json({ message: 'ok' })
  } catch (error) {
    res.status(200).json({ error: String(error) })
  }
}

export default handle
