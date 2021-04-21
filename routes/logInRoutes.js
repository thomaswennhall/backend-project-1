const {Router} = require('express')
const router = Router()

const userController = require('../controllers/userController')

router.post('/login', userController.logIn)

module.exports = router