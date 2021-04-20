const {Sequelize, DataTypes} = require('sequelize')

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'db/fuskeluring.sqlite'
})

const User = sequelize.define('User', {
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  passwordHash: {
    type: DataTypes.STRING,
    allowNull: false
  }
})

const FakeProfile = sequelize.define('FakeProfile', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  birthday: {
    type: DataTypes.DATE,
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

async function addUser(userObj){
  const {email, passwordHash} = userObj
  const user = await User.build({
    email,
    passwordHash
  })
  await user.save()
}

const {users} = require('./users.json')
for(user of users){
  try{
    addUser(user)
  }catch(error){
    console.log(error.message);
  }
}