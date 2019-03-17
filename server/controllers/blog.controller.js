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
  getBlogs,
  getBlogById
}

async function submitBlog(blog, cb) {
  if(!blog) {
    return {};
  }
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

async function getBlogById(id, cb) {
  Blog.findById(id)
      .sort('-createdAt')
      .populate('user', '-hashedPassword -email')
      .exec(function(err, data) {
        // console.log(err, data, data.length);
        if(data) {
            let blog = Object.assign({}, data._doc);
            Blog.findOne({_id: {$gt: data._id}})
                .select('_id createdAt title')
                .sort({createdAt: 1}).exec(function(err, dataNext) {
                    if(dataNext) {
                        blog.nextBlog = {_id: dataNext._id, createdAt: dataNext.createdAt, title: dataNext.title};
                    } else {
                        blog.nextBlog = {};
                    }

                    Blog.findOne({createdAt: {$lt: data.createdAt}})
                        .select('_id createdAt title')
                        .sort({createdAt: -1}).exec(function (err, dataPrev) {
                            if(dataPrev) {
                                blog.prevBlog = { _id: dataPrev._id, createdAt: dataPrev.createdAt, title: dataPrev.title};
                            } else {
                                blog.prevBlog = {};
                            }
                            // console.log(blog);
                            cb(blog);
                    });
            });
        } else {
          cb({});
        }
      });
}


