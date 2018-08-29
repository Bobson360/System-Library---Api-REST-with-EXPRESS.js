'use strict'

const express = require('express')
const router = express.Router()
const controller = require('../controllers/book-controller')
const auth = require('../service/auth')

router.get('/', controller.get)
router.put('/id/:id', auth.authorize, controller.put)
router.delete('/', auth.authorize, controller.delete)



module.exports = router