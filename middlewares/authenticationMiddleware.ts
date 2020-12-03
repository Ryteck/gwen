import jwt from '../libs/jwt'
import MiddlewareType from '../types/middlewareType'

const handle: MiddlewareType = async (req): Promise<void> => {
  const { authorization } = req.headers

  if (!authorization) {
    throw 'Token was not provider'
  }

  req.body.authorization = jwt.valideToken(authorization)
}

export default handle
