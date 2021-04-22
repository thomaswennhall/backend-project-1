const {FuskeluringError} = require('../errors')
const {BaseError} = require('sequelize')

const errorHandler = (error, req, res, next) => {
  if (error instanceof FuskeluringError) {
    res
      .status(error.status)
      .json({error: error.message})
  } else if (error instanceof BaseError) {
    res
      .status(400)
      .json({error: error.message})
  } else {
    console.error(error);
    res
      .status(500)
      .json({error: 'Something went horribly wrong, do not worry though...'})
  }
}

module.exports = errorHandler