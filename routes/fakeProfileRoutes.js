const {Router} = require('express')
const router = Router()

const {userAuth} = require('../middleware/auth')

const FakeProfileController = require('../controllers/fakeProfileController')

router.get('/generate', userAuth, FakeProfileController.generate)
router.get('/user/:base64Data', userAuth, FakeProfileController.getProfileFromBase64)

module.exports = router