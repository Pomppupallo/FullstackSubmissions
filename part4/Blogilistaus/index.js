const app = require('./app')
const http = require('http')
const config = require('./utils/config')

const server = http.createServer(app)

server.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})

// Models/Blog
/*const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)*/

//APP component
/*
const mongoUrl = 'mongodb+srv://blogger:blogger@bloggertietokanta-tojah.mongodb.net/test?retryWrites=true&w=majority'
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true}).then(response => {
    console.log("mongoDB ok")
}).catch(error => {
    console.log(error)
})

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogRouter)
*/

// Controller/blogs
/*app.get('/api/blogs', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})*/
