'use strict'

const ValidationContract = require('../validators/fluent-validators')
const repository = require('../repositories/admin-repository')
const repositoryEval = require('../repositories/evaluation-repository')
const repositoryUser = require('../repositories/user-repository')
const md5 = require('md5')
const authService = require('../service/auth')


exports.register = async (req, res, next) => { // METODO PARA CADASTRO DE USUARIOS ADMINISTRADORES
    console.log(req.body)
    let contract = new ValidationContract() //cadastro de usuário
    contract.hasMinLen(req.body.name, 3, 'o nome deve conter pelo menos 3 caracteres')
    contract.isEmail(req.body.email, 'Email invalido')
    contract.hasMinLen(req.body.password, 3, 'a senha deve conter pelo menos 3 caracteres')

    // Se os dados forem inválidos
    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end()
        return
    }

    try {
        console.log('__TRY__')
        await repository.create({
            name: req.body.name,
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY),
            
        })

        res.status(201).send({
            message: 'Cliente cadastrado com sucesso',
            success: true,
            error: false
        })
    } catch (e) {
        res.status(500).send({
            message: "Falha ao processar sua requisição",
            success: false,
            error: true
        })
        console.log('__CATCH__')
    }
}

exports.authenticate = async (req, res, next) => { // METODO PARA AUTENTICAÇÃO SE USUÁRIOS CADASTRADOS
    try {

        console.log('__AUTHENTICATE__TRY__')
        console.log(req.body)
        const admin = await repository.authenticate({
            email: req.body.userData.email,
            password: md5(req.body.userData.password + global.SALT_KEY)
        })
        console.log(admin.email)
        if (!admin) {
            res.status(404).send({
                message: 'usuario ou senha ivalido'
            })
        }
        const token = await authService.generateToken({
            id: admin.id,
            email: admin.email,
            name: admin.name,
            roles: admin.roles
        })

        res.status(201).send({
            success: true,
            token: token,

        })
    } catch (e) {
        res.status(500).send({
            message: "Falha ao processar sua requisição"
        })
    }
}

exports.book = async (req, res, next) => {
    console.log(req.body)
    let contract = new ValidationContract()
    contract.hasMinLen(req.body.titulo, 3, 'o titulo deve conter pelo menos 3 caracteres')
    contract.hasMinLen(req.body.slug, 3, 'o slug deve conter pelo menos 3 caracteres')
    contract.hasMinLen(req.body.descricao, 3, 'a descrição deve conter pelo menos 3 caracteres')
    contract.hasMinLen(req.body.autor, 3, 'O nome do Autor deve conter pelo menos 3 caracteres')
    contract.hasMinLen(req.body.editora, 3, 'O nome da Editora deve conter pelo menos 3 caracteres')

    // Se os dados forem inválidos
    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end()
        return
    }

    try {
        console.log('try')
        console.log(req.body)

        await repository.createBook({
            titulo: req.body.titulo,
            slug: req.body.titulo,
            descricao: req.body.descricao,
            autor: req.body.autor,
            editora: req.body.editora
        })

        console.log('Livro cadastrado com sucesso')
        res.status(201).send({
            message: 'Livro cadastrado com sucesso',
            success: true
        })
    } catch (e) {
        res.status(500).send({
            error: true,
            success: false,
            message: "Falha ao processar sua requisição"
        })
        console.log('catch')

    }
}

exports.newUser = async (req, res, next) => {
    console.log('__NEW__USER__')
    console.log(req.body)
    let contract = new ValidationContract()
    contract.hasMinLen(req.body.nome, 3, 'o nome deve conter pelo menos 3 caracteres')
    contract.isEmail(req.body.email, 'Email invalido')

    // Se os dados forem inválidos
    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end()
        return
    }

    try {
        console.log('_CONTROLLER_ADMIN_USER_TRY__')
        await repository.createUser({
            nome: req.body.nome,
            email: req.body.email
        })
        res.status(201).send({
            message: 'usuario cadastrado com sucesso',
            success: true
        })
    } catch (e) {
        res.status(500).send({
            message: "Usuário ja cadastrado",
            error: true

        })
        console.log('catch')

    }
}

exports.user = async (req, res, next) => {
    try {
        console.log('__CONTROLLER__USER__LIST_')
        var data = await repositoryUser.get()
        res.status(200).send(data)
    } catch (e) {
        res.status(500).send({
            message: "Falha ao processar sua requisição"
        })
    }
}

exports.evaluation = async (req, res, next) => {
    try {
        var data = await repositoryEval.get()
        res.status(200).send(data)
    } catch (e) {
        res.status(500).send({
            message: "Falha ao processar sua requisição"
        })
    }
}

exports.findBookBySlug = async (req, res, next) => {
    try {
        console.log('findBookBySlug__CONTROLLER')
        var data = await repository.findBookBySlug(req.params.slug)
        res.status(200).send(data)
    } catch (e) {
        res.status(500).send({
            message: "Falha ao processar sua requisição"
        })
    }
}

exports.verifyToken = async (req, res, next) => {
    console.log('__CONTROLLER__VERYFY__TOKEN__')
    res.status(201).send({
        success: true
    })
}

exports.alugar = async (req, res, next) => {
    console.log('__ALUGAR__CONTROLLER__')
    console.log(req.body)
    let contract = new ValidationContract()
    contract.isEmail(req.body.email, 'Email invalido')
    contract.hasMinLen(req.body.livro, 3, 'o titulo deve conter pelo menos 3 caracteres')

    // Se os dados forem inválidos
    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end()
        return
    }

    try {
        console.log('_CONTROLLER_ADMIN_USER_TRY__')
        await repository.alugarLivro({
            livro: req.body.livro,
            email: req.body.email,
            status: req.body.status,
            slug: req.body.livro + req.body.email
        })
        res.status(201).send({
            message: 'Aluguel cadastrado com sucesso',
            error: false,
            success: true
        })
    } catch (e) {
        res.status(500).send({
            message: "Usuário já alugou",
            error: true,
            success: false

        })
        console.log('catch')

    }
}

exports.adminDefault = async (req, res, next) => {
    console.log('TRY CREATE ADMIN DEFAULT')
    try {
        
        await repository.create({
            name: 'default',
            email: 'default@admin.com',
            password: md5(123456 + global.SALT_KEY),
            
        })

        res.status(201).send({
            message: 'Administrador criado com sucesso, <br/>você só pode criar um adm default uma unica vez ',
            
        })
        console.log('__DEFAULT__ADMIN__CREATE__SUCCESS__')
    } catch (e) {
        res.status(500).send({
            message: "Falha ao processar sua requisição",
            success: false,
            error: true
        })
        console.log('__CATCH__')
    }
}