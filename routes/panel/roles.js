const express = require('express')
const router = express.Router()

// Controllers
const RoleController = require('../../app/controllers/panel/RoleController')

// ROUTE INDEX
router.get('/', RoleController.index)

// ROUTE CREATE
router.get('/novo', RoleController.create)

// ROUTE EDIT
router.get('/:id/editar', RoleController.edit)

module.exports = router