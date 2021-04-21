const jwt = require('jsonwebtoken')
require('dotenv').config()

const {JWT_SECRET} = process.env

const userAuth = (req, res, next) => {
  try{
    const token = req.headers.authorization.replace('Bearer ', '')
    const data = jwt.verify(token, JWT_SECRET)
    req.user = data    
    next()
  }catch(error){
    res.status(403).json({error: error.message})
  }
}


module.exports = {userAuth}