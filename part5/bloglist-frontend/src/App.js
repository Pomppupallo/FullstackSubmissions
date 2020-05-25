import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState('')
  const blogFormRef = React.createRef()

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setMessage('wrong username or password')
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    }
  }

  const addBlog = async (blogObject) => {
    try {
      let newBlog = await blogService.create(blogObject)
      blogFormRef.current.toggleVisibility()
      newBlog.user = user
      setBlogs(blogs.concat(newBlog))
      setMessage(`a new blog "${newBlog.title}" added by ${user.name}`)
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    } catch (exception) {
      setMessage('Some inputs are missing - Try again')
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    }
  }

  const changeBlog = async (id, newObject) => {
    try {
      let newBlog = await blogService.update(id, newObject)
      const userB = blogs.find((blog) => blog.id === newBlog.id)
      newBlog = {
        ...newBlog,
        user: userB.user,
      }
      setBlogs(blogs.map((blog) => (blog.id === newBlog.id ? newBlog : blog)))
      setMessage(`a blog "${newBlog.title}" was liked by ${user.name}`)
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    } catch (exception) {
      setMessage(`${exception.error}`)
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    }
  }

  const removeBlog = async (id, title) => {
    if (window.confirm(`remove ${title}?`)) {
      try {
        const newBlog = await blogService.remove(id)
        setBlogs(blogs.filter((blog) => blog.id !== newBlog.id))
        setMessage(`a blog "${newBlog.title}" was removed ${user.name}`)
        setTimeout(() => {
          setMessage(null)
        }, 3000)
      } catch (exception) {
        setMessage(`${exception.error}`)
        setTimeout(() => {
          setMessage(null)
        }, 3000)
      }
    }
  }

  const showBlogs = () => {
    return (
      <ul>
        {blogs.map((blog) => (
          <div key={blog.id}>
            <Blog
              changeBlog={changeBlog}
              removeBlog={removeBlog}
              blog={blog}
              currentUser={user.username}
            />
          </div>
        ))}
      </ul>
    )
  }
  const sortByLikes = () => {
    blogs.sort((a, b) => (a.likes < b.likes ? 1 : -1))
  }

  const clearUser = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const blogForm = () => (
    // eslint-disable-next-line no-unused-expressions
    <Togglable buttonLabel="create new blog" ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )

  const loginForm = () => (
    // eslint-disable-next-line no-unused-expressions
    <Togglable buttonLabel="log in">
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />
    </Togglable>
  )

  return (
    <div>
      <h1>Blogs</h1>
      <Notification message={message} />
      {user === null ? (
        loginForm()
      ) : (
        <div>
          <p>{user.name} logged in <button onClick={() => clearUser()}>logout</button></p>
          {sortByLikes()}
          {blogForm()}
          {showBlogs()}
        </div>
      )}
    </div>
  )
}

export default App
