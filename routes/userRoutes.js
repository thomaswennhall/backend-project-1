const {Router} = require('express')
const router = Router()

const {userAuth} = require('../middleware/auth')

const userController = require('../controllers/userController')

router.get('', userAuth, userController.getUserByEmail)
router.patch('', userAuth, userController.changePassword)

module.exports = router