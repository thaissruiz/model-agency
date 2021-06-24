const mongoose = require("mongoose")

// Model - User
const ContactSchema = mongoose.Schema({

    firstName: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    message: {
        type: String,
        require: true
    },
})

//Collection
//Creating new User

mongoose.model("contact", ContactSchema)

const Contact = mongoose.model('contact')

module.exports = {
    Contact
}