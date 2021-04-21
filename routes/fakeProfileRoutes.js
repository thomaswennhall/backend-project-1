const {Router} = require('express')
const router = Router()

const FakeProfileController = require('../controllers/fakeProfileController')

router.get('/generate', FakeProfileController.generate)

module.exports = router