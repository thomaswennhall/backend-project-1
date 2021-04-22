const db = require('../database/connection')
const {DataTypes} = require('sequelize')
const hash = require('../hashing')
const {InvalidCredentials} = require('../errors')

const User = db.define('User', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  digest: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  callsToday: {
    type: DataTypes.NUMBER,
    allowNull: false,
    defaultValue: 0
  },
  limitReachedAt: {
    type: DataTypes.NUMBER,
    allowNull: false,
    defaultValue: 0
  }
})

User.getByEmail = async (email) => {
  const user = await User.findOne({ where: {email: email} })
  if(!user) throw new InvalidCredentials('email')
  return user
}

User.changePassword = async (email, newPassword) => {
  const user = await User.getByEmail(email)
  const digest = hash(newPassword)
  user.digest = digest
  await user.save()
  return 'Successfully changed password!'
}


module.exports = User