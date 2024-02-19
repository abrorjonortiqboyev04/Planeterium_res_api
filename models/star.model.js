const mongoose = require('mongoose')

const starModel = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    diametr: {
        type: String,
        required: true
    },
    temperatura: {
        type: String,
        required: true
    },
    massa: {
        type: String,
        required: true
    },
    planets: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Planets"
    }]
})

module.exports = mongoose.model("Stars", starModel)