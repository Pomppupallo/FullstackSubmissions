const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')
const logger = require('../utils/logger')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog
  .find({}).populate('user', {username: 1, name: 1})
  response.json(blogs.map(blog => blog.toJSON()))
})

blogRouter.post('/', async (request, response) => {
  const body = request.body
  const token = request.token
  console.log(token)

  const decodedToken = jwt.verify(token, config.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

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