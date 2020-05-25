import React, { useState } from "react";

const Blog = ({ blog, changeBlog, removeBlog, currentUser }) => {
  const [viewAll, setView] = useState(false);
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    textAlign: 'left',
    lineHeight: 0.5
  }

  console.log('Blogin käyttäjä --->', blog.user.username)
  console.log('Nykyinen käyttäjä --->', currentUser)

  const updateBlog = () => {

    const newObject= {
      user: blog.user,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }

    const id = blog.id
    changeBlog(id, newObject)

  }

  const toggleView = () => {
    setView(!viewAll);
  };

  if (!viewAll) {
    return (
      <div style = {blogStyle}>
        {blog.title} {blog.author} <button onClick={toggleView}>view</button>
      </div>
    );
  }

  if (viewAll && blog.user.username === currentUser) {
    return (
      <div style = {blogStyle}>
        <p>{blog.title} {blog.author} <button onClick={toggleView}>hide</button> </p>
        <p>{blog.url} </p>
        <p>likes {blog.likes} <button onClick={updateBlog}>add like</button> </p>
        <p>{blog.user.name}</p>
        <button onClick={() => removeBlog(blog.id, blog.title)}>REMOVE BLOG</button>
      </div>
    );
  }

  return (
    <div style = {blogStyle}>
      <p>{blog.title} {blog.author} <button onClick={toggleView}>hide</button> </p>
      <p>{blog.url} </p>
      <p>likes {blog.likes} <button onClick={updateBlog}>add like</button> </p>
      <p>{blog.user.name}</p>
    </div>
  );
};

export default Blog;
