const sequelize = require('../db/seed')
const models = sequelize.models
const hash = require('../hashing')

class UserModel {
  async getByEmail(email) {
    const user = await models.User.findOne({ where: {email: email} })
    if(!user) throw new Error('No user found with the given e-mail address')
    return user
  }

  async changePassword(email, newPassword) {
    const user = await this.getByEmail(email)
    const digest = hash(newPassword)
    user.passwordHash = digest
    await user.save()
    return 'Successfully changed password!'
  }
}

module.exports = UserModel