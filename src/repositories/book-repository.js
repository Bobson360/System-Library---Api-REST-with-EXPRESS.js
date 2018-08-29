'use strict'
const mongoose = require('mongoose')
const Book = mongoose.model('Book')

exports.get = async () => {
    console.log('__REPOSITORY__BOOK__GET__')
    const res = await Book
        .find({})
    return res
}

exports.getBySlug = async (slug) => {
    console.log(slug)
    const res = await Book
        .find({
            slug: slug
        })
    console.log(res)
    return res
}

exports.getById = async (id) => {
    const res = await Book
        .findById(id)
    return res
}

exports.getByTag = async (tag) => {
    const res = await Book
        .find({
            tags: tag,
            active: true
        }, 'title price slug price tags')
    return res
}

exports.create = async (data) => {
    var book = new Book(data)
    await book.save()
    console.log(data)
}

exports.update = async (id, data) => {
    console.log('__UPDATE__BOOK__REPOSITORY__')
    await Book.findByIdAndUpdate(id, {
        $set: {
            titulo: data.titulo,
            descricao: data.descricao,
            autor: data.autor,
            editora: data.editora
        }
    })
}

exports.delete = async (id) => {
    await Book.findOneAndRemove(id)
}