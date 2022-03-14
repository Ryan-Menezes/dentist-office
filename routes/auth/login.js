const express = require('express')
const router = express.Router()

// Controllers
const LoginController = require('../../app/controllers/auth/LoginController')

router.get('/', LoginController.index)

module.exports = router