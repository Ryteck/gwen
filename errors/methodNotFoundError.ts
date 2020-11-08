import { NextApiHandler } from 'next'

const handle: NextApiHandler = (req, res) => {
  res.status(404).json({ error: `The ${req.method} method was not found for this route.` })
}

export default handle
