import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {

    const addNew = async (event) => {
        event.preventDefault()
        const content = event.target.content.value;
        event.target.content.value = '';
        props.setNotification('you added new content', 4)
        props.createAnecdote(content)
    }

    return (
      <form onSubmit={addNew}>
        <h2>Create new Anecdote</h2>
        <div><input name='content'/></div>
        <button type='submit'>create</button>
      </form>
    )
}

const mapDispatchToProps = {
  createAnecdote,
  setNotification
}

export default connect(
  null,
  mapDispatchToProps
)(AnecdoteForm)
