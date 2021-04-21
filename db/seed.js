const {Sequelize, DataTypes} = require('sequelize')

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'db/fuskeluring.sqlite'
})

const User = sequelize.define('User', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  passwordHash: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
})

const FakeProfile = sequelize.define('FakeProfile', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  birthday: {
    type: DataTypes.STRING,
    allowNull: false
  },
  birthCity: {
    type: DataTypes.STRING,
    allowNull: false
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false
  },
  occupation: {
    type: DataTypes.STRING,
    allowNull: false
  },
  characteristic: {
    type: DataTypes.STRING,
    allowNull: false
  },
  picture: {
    type: DataTypes.BLOB,
    allowNull: false
  }
})

FakeProfile.belongsTo(User)

sequelize.sync()

module.exports = sequelize