const _ = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, item) => {
        return sum + item
    }

    const likes = blogs.map(blog => blog.likes);

    return likes.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    let mostLiked = 0;
    let index = 0;
    for (let i = 0; i < blogs.length; i++) {
        if (blogs[i].likes > mostLiked) {
            mostLiked = blogs[i].likes
            index = i;
        }
    }
    const returnObject = {
        title: blogs[index].title,
        author: blogs[index].author,
        likes: blogs[index].likes
    }
    return returnObject
}

const mostBlogs = (blogs) => {
    if (blogs.length < 1) {
        return 
    }
    // Get all unique names from blogs 
    const uniqueNames = _.uniqBy(blogs, (blog) => {
        return blog.author
    })

    const uniqueAuthors = uniqueNames.map(blog => blog.author)
    const authors = blogs.map(blog => blog.author)

    // values to identify returned "Most Blogger"
    let amount = 0;
    let index = 0;
    let mostAmount = 0;

    // Test unique bloggers against blogs object -> how many times certain author is on the list
    for (let i = 0; i < uniqueAuthors.length; i++) {
        amount = _.countBy(authors)[uniqueAuthors[i]] || 0;
        if (amount > mostAmount) {
            mostAmount = amount;
            index = i;
        }
    }

    const returnObject = {
        author: uniqueAuthors[index],
        blogs: mostAmount
    }

    return returnObject
}

const mostLikes = (blogs) => {
    if (blogs.length < 1) {
        return 
    }
    
    const sorted = _.sortBy(blogs, blogs.author)

    let index = 0;
    let maxLikes = 0;
    let previusAuthor = sorted[0].author;
    let currentLikes = sorted[0].likes;

    for (let i = 1; i < sorted.length; i++) {
        likes = sorted[i].likes
        author = sorted[i].author
        if (author === previusAuthor) {
            currentLikes += likes;
            if (currentLikes > maxLikes) {
                maxLikes = currentLikes;
                index = i;
            }
        } else {
            previusAuthor = author;
            currentLikes = likes;
        }
    }

    const returnObject = {
        author: sorted[index].author,
        likes: maxLikes
    }

    return returnObject

}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}