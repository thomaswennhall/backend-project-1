const FakeProfile = require('../models/FakeProfile')

const generate = async (req, res, next) => {
  const {email} = req.user
  try{
    const profile = await FakeProfile.generateProfile(email)
    res.json(profile)
  } catch(error) { next(error) }
}

const getProfileFromHex = async (req, res, next) => {
  const {hexData} = req.params
  try{
    const profile = await FakeProfile.getProfileFromHex(hexData)
    res.json(profile)
  } catch(error) {next(error)}
}

module.exports = {
  generate,
  getProfileFromHex
}