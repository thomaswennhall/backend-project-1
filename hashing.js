const bcrypt = require('bcryptjs')

const hash = (password) => {
  const digest = bcrypt.hashSync(password, 10)
  return digest
}

const hashCipherKey = (key) => {
  let hashedKey = hash(key)
    hashedKey = Buffer.allocUnsafe(32)
  return hashedKey
}
const hashCipherIV = (iv) => {
  let hashedIV = hash(iv)
    hashedIV = Buffer.allocUnsafe(16)
  return hashedIV
}

module.exports = {
  hash,
  hashCipherKey,
  hashCipherIV
}