const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)  
  // Blog
  //     .find({})
  //     .then(blogs => {
  //       response.json(blogs)
  //     })
  })
  
blogsRouter.post('/', async (request, response) => {

    const blog = new Blog(request.body);
    if(!request.body.title || !request.body.url) {
      response.status(400).end()
    }
    const savedBlog = await blog.save()
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
  console.log(request.params.id)
  await Blog.findByIdAndRemove(request.params.id) 
    response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const { likes } = request.body
  console.log({ likes })

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