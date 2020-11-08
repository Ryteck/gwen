import { NextApiHandler } from 'next'
import userController from '../../../controllers/userController'
import methodNotFoundError from '../../../errors/methodNotFoundError'

const { index, store } = userController

const handle: NextApiHandler = async (req, res) => {
  const { method } = req
  switch (method) {
    case 'GET':
      index(req, res)
      break
    case 'POST':
      store(req, res)
      break
    default:
      methodNotFoundError(req, res)
      break
  }
}

export default handle
