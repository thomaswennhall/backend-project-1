const FakeProfile = require('../models/FakeProfile')

const generate = async (req, res, next) => {
  const {email} = req.user
  try{
    const profile = await FakeProfile.generateProfile(email)
    res.json(profile)
  } catch(error) { next(error) }
}

const getProfileFromBase64 = async (req, res, next) => {
  const {base64Data} = req.params
  try{
    const profile = await FakeProfile.getFromBase64(base64Data)
    res.json(profile)
  } catch(error) {next(error)}
}

module.exports = {
  generate,
  getProfileFromBase64
}