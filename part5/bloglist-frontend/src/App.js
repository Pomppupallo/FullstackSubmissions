import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setMessage("wrong username or password");
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    }
  };

  const handleBlogSubmit = async (event) => {
    event.preventDefault();
    if (!title || !author || !url) {
      setMessage("Missing field");
      setTimeout(() => {
        setMessage(null);
      }, 3000);
      return;
    }
    const blogObject = {
      title: title,
      author: author,
      url: url,
      likes: 0,
    };

    try {
      const response = await blogService.create(blogObject);
      setMessage(
        `a new blog ${response.title} by ${response.author} added`
      );
      setTimeout(() => {
        setMessage(null);
      }, 3000);
      setBlogs(blogObject);
    } catch (exception) {
      setMessage(`No valid token`);
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    }
  };

  const blogForm = () => (
    <form onSubmit={handleBlogSubmit}>
      <h2>create new</h2>
      <div>
        <p>
          <label>
            Title:
            <input
              type="text"
              name="title"
              value={title}
              onChange={({ target }) => setTitle(target.value)}
            />
          </label>
        </p>
        <p>
          <label>
            Author:
            <input
              type="text"
              name="author"
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
            />
          </label>
        </p>
        <p>
          <label>
            Url:
            <input
              type="text"
              name="url"
              value={url}
              onChange={({ target }) => setUrl(target.value)}
            />
          </label>
        </p>
      </div>
      <button type="submit">submit</button>
    </form>
  );

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <h1>Log in to application</h1>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );

  const clearUser = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    setUser(null);
  };

  const showBlogs = () => (
    <div>
      <h1>Blogs</h1>
      <p>
        {" "}
        {user.name} is logged in <button onClick={clearUser}>logout</button>{" "}
      </p>
      {blogForm()}
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );

  return (
    <div>
      <Notification message={message} />
      {user !== null && showBlogs()}
      {user === null && loginForm()}
    </div>
  );
};

export default App;
