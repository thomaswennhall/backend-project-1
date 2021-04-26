const {Router} = require('express')
const router = Router()

const {userAuth} = require('../middleware/auth')

const userController = require('../controllers/userController')

router.get('/me', userAuth, userController.getUserByEmail)
router.patch('/me', userAuth, userController.changePassword)
router.post('/login', userController.logIn)

module.exports = router