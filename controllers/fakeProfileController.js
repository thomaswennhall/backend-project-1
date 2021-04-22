const FakeProfile = require('../models/FakeProfile')

const generate = async (req, res, next) => {
  const {email} = req.user
  try{
    const profile = await FakeProfile.generateProfile(email)
    res.json(profile)
  } catch(error) { next(error) }
}

module.exports = {generate}