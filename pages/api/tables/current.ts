import { NextApiHandler } from 'next'
import inputController from '../../../controllers/inputController'
import itemController from '../../../controllers/itemController'
import outputController from '../../../controllers/outputController'
import itemView from '../../../views/itemView'

const handle: NextApiHandler = async (req, res) => {
  try {
    const inputs = await inputController.index()
    const outputs = await outputController.index()

    const items = (await itemView.renderMany(await itemController.index()))
      .map(item => {
        const positive = inputs.reduce((acc, cur) => {
          let ret = acc
          if (cur.item === String(item.id)) {
            ret += Number(cur.quantity)
          }
          return ret
        }, 0)

        const negative = outputs.reduce((acc, cur) => {
          let ret = acc
          if (cur.item === String(item.id)) {
            ret += Number(cur.quantity)
          }
          return ret
        }, 0)

        return {
          ...item,
          quantity: positive - negative
        }
      })

    res.status(200).json({ table: 'current', items })
  } catch (error) {
    res.status(200).json({ error: String(error) })
  }
}

export default handle
