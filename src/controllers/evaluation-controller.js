'use strict'
const ValidationContract = require('../validators/fluent-validators')
const repository = require('../repositories/evaluation-repository')
const guid = require('guid')
const auth = require('../service/auth')

exports.post = async (req, res, next) => { // RESTRINGIR UMA AVALIAÇÃO POR LIVRO
    console.log('_CONTROLLER_EVALUATION_USER_')
    console.log(req.body)
    let data = (req.body.livro + req.body.user)

    //console.log(data)
    try {

        console.log('_CONTROLLER_EVALUATION_USER_TRY__')
        await repository.create({
            Usuário: req.body.user,
            Livro: req.body.livro,
            Conservação: req.body.conservacao,
            Nota: req.body.nota,
            Observações: req.body.obs,
            slug: data

        })

        res.status(201).send({
            message: 'avaliação cadastrada com sucesso',
            success: true
        })
    } catch (e) {
        res.status(500).send({
            message: "Falha ao processar sua requisição"
        })
        console.log('catch')

    }
}