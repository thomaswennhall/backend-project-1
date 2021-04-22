const db = require('../database/connection')
const {DataTypes} = require('sequelize')
const User = require('./User')
const faker = require('faker')

const FakeProfile = db.define('FakeProfile', {
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




let callsCounter = 0
const maxCalls = 10
const coolDownTime = 10 * 1000 // 86400 * 10 for 24h


const countDown = () => {
  setTimeout(() => {
    callsCounter = 0
  }, coolDownTime)
}

const getFakerProfile = () => {
  const profile = {}
  profile['name'] = faker.name.findName()

  const date = faker.date.between(1960, 1997).toISOString()
  const [birthday] = date.split('T')
  profile['birthday'] = birthday

  profile['birthCity'] = faker.address.cityName()
  profile['address'] = faker.address.streetAddress()
  profile['occupation'] = faker.name.jobTitle()

  const adjective = faker.commerce.productAdjective()
  const animal = faker.animal.type()
  const phrase = `${adjective} ${animal}`
  profile['characteristic'] = phrase

  profile['picture'] = faker.image.avatar()
  return profile
}

FakeProfile.generateProfile = async (email) => {
  const user = await User.findOne({ where: {email: email} })

  if(callsCounter < maxCalls){
    const fakerProfile = getFakerProfile()
    const profile = await FakeProfile.build({...fakerProfile, UserId: user.id})
    await profile.save()
    callsCounter++
    return profile
  } else {
    countDown()
    throw new Error('Maximum calls exceeded, try again tomorrow')
  }
}

module.exports = FakeProfile