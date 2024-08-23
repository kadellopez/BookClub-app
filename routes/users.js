const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const ensureAuthenticated = require('../auth/authMiddleware')

router.get('/register', userController.registerForm)
router.post('/register', userController.register)
router.get('/login', userController.loginForm)
router.post('/login', userController.login)
router.get('/logout', ensureAuthenticated, userController.logout)
router.get('/list', ensureAuthenticated, userController.listUsers)

module.exports = router