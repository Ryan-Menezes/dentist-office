const express = require('express')
const router = express.Router()

// Controllers
const PermissionController = require('../../app/controllers/panel/PermissionController')

// ROUTE INDEX
router.get('/', PermissionController.index)

// ROUTE CREATE
router.get('/novo', PermissionController.create)

// ROUTE EDIT
router.get('/:id/editar', PermissionController.edit)

module.exports = router