const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserProfileSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    nickName: {
        type: String,
        required: false
    },
    interests: {
        type: String,
        required: false
    },
    profileImage: {
        type: String,
        required: false
    },
    website: {
        type: String,
        required: false
    },
    about: {
        type: String,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    views: {
        type: Number,
        required: false,
        default: 0
    },
    user: { type: Schema.Types.ObjectId, ref: 'User' }
}, {
    versionKey: false
});


module.exports = mongoose.model('UserProfile', UserProfileSchema);
