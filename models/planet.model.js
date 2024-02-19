const mongoose = require('mongoose')

const planetModels = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique:true
    },
    temperatura: {
        type: String,
        required: true
    },
    massa: {
        type: String,
        required: true
    },
    yoldoshSoni: {
        type: Number,
        required: true
    },
    tartbRaqam: {
        type: Number,
        required: true
    },
    dayCountYear: {
        type: String,
    },
    star: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Stars"
    }
})

module.exports = mongoose.model("Planets", planetModels)