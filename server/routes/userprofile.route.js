const express = require('express');
const passport = require('passport');
const asyncHandler = require('express-async-handler');
const userProfileController = require('../controllers/userprofile.controller');

const router = express.Router();
module.exports = router;

// Setting up the users api
// var users = require('../controllers/users');
// router.get('/list/:page/:limit', asyncHandler(getBlogs));
router.get('/:id', asyncHandler(getUserProfileById));

/* User Profile Routes */
router.use(passport.authenticate('jwt', { session: false }));
// router.get('/delete/:id', asyncHandler(deleteBlogById));

// Public methods
async function getUserProfileById(req, res) {
    await userProfileController.getUserProfileById(req.params.id, function(userProfile) {
        res.json(userProfile);
    });
}

// User access required methods
async function updateProfile(req, res) {
    if (req.user && req.user._id) {
        let userProfile = req.body;
        userProfile.user = req.user._id.toString();
        await userProfileController.updateUserProfile(userProfile, function (userProfile) {
            res.json(userProfile);
        });
    } else {
        res.status(500).json({status: "Access denied"});
    }
}

module.exports = router;
