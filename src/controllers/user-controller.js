'use strict'

const ValidationContract = require('../validators/fluent-validators')
const repository = require('../repositories/user-repository')
//const azure = require('azure-storage')
const guid = require('guid')
const config = require('../config')


exports.getByEmail = async (req, res, next) => {
    try {
        var data = await repository.getByEmail(req.params.user)
        console.log(data)
        res.status(200).json(data)
        //console.log(data[0].nome + ': ' + data[0].status)
    } catch (e) {
        res.status(500).json(data)
    }
}