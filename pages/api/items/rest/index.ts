import { NextApiHandler } from 'next'
import itemController from '../../../../controllers/itemController'
import itemView from '../../../../views/itemView'

const handle: NextApiHandler = async (req, res) => {
  try {
    const items = await itemController.index()
    res.status(200).json({ items: await itemView.renderMany(items) })
  } catch (error) {
    res.status(200).json({ error: String(error) })
  }
}

export default handle
