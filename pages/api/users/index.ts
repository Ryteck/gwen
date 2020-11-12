import { NextApiHandler } from 'next'
import methodNotFoundError from '../../../errors/methodNotFoundError'
import userController from '../../../controllers/userController'

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
