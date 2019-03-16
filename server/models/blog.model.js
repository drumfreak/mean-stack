const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    caption: {
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


module.exports = mongoose.model('Blog', BlogSchema);
