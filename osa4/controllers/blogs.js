const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {name:1, username:1, id:1 })
  response.json(blogs)  
  // Blog
  //     .find({})
  //     .then(blogs => {
  //       response.json(blogs)
  //     })
  })
  
blogsRouter.post('/', async (request, response) => {
    const body = request.body
    console.log(body.user)

    // const user = await User.findById(body.user)
    const users = await User.find({})
    const user = users[0]
    
    const blog = new Blog( {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id
    })

    if(!request.body.title || !request.body.url) {
      response.status(400).end()
    }
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog);

    // const result = await blog.save();
    // response.status(201).json(result);
  //   blog
  //     .save()
  //     .then(result => {
  //       response.status(201).json(result)
  //     })
  })
blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id) 
    response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const { likes } = request.body

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id,
    { likes },
    { new: true})

    if(updatedBlog) {
      response.json(updatedBlog)
    } else {
      response.status(404).end()
    }
    
})
  module.exports = blogsRouter