const db = require('../database/connection')
const {DataTypes} = require('sequelize')
const hash = require('../hashing')

const User = db.define('User', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  passwordHash: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
})

User.getByEmail = async (email) => {
  const user = await User.findOne({ where: {email: email} })
  if(!user) throw new Error('No user found with the given e-mail address')
  return user
}

User.changePassword = async (email, newPassword) => {
  const user = await User.getByEmail(email)
  const digest = hash(newPassword)
  user.passwordHash = digest
  await user.save()
  return 'Successfully changed password!'
}


module.exports = User