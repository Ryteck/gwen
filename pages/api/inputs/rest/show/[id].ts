import { NextApiHandler } from 'next'
import inputController from '../../../../../controllers/inputController'
import inputView from '../../../../../views/inputView'

const handle: NextApiHandler = async (req, res) => {
  try {
    const id = String(req.query.id)
    const input = await inputController.show(id)
    res.status(200).json({ input: await inputView.render(input) })
  } catch (error) {
    res.status(200).json({ error: String(error) })
  }
}

export default handle
