const sequelize = require('../db/seed')
const models = sequelize.models
const faker = require('faker')

class FakeProfileModel {

  constructor() {
    this.callsCounter = 0
    this.maxCalls = 10
    this.coolDownTime = 10 * 1000 // 86400 * 10 for 24h
  }

  countDown() {
    setTimeout(() => {
      this.callsCounter = 0
    }, this.coolDownTime)
  }

  getFakerProfile() {
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

  async generateProfile(email) {
    const user = await models.User.findOne({ where: {email: email} })

    if(this.callsCounter < this.maxCalls){
      const fakerProfile = this.getFakerProfile()
      const profile = await models.FakeProfile.build({...fakerProfile, UserId: user.id})
      await profile.save()
      this.callsCounter++
      return profile
    } else {
      this.countDown()
      throw new Error('Maximum calls exceeded, try again tomorrow')
    }
  }
}

module.exports = FakeProfileModel