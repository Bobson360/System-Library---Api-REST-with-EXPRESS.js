'use strict'

const express = require('express')
const router = express.Router()
const controller = require('../controllers/admin-controller')
const auth = require('../service/auth')

router.post('/', controller.authenticate)
router.post('/register', auth.authorize, controller.register)
router.post('/usuarios/novo', auth.authorize, controller.newUser)
router.post('/usuarios', auth.authorize, controller.user)
router.post('/livros', auth.authorize, controller.book)
router.post('/alugar', auth.authorize, controller.alugar)
router.get('/avaliacoes', auth.authorize, controller.evaluation)
router.get('/livro/:slug', auth.authorize, controller.findBookBySlug)
router.get('/default', controller.adminDefault)
router.get('/verifytoken', controller.verifyToken)


module.exports = router