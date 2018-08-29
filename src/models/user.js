'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
    nome: {
        type: String,
        required: true,
        
    },
    email: {
        type: String,
        required: true,
        trim: true,
        index: { unique: true }
       
    },
    status:{
        type: Boolean,
        required:true,
        default:true
    }
})

module.exports = mongoose.model('User', schema)