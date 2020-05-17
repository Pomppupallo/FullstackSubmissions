const blogRouter = require('express').Router()
const Blog = require('../models/blog')


blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  const body = request.body

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  })
    const savedBlog = await blog.save()
    response.json(savedBlog.toJSON())
})

blogRouter.delete('/:id', async (request, response) => {
  const oneToRemove = await Blog.findByIdAndRemove(request.params.id)
  response.json(oneToRemove)
})

blogRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true, useFindAndModify: false })
  response.json(updatedBlog.toJSON())
})

module.exports = blogRouter