const {Unauthorized} = require('../errors')
const User = require('../models/User')

const checkToken = (headers) => {
  const {authorization} = headers
    if(!authorization) { throw new Unauthorized() }
    const token = authorization.replace('Bearer ', '')
    return token
}

const adminAuth = (req, res, next) => {
  try{   
    if(req.user.role !== 'admin'){ throw new Unauthorized() }
    next()
  }catch(error){ 
    next(error)
  }
}

const userAuth = (req, res, next) => {
  try{
    const token = checkToken(req.headers)
    const user = User.validateToken(token)
    req.user = user    
    next()
  }catch(error){ 
    next(error)
  }
}

module.exports = {
  userAuth,
  adminAuth
}