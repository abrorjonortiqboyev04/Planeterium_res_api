const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')


const userModel = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [
            /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/gm,
            "Error: Invalid email entered"
        ]
    },
    password: {
        type: String,
        required: true,
        minLength: 5
    },
    apiKey: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    active: {
        type: Boolean,
        default: false
    },
    balanc: {
        type: Number,
        default: 0
    }
}, {
    timestemps: true
})


// JsonWebToken  Generate
userModel.methods.jwtGenerate = function(){
    return jwt.sign({id: this._id, email: this.email}, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}


module.exports = mongoose.model(" Users ", userModel)