'use strict';
const mongoose = require('mongoose');
const Evaluation = mongoose.model('Evaluation');

exports.get = async () => {
    var res = await Evaluation.find({}, 'Livro Conservação Nota Observações')
        .populate('Usuário', 'nome')
    return res;
}

exports.create = async (data) => {
    console.log(data)
    var evaluation = new Evaluation(data);
    await evaluation.save();

}