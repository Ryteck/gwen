import { NextApiHandler } from 'next'
import inputController from '../../../../controllers/inputController'
import inputView from '../../../../views/inputView'

const handle: NextApiHandler = async (req, res) => {
  try {
    const inputs = await inputController.index()
    res.status(200).json({ inputs: await inputView.renderMany(inputs) })
  } catch (error) {
    res.status(200).json({ error: String(error) })
  }
}

export default handle
