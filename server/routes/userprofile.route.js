const express = require('express');
const passport = require('passport');
const asyncHandler = require('express-async-handler');
const userProfileController = require('../controllers/userprofile.controller');
const _ = require('lodash');
const path = require('path');
const multer = require('multer');
const AvatarStorage = require('../middleware/AvatarStorage');
const router = express.Router();

// setup a new instance of the AvatarStorage engine
const storage = AvatarStorage({
    square: true,
    responsive: true,
    greyscale: true,
    quality: 90
});

const limits = {
    files: 1, // allow only 1 file per request
    fileSize: 1024 * 1024, // 1 MB (max file size)
};

const fileFilter = function (req, file, cb) {
    // supported image file mimetypes
    var allowedMimes = ['image/jpeg', 'image/pjpeg', 'image/png', 'image/gif'];

    if (_.includes(allowedMimes, file.mimetype)) {
        // allow supported image files
        cb(null, true);
    } else {
        // throw error for invalid files
        cb(new Error('Invalid file type. Only jpg, png and gif image files are allowed.'));
    }
};

// setup multer
const DIR = './uploads/';
const upload = multer({dest: DIR}).single('photo');
const uploader = multer({
    storage: storage,
    limits: limits,
    fileFilter: fileFilter
});

router.get('/:id', asyncHandler(getUserProfileById));

/* User Profile Routes */
router.use(passport.authenticate('jwt', {session: false}));

router.post('/update', asyncHandler(updateProfile));

router.post('/upload', uploader.single(process.env.AVATAR_FIELD), function (req, res, next) {

    let files;
    let file = req.file.filename;
    let matches = file.match(/^(.+?)_.+?\.(.+)$/i);

    if (matches) {
        files = _.map(['lg', 'md', 'sm'], function (size) {
            return matches[1] + '_' + size + '.' + matches[2];
        });
    } else {
        files = [file];
    }

    files = _.map(files, function (file) {
        //let port = req.app.get('port');
        //let base = req.protocol + '://' + req.hostname + (port ? ':' + port : '');
        let url = path.join(req.file.baseUrl, file).replace(/[\\\/]+/g, '/').replace(/^[\/]+/g, '');
        return '/' + url;
        //return (req.file.storage === 'local' ? base : '') + '/' + url;
    });

    res.json({
        images: files
    });



    // Use this block to not resize the image. Not recommended.
    // var path = '';
    // upload(req, res, function (err) {
    //     if (err) {
    //         // An error occurred when uploading
    //         console.log(err);
    //         return res.status(422).send("an Error occured")
    //     }
    //     console.log(req.file);
    //
    //     // No error occured.
    //     path = req.file.path;
    //     return res.send("Upload Completed for "+path);
    // });

    // console.log(req.user);

});


// Public methods
async function getUserProfileById(req, res) {
    await userProfileController.getUserProfileById(req.params.id, function (userProfile) {
        res.json(userProfile);
    });
}

// User access required methods
async function updateProfile(req, res) {
    if (req.user && req.user._id) {
        var userProfile = req.body;
        userProfile.user = req.user._id.toString();
        await userProfileController.updateUserProfile(userProfile, function (userProfile) {
            res.json(userProfile);
        });
    } else {
        res.status(500).json({status: "Access denied"});
    }
}

module.exports = router;
