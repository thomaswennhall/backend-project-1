require('dotenv').config()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/User')

const {JWT_SECRET} = process.env

const getUserByEmail = async (req, res, next) => {
  const {email} = req.body
  try {
    const user = await User.getByEmail(email)
    res.json(user)
  } catch(error) {
    res.status(403).json({ error: error.message});
  }
}

const logIn = async (req, res, next) => {
  const {email, password} = req.body
  try {
    const user = await User.getByEmail(email)
    const passwordMatch = bcrypt.compareSync(password, user.passwordHash)
    if(passwordMatch){
      const token = jwt.sign({email}, JWT_SECRET)
      res.json({token})
    } else {
      res.status(401).json({ error: 'Wrong password!'});
    }
  } catch(error) {
    res.status(403).json({ error: error.message});
  }
}

const changePassword = async (req, res, next) => {
  const {email, newPassword} = req.body
  try {
    const changed = await User.changePassword(email, newPassword)
    res.json(changed)
  } catch(error) {
    res.status(403).json({ error: error.message});
  }
}

module.exports = {
  getUserByEmail,
  logIn,
  changePassword
}