const {Router} = require('express')
const router = Router()

const {userAuth} = require('../middleware/auth')

const FakeProfileController = require('../controllers/fakeProfileController')

router.get('/generate', userAuth, FakeProfileController.generate)

module.exports = router