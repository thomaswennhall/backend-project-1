const {Sequelize} = require('sequelize')

const db = new Sequelize({
  dialect: 'sqlite',
  storage: 'database/fuskeluring.sqlite',
  //logging: false
})

module.exports = db