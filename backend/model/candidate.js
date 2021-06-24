const mongoose = require("mongoose")

// Model - Candidates
const candidateSchema = mongoose.Schema({

    firstName: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true
    },
    birthday: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    gender: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    city: {
        type: String,
        require: true
    },
    state: {
        type: String,
        require: true
    },
    country: {
        type: String,
        require: true
    },
    zip: {
        type: String,
        require: true
    },
    height: {
        type: Number,
        require: true
    },
    weight: {
        type: Number,
        require: true
    },
    mannequin: {
        type: Number,
        require: true
    },
    shoe: {
        type: Number,
        require: true
    },
    waist: {
        type: Number,
        require: true
    },
    hip: {
        type: Number,
        require: true
    },
    bustTorax: {
        type: Number,
        require: true
    },
    shirt: {
        type: Number,
        require: true
    },
    eyeColor: {
        type: String,
        require: true
    },
    hairColor: {
        type: String,
        require: true
    },
    photo1: {
        type: String,
        require: true
    },
    photo2: {
        type: String,
        require: true
    },
    photo3: {
        type: String,
        require: true
    },
    photo4: {
        type: String,
        require: true
    },
    approved: {
        type: String,
        require: true
    },
})

//Collection
//Creating new Candidates

mongoose.model("candidates", candidateSchema)

const Candidate = mongoose.model('candidates')

module.exports = {
    Candidate
}