const express = require('express')
const router = express.Router()

// Controllers
const RoleController = require('../../app/controllers/panel/RoleController')

// ROUTE INDEX
router.get('/', RoleController.index)

// ROUTE CREATE
router.get('/novo', RoleController.create)
router.post('/novo', RoleController.store)

// ROUTE EDIT
router.get('/:id/editar', RoleController.edit)
router.post('/:id/editar', RoleController.update)

module.exports = router