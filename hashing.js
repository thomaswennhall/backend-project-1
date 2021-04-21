const bcrypt = require('bcryptjs')

const hash = (password) => {
  const digest = bcrypt.hashSync(password, 10)
  return digest
}

module.exports = hash