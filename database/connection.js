const {Sequelize} = require('sequelize')

const db = new Sequelize({
  dialect: 'sqlite',
  storage: 'database/fuskeluring.sqlite'
})

module.exports = db