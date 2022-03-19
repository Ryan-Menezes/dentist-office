const express = require('express')
const router = express.Router()

// Controllers
const QueryController = require('../../app/controllers/panel/QueryController')

// ROUTE INDEX
router.get('/', QueryController.index)

// ROUTE CREATE
router.get('/novo', QueryController.create)
router.post('/novo', QueryController.store)

// ROUTE EDIT
router.get('/:id/editar', QueryController.edit)
router.post('/:id/editar', QueryController.update)

module.exports = router