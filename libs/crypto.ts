import Crypto from 'crypto'

const generateHash = (text: string): string => {
  let alt = text
  for (let i = 0; i < 10; i++) {
    alt = Crypto
      .createHash('sha256')
      .update(alt)
      .digest('hex')
  }
  return alt
}

const valideHash = (text: string, hash: string): boolean =>
  generateHash(text) === hash

const generateDefaultPassword = (): string =>
  generateHash(String(process.env.DEFAULT_USER_PASS))

const valideRootPassword = (testText: string): boolean =>
  valideHash(testText, generateHash(String(process.env.DEFAULT_ROOT_PASS)))

const crypto = { generateHash, valideHash, generateDefaultPassword, valideRootPassword }

export default crypto
