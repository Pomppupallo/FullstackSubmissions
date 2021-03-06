import React, { useState } from 'react'

const BlogForm = ({ createBlog })  => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] =useState('')

    const handleTitleChange = (event) => {
        setTitle(event.target.value)
    }

    const handleAuthorChange = (event) => {
        setAuthor(event.target.value)
    }

    const handleUrlChange = (event) => {
        setUrl(event.target.value)
    }

    const addBlog = (event) => {
        event.preventDefault()
        const blogObject = {
            title: title,
            author: author,
            url: url,
            likes: 0
        }
        createBlog(blogObject)

        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return (
        <div className="form">
            <h2>create new blog</h2>

            <form id='blogForm' onSubmit={addBlog}>
                <div>
                    <p>
                        <label>
            Title:
                            <input
                                id="title"
                                type="text"
                                name="title"
                                value={title}
                                onChange={handleTitleChange}
                            />
                        </label>
                    </p>
                    <p>
                        <label>
            Author:
                            <input
                                id="author"
                                type="text"
                                name="author"
                                value={author}
                                onChange={handleAuthorChange}
                            />
                        </label>
                    </p>
                    <p>
                        <label>
            Url:
                            <input
                                id="url"
                                type="text"
                                name="url"
                                value={url}
                                onChange={handleUrlChange}
                            />
                        </label>
                    </p>
                </div>
                <button type="submit">submit</button>
            </form>
        </div>
    )
}

export default BlogForm