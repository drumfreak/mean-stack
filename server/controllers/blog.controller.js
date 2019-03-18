const Joi = require('joi');
const Blog = require('../models/blog.model');

const blogSchema = Joi.object({
    title: Joi.string().required(),
    body: Joi.string().required(),
    caption: Joi.string().required(),
    user: Joi.string().required(),
    views: Joi.number(), // optional
    createdAt: Joi.string(), // optional
    _id: Joi.string() // optional

})

module.exports = {
    submitBlog,
    updateBlog,
    getBlogs,
    getBlogById,
    deleteBlogById
}

async function submitBlog(blog, cb) {
  if(!blog) {
    return {};
  }
  let blogEntry = await Joi.validate(blog, blogSchema, {abortEarly: false});
  cb(await new Blog(blogEntry).save());
}

async function updateBlog(blog, cb) {
    if(!blog) {
        return {};
    }
    delete blog.prevBlog;
    delete blog.nextBlog;

    let blogEntry = await Joi.validate(blog, blogSchema, {abortEarly: false});
    Blog.findOne({ _id: blogEntry._id }, function (err, blog){
        blog.title = blogEntry.title;
        blog.caption = blogEntry.caption;
        blog.body = blogEntry.body;
        blog.save();
        // console.log(blog);
        cb(blog);
    });
}

async function getBlogs(pageX, limitX,  cb) {
    const limit = parseInt(limitX);
    const page = parseInt(pageX);

    Blog.estimatedDocumentCount({}, function (err, count) {
        if (err) {
            cb({count: 0, data:[]});
        }
        if(count > 0) {
            Blog.find({})
                .skip(page * limit)
                .limit(limit)
                .sort('-createdAt')
                .populate('user', '-hashedPassword -email')
                .exec(function(err, data) {
                    // console.log(err, data);
                    if(data) {
                        cb({count: count, data:data});
                    } else {
                        cb({count: 0, data: []});
                    }
                });
        } else {
            cb({count: 0, data: []})
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


async function deleteBlogById(id, cb) {
    Blog.findById(id)
        .sort('-createdAt')
        .exec(function(err, data) {
            // console.log(err, data, data.length);
            if(data) {
                data.remove();
                console.log(data);
                cb('ok');
            } else {
                cb('error');
            }
        });
}

