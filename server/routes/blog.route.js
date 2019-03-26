var express = require('express');
var passport = require('passport');
var asyncHandler = require('express-async-handler');
var blogController = require('../controllers/blog.controller');

var router = express.Router();
module.exports = router;

// Setting up the users api
// var users = require('../controllers/users');
router.get('/list/:page/:limit', asyncHandler(getBlogs));
router.get('/:id', asyncHandler(getBlogById));

/* User Blog Routes */
router.use(passport.authenticate('jwt', { session: false }));
router.post('/submit', asyncHandler(submitBlog));
router.post('/update', asyncHandler(updateBlog));
router.get('/delete/:id', asyncHandler(deleteBlogById));

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
