import { NextApiHandler } from 'next'
import itemController from '../../../../../controllers/itemController'
import itemView from '../../../../../views/itemView'

const handle: NextApiHandler = async (req, res) => {
  try {
    const id = String(req.query.id)
    const item = await itemController.show(id)
    res.status(200).json({ item: itemView.render(item) })
  } catch (error) {
    res.status(200).json({ error: String(error) })
  }
}

export default handle
