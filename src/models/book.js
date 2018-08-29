'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
    titulo: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        required: true,
        trim: true,
        index: true,
        unique: true,
        index: { unique: true }
    },
    descricao: {
        type: String,
        required: true,
    },
    autor: {
        type: String,
        trim: true
    },
    editora: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model('Book', schema)