const {Router} = require('express')
const router = Router()

const {userAuth, adminAuth} = require('../middleware/auth')

const userController = require('../controllers/userController')

router.get('/me', userAuth, userController.getUserByEmail)
router.patch('/me', userAuth, userController.changePassword)
router.post('/login', userController.logIn),
router.get('/all', userAuth, adminAuth, userController.getAll)

module.exports = router