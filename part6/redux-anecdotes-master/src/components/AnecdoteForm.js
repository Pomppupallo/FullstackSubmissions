import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
    const dispatch = useDispatch()

    const addNew = async (event) => {
        event.preventDefault()
        const content = event.target.content.value;
        event.target.content.value = '';
        dispatch(setNotification('you added new content', 4))
        dispatch(createAnecdote(content))
    }

    return (
      <form onSubmit={addNew}>
        <h2>Create new Anecdote</h2>
        <div><input name='content'/></div>
        <button type='submit'>create</button>
      </form>
    )
}

export default AnecdoteForm