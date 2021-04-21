const {Router} = require('express')
const router = Router()

const userController = require('../controllers/userController')

router.get('', userController.getUserByEmail)
router.patch('', userController.changePassword)

module.exports = router