const jwt = require('jsonwebtoken')
require('dotenv').config()
const {Unauthorized} = require('../errors')

const {JWT_SECRET} = process.env

const userAuth = (req, res, next) => {
  try{
    const {authorization} = req.headers
    if(!authorization) { throw new Unauthorized() }
    const token = authorization.replace('Bearer ', '')
    const data = jwt.verify(token, JWT_SECRET)
    req.user = data    
    next()
  }catch(error){ next(error) }
}

module.exports = {userAuth}