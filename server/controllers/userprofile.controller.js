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

});

module.exports = {
    updateUserProfile,
    getUserProfileById
};

async function updateUserProfile(userProfile, cb) {
    if (!userProfile) {
        return {};
    }

    // First find the user profile by user id.
    UserProfile.findOne({user: userProfile.user})
        .sort('-createdAt')
        .exec(function (err, profile) {
            if (profile) {
                // Update the profile.
                profile.firstName = userProfile.firstName;
                profile.lastName = userProfile.lastName;
                profile.nickName = userProfile.nickName;
                profile.about = userProfile.about;
                if (userProfile.profileImage) {
                    profile.profileImage = userProfile.profileImage;
                }
                profile.save();
                return cb(profile);
            } else {
                // Create a new one.
                return cb(new UserProfile(userProfile).save());
            }
        });


}

async function getUserProfileById(id, cb) {
    UserProfile.findOne({user: id})
        .sort('-createdAt')
        .populate('user', '-hashedPassword -email')
        .exec(function (err, data) {
            // console.log(err, data, data.length);
            if (data) {
                // console.log(data);
                cb(data);
            } else {
                cb({});
            }
        });
}
