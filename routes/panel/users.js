const express = require('express')
const router = express.Router()

// Controllers
const UserController = require('../../app/controllers/panel/UserController')

// ROUTE INDEX
router.get('/', UserController.index)

// ROUTE CREATE
router.get('/novo', UserController.create)
router.post('/novo', UserController.store)

// ROUTE EDIT
router.get('/:id/editar', UserController.edit)
router.post('/:id/editar', UserController.update)

module.exports = router