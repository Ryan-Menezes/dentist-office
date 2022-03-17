const express = require('express')
const router = express.Router()

// Controllers
const PanelController = require('../../app/controllers/panel/PanelController')

// ROUTES
router.get('/', PanelController.index)
router.get('/sair', PanelController.logout)

module.exports = router