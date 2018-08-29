'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
    livro: {
        type: String,
        required: true,
        
    },
    email: {
        type: String,
        required: true,
        trim: true,
            
    },
    status:{
        type: Boolean,
        required:true,
        default:true
    },
    slug:{
        type: String,
        required:true,
        trim: true,
        index: { unique: true }
    }
})

module.exports = mongoose.model('Alugar', schema)