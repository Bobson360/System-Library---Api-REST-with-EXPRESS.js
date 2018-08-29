'use strict'
const mongoose = require('mongoose')
const Admin = mongoose.model('Admin')
const Book = mongoose.model('Book')
const User = mongoose.model('User')
const Alugar = mongoose.model('Alugar')

exports.create = async(data) => {
    console.log('__METODO CREATE__')
    console.log(data)
    var admin = new Admin(data)
    await admin.save()
    
}

exports.createUser = async(data) => {
    console.log('__METODO_CREATE_USER__')
    var user = new User(data)
    await user.save() 
}

exports.createBook = async(data) => {
    console.log('__METODO_CREATE_BOOK__')
    console.log(data)
    var book = new Book(data)
    await book.save()
    
}

exports.authenticate = async(data) => {
    const res = await Admin.findOne({
        email:data.email, password:data.password
    })
    return res
}

exports.findBookBySlug = async(slug) => {
    console.log('findBookBySlug__REPOSITORY')
    console.log(slug)
    const res = await Book
    .findOne({
        slug:slug        
    })
    console.log(res)
    return res
}
exports.alugarLivro = async(data) => {
    console.log('__ALUGAR__REPOSITORY__')
    var alugar = new Alugar(data)
    await alugar.save() 
}
