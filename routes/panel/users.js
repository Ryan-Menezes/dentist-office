const express = require('express')
const router = express.Router()

// Controllers
const UserController = require('../../app/controllers/panel/UserController')

// ROUTE INDEX
router.get('/', UserController.index)

// ROUTE CREATE
router.get('/novo', UserController.create)

// ROUTE EDIT
router.get('/:id/editar', UserController.edit)

module.exports = router