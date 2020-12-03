import { NextApiRequest } from 'next'

type MiddlewareType = (req: NextApiRequest) => Promise<void>

export default MiddlewareType
