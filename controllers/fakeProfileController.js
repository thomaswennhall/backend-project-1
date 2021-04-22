const FakeProfile = require('../models/FakeProfile')

const generate = async (req, res, next) => {
  const {email} = req.body
  try{
    const profile = await FakeProfile.generateProfile(email)
    res.json(profile)
  } catch(error) {
    res.status(403).json({error: error.message})
  }
}

module.exports = {generate}