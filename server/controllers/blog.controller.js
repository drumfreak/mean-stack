const Joi = require('joi');
const Blog = require('../models/blog.model');

const blogSchema = Joi.object({
  title: Joi.string().required(),
  body: Joi.string().required(),
  caption: Joi.string().required(),
  user: Joi.string().required()
})

module.exports = {
  submitBlog,
  getBlogs
}

async function submitBlog(blog, cb) {
  if(!blog) {
    return {};
  }
  // console.log('Server side blog submit');
  // console.log(blog);

  let blogEntry = await Joi.validate(blog, blogSchema, {abortEarly: false});
  cb(await new Blog(blogEntry).save());
}

async function getBlogs(page, cb) {
  Blog.find({})
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
