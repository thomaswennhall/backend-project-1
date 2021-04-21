require('dotenv').config()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const UserModel = require('../models/user')
const userModel = new UserModel

const {JWT_SECRET} = process.env

const getUserByEmail = async (req, res, next) => {
  const {email} = req.body
  try {
    const user = await userModel.getByEmail(email)
    res.json(user)
  } catch(error) {
    res.status(403).json({ error: error.message});
  }
}

const logIn = async (req, res, next) => {
  const {email, password} = req.body
  try {
    const user = await userModel.getByEmail(email)
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
    const changed = await userModel.changePassword(email, newPassword)
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