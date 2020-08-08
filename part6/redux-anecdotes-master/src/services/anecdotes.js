import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const createNew = async (content) => {
    const object = { content: content, votes: 0 }
    const response = await axios.post(baseUrl, object)
    return response.data
}

const deleteOne = async (id) => {
    const response = await axios.delete(`${baseUrl}/${id}`)
    return response.data
}

const updateOne = async (anecdote) => {
    const response = await axios.put(`${baseUrl}/${anecdote.id}`, anecdote)
    return response.data
}

export default { 
    getAll,
    createNew,
    deleteOne,
    updateOne,
}