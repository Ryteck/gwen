import { NextApiHandler } from 'next'
import outputController from '../../../../controllers/outputController'
import outputView from '../../../../views/outputView'

const handle: NextApiHandler = async (req, res) => {
  try {
    const outputs = await outputController.index()
    res.status(200).json({ outputs: await outputView.renderMany(outputs) })
  } catch (error) {
    res.status(200).json({ error: String(error) })
  }
}

export default handle
