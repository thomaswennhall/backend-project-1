require('dotenv').config()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/User')
const {WrongPassword, InvalidBody} = require('../errors')

const {JWT_SECRET} = process.env

const getUserByEmail = async (req, res, next) => {
  const {email} = req.user
  try {
    const {id, callsToday, limitReachedAt} = await User.getByEmail(email)
    const user = {id, email, callsToday, limitReachedAt}
    res.json(user)
  } catch(error) { next(error) }
}

const logIn = async (req, res, next) => {
  try {
    const {email, password} = req.body
    if(!email || !password) { throw new InvalidBody() }

    const user = await User.getByEmail(email)
    const passwordMatch = bcrypt.compareSync(password, user.digest)
    if(passwordMatch){
      const token = jwt.sign({email, role: user.role}, JWT_SECRET, {expiresIn: '2h'})
      res.json({token})
    } else {
      throw new WrongPassword()
    }
  } catch(error) { next(error) }
}

const changePassword = async (req, res, next) => {
  try {
    const {email} = req.user
    const {newPassword} = req.body
    if(!newPassword) { throw new InvalidBody() }

    const changed = await User.changePassword(email, newPassword)
    res.json(changed)
  } catch(error) { next(error) }
}

const getAll = async (req, res, next) => {
  try{
    const users = await User.findAll()
    res.json(users)
  }catch(error){ next(error) }
}

module.exports = {
  getUserByEmail,
  logIn,
  changePassword,
  getAll
}