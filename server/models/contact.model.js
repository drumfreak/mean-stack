const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    emailAddress: {
        type: String,
        required: true,
        unique: false,
        // Regexp to validate emails with more strict rules as added in tests/users.js which also conforms mostly with RFC2822 guide lines
        match: [/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please enter a valid email'],
    },
    subject: {
        type: String,
        required: true
    },
    emailBody: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    response: {
        type: Object,
        required: false
    },
    error: {
        type: Object,
        required: false
    },
    viewed: {
        type: Boolean,
        default: false,
        required: false
    }
}, {
    versionKey: false
});


module.exports = mongoose.model('Contact', ContactSchema);
