const express = require('express')
const router = express.Router()

// Controllers
const LoginController = require('../../app/controllers/auth/LoginController')

// ROUTES
router.get('/', LoginController.index)
router.post('/', LoginController.validate)

module.exports = router