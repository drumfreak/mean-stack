var express = require('express');
const passport = require('passport');
const asyncHandler = require('express-async-handler');
const blogController = require('../controllers/blog.controller');

var router = express.Router();
module.exports = router;


// Setting up the users api
// var users = require('../controllers/users');

/* Submit Email Contact. */
router.use(passport.authenticate('jwt', { session: false }));
router.post('/submit', asyncHandler(submitBlog));
router.get('/list/:page', asyncHandler(getBlogs));

async function submitBlog(req, res) {
  let blogEntry = req.body;

  console.log(req.user);

  blogEntry.user = req.user._id.toString();

  await blogController.submitBlog(blogEntry, function(blog) {
    // console.log('Saved contact to db');
    // console.log(blog);
    res.json(blog);
  });
}

async function getBlogs(req, res) {
  await blogController.getBlogs(req.params.page, function(blogs) {
    // console.log('Saved contact to db');
    // console.log(blog);
    res.json(blogs);
  });
}



module.exports = router;
