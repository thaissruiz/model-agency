const mongoose = require("mongoose")

// Model - User
const userSchema = mongoose.Schema({

    username: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    token: {
        type: String,
        require: true
    },
})

//Collection
//Creating new User

mongoose.model("users", userSchema)

const User = mongoose.model('users')

module.exports = {
    User
}