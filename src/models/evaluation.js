'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    Usuário: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
   
        Livro: {
            type: String,
            required: true,
        },
        Conservação: {
            type: String,
            required: true
        },
        Nota: {
            type: String,
            require:true
        },
        Observações: {
            type: String
        },
        slug:{
            type: String,
            required: true,
            index: { unique: true }
        }
    ,
});

module.exports = mongoose.model('Evaluation', schema)