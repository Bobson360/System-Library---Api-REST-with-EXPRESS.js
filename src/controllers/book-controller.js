'use strict'

const repository = require('../repositories/book-repository')

exports.get = async (req, res, next) => {
    console.log('__CONTROLLER__BOOK__GET__')
    try {
        console.log('__CONTROLLER__BOOK__GET__TRY__')
        var data = await repository.get()
        res.status(200).send(data)
    } catch (e) {
        res.status(500).send({
            message: "Falha ao processar sua requisição"
        })
    }
}
exports.getBySlug = async (req, res, next) => {
    try {
        console.log('getBySlug__CONTROLLER')
        var data = await repository.getBySlug(req.params.slug)
        res.status(200).send(data)
    } catch (e) {
        res.status(500).send({
            message: "Falha ao processar sua requisição"
        })
    }
}
exports.getById = async (req, res, next) => {
    try {
        var data = await repository.getById(req.params.id)
        res.status(200).send(data)
    } catch (e) {
        res.status(500).send({
            message: "Falha ao processar sua requisição"
        })
    }
}
exports.getByTag = async (req, res, next) => {
    try {
        const data = await repository.getByTag(req.params.tag)
        res.status(200).send(data)
    } catch (e) {
        res.status(500).send({
            message: "Falha ao processar sua requisição"
        })
    }
}

exports.put = async (req, res, next) => {
    try {
        console.log('__UPDATE__BOOK__CONTROLLER__TRY__')
        console.log(req.params.id)
        console.log(req.body)
        await repository.update(req.params.id, req.body)
        res.status(200).send({
            message: 'Produto atualizado com sucesso',
            success:true,
            error:false
            
        })
    } catch (e) {
        res.status(500).send({
            message: "Falha ao processar sua requisição",
            success:false,
            error:true
        })
    }
}

exports.delete = async (req, res, next) => {
    try {
        await repository.delete(req.body.id)

        res.status(200).send({
            message: 'Produto Removido com sucesso'
        })
    } catch (e) {
        res.status(500).send({
            message: "Falha ao processar sua requisição"
        })
    }
}