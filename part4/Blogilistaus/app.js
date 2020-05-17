const express = require('express')
const app = express()
const cors = require('cors')
const blogRouter = require('./controllers/blogs')
const mongoose = require('mongoose')

const mongoUrl = 'mongodb+srv://blogger:blogger@bloggertietokanta-tojah.mongodb.net/blog?retryWrites=true&w=majority'
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true}).then(response => {
    console.log("mongoDB ok")
}).catch(error => {
    console.log(error)
})

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogRouter)

module.exports = app