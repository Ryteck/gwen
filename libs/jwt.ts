import Jwt from 'jsonwebtoken'
import UserInterface from '../interfaces/userInterface'
import TokenDataInterface from '../interfaces/tokenDataInterface'

const SECRET = process.env.MOD_TOKEN

const ONEHOUR = 60 * 60

const generateDataToken = (user: UserInterface): TokenDataInterface =>
  ({ id: user.id, userType: (user.administrador === 'true') ? 'high' : 'low' })

const generateToken = (data: TokenDataInterface, high: boolean): string =>
  Jwt.sign(data, SECRET, { expiresIn: (high ? (ONEHOUR * 24) : ONEHOUR) })

const generateRootToken = (high: boolean): string =>
  generateToken({ userType: 'root' }, high)

const valideToken = (token: string) =>
  Jwt.verify(token, SECRET)

const jwt = { generateDataToken, generateToken, generateRootToken, valideToken }

export default jwt
