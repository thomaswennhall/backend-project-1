const FakeProfileModel = require('../models/fakeProfile')
const model = new FakeProfileModel

const generate = async (req, res, next) => {
  const {email} = req.body
  try{
    const profile = await model.generateProfile(email)
    res.json(profile)
  } catch(error) {
    res.status(403).json({error: error.message})
  }
}

module.exports = {generate}