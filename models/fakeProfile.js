const db = require('../database/connection')
const {DataTypes} = require('sequelize')
const User = require('./User')
const faker = require('faker')
const {CallsExceeded} = require('../errors')
const crypto = require('crypto')
require('dotenv').config()

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

// THROTTLE FUNCTION
const maxCalls = 2
const coolDownTime = 5 * 1000 // 86400 * 10 for 24h
const countDown = async (user) => {
  user.limitReachedAt = Date.now()
  await user.save()
  return checkUserCoolDown(user)
}
const checkUserCoolDown = (user) => {
  if(user.limitReachedAt === 0){
    return null
  } else {
    const timeLeft = user.limitReachedAt - Date.now() + coolDownTime
    if(timeLeft < 0) {
      resetUserCoolDown(user)
      return null
    } else {
      return timeLeft
    }
  }
}
const resetUserCoolDown = async (user) => {
  user.limitReachedAt = 0
  user.callsToday = 0
  await user.save()
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

  const userCoolDown = checkUserCoolDown(user)
  if(userCoolDown){
    throw new CallsExceeded(userCoolDown)
  }

  if(user.callsToday < maxCalls){
    const fakerProfile = getFakerProfile()
    const profile = await FakeProfile.build({...fakerProfile, UserId: user.id})
    await profile.save()

    user.callsToday++
    await user.save()

    if(user.callsToday === maxCalls) {
      countDown(user)
    }
    const hex = FakeProfile.generateHexData(profile)
    return {profile, hex}
  }
}

const {CIPHER_KEY} = process.env
const {CIPHER_IV} = process.env

FakeProfile.generateHexData = (profile) => {
  profile = JSON.stringify(profile)
  const cipher = crypto.createCipheriv('aes256', CIPHER_KEY, CIPHER_IV)
  
  let cipherString = cipher.update(profile, 'utf-8', 'hex')
  cipherString += cipher.final('hex')
  
  return cipherString
}

FakeProfile.getProfileFromHex = (hexData) => {
  const decipher = crypto.createDecipheriv('aes256', CIPHER_KEY, CIPHER_IV)
  let decipheredString = decipher.update(hexData, 'hex', 'utf-8')
  decipheredString += decipher.final('utf-8')
  const decipheredJSON = JSON.parse(decipheredString)
  return decipheredJSON
}

module.exports = FakeProfile