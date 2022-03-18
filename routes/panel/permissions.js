const express = require('express')
const router = express.Router()

// Controllers
const PermissionController = require('../../app/controllers/panel/PermissionController')

// ROUTE INDEX
router.get('/', PermissionController.index)

module.exports = router