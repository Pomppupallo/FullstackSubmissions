const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
})
  
test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')
  
    const title = response.body.map(r => r.title)
    expect(title).toContain(
      'React patterns'  )
})

test('a valid blog can be added', async () => {
    const newBlog = {
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5
    }

    await api
    .post('/api/blogs/')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

    const notesAtEnd = await helper.blogsInDb()
    expect(notesAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const titles = notesAtEnd.map(b => b.title)
    expect(titles).toContain(
        'Go To Statement Considered Harmful'
    )
})

test('blog is identified with id', async () => {
    const response = await api.get('/api/blogs')
  
    const ids = response.body.map(blog => blog.id)
    expect(ids).toBeDefined()
})

test('blog wihtout likes value -> value is set to 0', async () => {
    const response = await api.get('/api/blogs')
  
    const likes = response.body.map(blog => blog.likes)
    
    for(let i = 0; i < likes.length; i++) {
        if (likes[i] == undefined) {
            expect(likes[i]).toBe(0);
        }
    }
})

test('posting blog without title and url returns status 400', async () => {
    const newBlog = {
        author: 'Edsger W. Dijkstra',
        likes: 5
    }

    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

test('removing one blog', async () => {
    await api
    .delete('/api/blogs/5a422a851b54a676234d17f7')
    .expect(200)
    .expect('Content-Type', /application\/json/)

    const notesAtEnd = await helper.blogsInDb()
    expect(notesAtEnd).toHaveLength(helper.initialBlogs.length - 1)
})



afterAll(() => {
  mongoose.connection.close()
})