const {Unauthorized} = require('../errors')
const User = require('../models/User')


const userAuth = (req, res, next) => {
  try{
    const {authorization} = req.headers
    if(!authorization) { throw new Unauthorized() }
    const token = authorization.replace('Bearer ', '')
    const user = User.validateToken(token)
    req.user = user    
    next()
  }catch(error){ 
    next(error)
   }
}

module.exports = {userAuth}