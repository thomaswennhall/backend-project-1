const db = require('../database/connection')
const {DataTypes} = require('sequelize')
const {hash} = require('../hashing')
const {InvalidCredentials, TokenExpired, Unauthorized, NotNewPassword} = require('../errors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
require('dotenv').config()

const {JWT_SECRET} = process.env

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
  const exsistingPassword = bcrypt.compareSync(newPassword, user.digest)
  if(exsistingPassword){ throw new NotNewPassword() } 

  const digest = hash(newPassword)
  user.digest = digest
  await user.save()
  return 'Successfully changed password!'
}

User.validateToken = (token) => {
  try{
    const user = jwt.verify(token, JWT_SECRET)
    return user
  } catch(error) {
    if(error instanceof jwt.TokenExpiredError){
      throw new TokenExpired()
    }else if(error instanceof jwt.JsonWebTokenError){
      throw new Unauthorized()
    }else{
      throw error
    }
  }
}

module.exports = User