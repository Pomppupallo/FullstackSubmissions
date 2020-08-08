import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addVote, deleteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const newVote = (dispatch, anecdote) => {
    dispatch(setNotification(`you voted '${anecdote.content}'`, 5))
    dispatch(addVote(anecdote))
}

const Anecdote =  ({ anecdote, handleClick, handleDelete }) => {
    return(
        <>
        <div>
            {anecdote.content}
        </div>
        <div>
            has {anecdote.votes}
            <button onClick={handleClick}>vote</button><span><button onClick={handleDelete}>delete</button></span>
        </div>
        </>
    )
}

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => state.anecdotes)
    const filter = useSelector(state => state.filter)
    let filteredAnecdotes = anecdotes 

    if (filter !== '') {
        filteredAnecdotes = anecdotes.filter(anecdote => anecdote.content.includes(filter.filter))
    } 

    filteredAnecdotes.sort((a, b) => (a.votes < b.votes) ? 1 : -1);

    return(
        <div>
            {filteredAnecdotes.map(anecdote =>
            <Anecdote
                key={anecdote.id}
                anecdote={anecdote}
                handleClick={() =>
                newVote(dispatch, anecdote)
                }
                handleDelete={() =>
                dispatch(deleteAnecdote(anecdote.id))}
            />
            )}
        </div>
    )
}

export default AnecdoteList