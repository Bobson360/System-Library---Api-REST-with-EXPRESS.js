'use strict'
const mongoose = require('mongoose')
const User = mongoose.model('User')

exports.get = async () => {
    const res = await User
        .find({})
    return res
}

exports.getByEmail = async (email) => {
    console.log(email)
    const res = await User
        .find({
            email: email
        })
    console.log(res)
    return res
}