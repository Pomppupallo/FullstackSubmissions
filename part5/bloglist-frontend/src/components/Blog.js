import React, { useState } from 'react'

const Blog = ({ blog, changeBlog, removeBlog, currentUser }) => {
    const [viewAll, setView] = useState(false)
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5,
        textAlign: 'left',
        lineHeight: 0.5
    }

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
        setView(!viewAll)
    }

    if (!viewAll) {
        return (
            <div id="blog" style = {blogStyle} className='blogViewTitleAuthor'>
                {blog.title} {blog.author} <button id="viewButton" onClick={toggleView}>view</button>
            </div>
        )
    }

    if (viewAll && blog.user.username === currentUser) {
        return (
            <div id="blog" style = {blogStyle} className='blogViewAllUser'>
                <p>{blog.title} {blog.author} <button onClick={toggleView}>hide</button> </p>
                <p>{blog.url} </p>
                <p>likes {blog.likes} <button onClick={updateBlog}>add like</button> </p>
                <p>{blog.user.name}</p>
                <button id="removeBlog" onClick={() => removeBlog(blog.id, blog.title)}>REMOVE BLOG</button>
            </div>
        )
    }

    return (
        <div id="blog" style = {blogStyle} className='blogViewAllNotUser'>
            <p>{blog.title} {blog.author} <button onClick={toggleView}>hide</button> </p>
            <p>{blog.url} </p>
            <p>likes {blog.likes} <button onClick={updateBlog}>add like</button> </p>
            <p>{blog.user.name}</p>
        </div>
    )
}

export default Blog
