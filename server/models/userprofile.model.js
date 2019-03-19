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
        required: true
    },
    interests: {
        type: String,
        required: true
    },
    profileImage: {
        type: String,
        required: true
    },
    website: {
        type: String,
        required: true
    },
    about: {
        type: String,
        required: true
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
