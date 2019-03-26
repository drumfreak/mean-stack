const express = require('express');
const passport = require('passport');
const asyncHandler = require('express-async-handler');
const blogController = require('../controllers/blog.controller');
const _ = require('lodash');
const path = require('path');
const multer = require('multer');
const BlogStorage = require('../middleware/BlogStorage');
const router = express.Router();

module.exports = router;


// setup a new instance of the AvatarStorage engine
const storage = BlogStorage({
  square: false,
  responsive: true,
  greyscale: false,
  quality: 90
});

const limits = {
  files: 1, // allow only 1 file per request
  fileSize: 4096 * 1024, // 1 MB (max file size)
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
const uploader = multer({
  storage: storage,
  limits: limits,
  fileFilter: fileFilter
});

// Setting up the users api
// var users = require('../controllers/users');
router.get('/list/:page/:limit', asyncHandler(getBlogs));
router.get('/:id', asyncHandler(getBlogById));

/* User Blog Routes */
router.use(passport.authenticate('jwt', { session: false }));
router.post('/submit', asyncHandler(submitBlog));
router.post('/update', asyncHandler(updateBlog));
router.get('/delete/:id', asyncHandler(deleteBlogById));

router.post('/upload', uploader.single(process.env.BLOG_FIELD), function (req, res, next) {
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

});


// Public methods
async function getBlogs(req, res) {
  await blogController.getBlogs(req.params.page, req.params.limit,function(blogs) {
    res.json(blogs);
  });
}

async function getBlogById(req, res) {
  await blogController.getBlogById(req.params.id, function(blog) {
    res.json(blog);
  });
}

// User access required methods
async function submitBlog(req, res) {
  if(req.user && req.user._id) {
    let blogEntry = req.body;
    blogEntry.user = req.user._id.toString();
    await blogController.submitBlog(blogEntry, function(blog) {
      res.json(blog);
    });
  } else {
    res.status(500).json({status:"Access denied"});
  }
}

async function updateBlog(req, res) {
  if (req.user && req.user._id) {
    let blogEntry = req.body;
    blogEntry.user = req.user._id.toString();
    await blogController.updateBlog(blogEntry, function (blog) {
      res.json(blog);
    });
  } else {
    res.status(500).json({status: "Access denied"});
  }
}

async function deleteBlogById(req, res) {
  if (req.user && req.user._id) {
    await blogController.deleteBlogById(req.params.id, function (blog) {
      if (blog === 'ok') {
        res.json({message: 'ok'});
      } else {
        res.json({message: 'error'});
      }
    });
  } else {
    res.status(500).json({status: "Access denied"});
  }
}

module.exports = router;
