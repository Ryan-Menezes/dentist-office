const express = require('express')
const router = express.Router()

// Controllers
const LoginController = require('../../app/controllers/auth/LoginController')

// ROUTES
router.get('/', LoginController.index)

module.exports = router