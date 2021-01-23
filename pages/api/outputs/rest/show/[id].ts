import { NextApiHandler } from 'next'
import outputController from '../../../../../controllers/outputController'
import outputView from '../../../../../views/outputView'

const handle: NextApiHandler = async (req, res) => {
  try {
    const id = String(req.query.id)
    const output = await outputController.show(id)
    res.status(200).json({ output: await outputView.render(output) })
  } catch (error) {
    res.status(200).json({ error: String(error) })
  }
}

export default handle
