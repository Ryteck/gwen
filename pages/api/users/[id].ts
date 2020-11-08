import { NextApiHandler } from 'next'
import userController from '../../../controllers/userController'
import methodNotFoundError from '../../../errors/methodNotFoundError'

const { show, update, destroy } = userController

const handle: NextApiHandler = async (req, res) => {
  const { method } = req
  switch (method) {
    case 'GET':
      show(req, res)
      break
    case 'PUT':
      update(req, res)
      break
    case 'DELETE':
      destroy(req, res)
      break
    default:
      methodNotFoundError(req, res)
      break
  }
}

export default handle