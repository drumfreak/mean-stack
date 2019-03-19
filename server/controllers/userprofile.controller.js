const Joi = require('joi');
const UserProfile = require('../models/userprofile.model');

const userProfileSchema = Joi.object({
    title: Joi.string().required(),
    body: Joi.string().required(),
    caption: Joi.string().required(),
    user: Joi.string().required(),
    views: Joi.number(), // optional
    createdAt: Joi.string(), // optional
    _id: Joi.string() // optional

})

module.exports = {
    updateUserProfile,
    getUserProfileById
}

async function updateUserProfile(userProfile, cb) {
    if(!userProfile) {
        return {};
    }
    // let userProfileEntry = await Joi.validate(blog, blogSchema, {abortEarly: false});
    cb(await new UserProfile(userProfile).save());
}


async function getUserProfileById(id, cb) {
    UserProfile.findById(id)
        .sort('-createdAt')
        .populate('user', '-hashedPassword -email')
        .exec(function(err, data) {
            // console.log(err, data, data.length);
            if(data) {
                cb(data);
            } else {
                cb({});
            }
        });
}
