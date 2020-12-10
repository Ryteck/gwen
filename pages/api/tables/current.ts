import { NextApiHandler } from 'next'
import itemController from '../../../controllers/itemController'
import itemView from '../../../views/itemView'

const handle: NextApiHandler = async (req, res) => {
  try {
    const items =
    (await itemView
      .renderMany(await itemController.index()))
      .map(item => ({ ...item, quantity: 0 }))

    res.status(200).json({ table: 'current', items })
  } catch (error) {
    res.status(200).json({ error: String(error) })
  }
}

export default handle
