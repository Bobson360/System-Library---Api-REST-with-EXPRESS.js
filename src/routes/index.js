'use strict'

const express = require('express')
const router = express.Router()
const controller = require('../controllers/evaluation-controller')
const controllerUser = require('../controllers/user-controller')

router.post('/', controller.post)

router.get('/', (req, res, next) => {
    res.status(200).send({
        title: "Node Store API With Express js",
        version: "0.0.1",
    })

})
router.get('/user/:user', controllerUser.getByEmail)

module.exports = router