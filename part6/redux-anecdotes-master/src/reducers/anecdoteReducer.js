import anecdoteService from '../services/anecdotes'

export const addVote = (anecdote) => {
  const alteredState = {
    ...anecdote,
    votes: anecdote.votes + 1
  }
  return async dispatch => {
    const oneToUpdate = await anecdoteService.updateOne(alteredState)
    dispatch({
    type: 'ADD_VOTE',
    data: oneToUpdate,
    })
  }
}

export const deleteAnecdote = (id) => {
  return async dispatch => {
    const oneToDelete = await anecdoteService.deleteOne(id)
    dispatch({
      type: 'DELETE_ID',
      data: id,
    })
  }
}


export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    console.log('uusi tallennettava')
    dispatch({
      type: 'CREATE_ANECDOTE',
      data: newAnecdote,
    })
  }
}

export const initializeAnecdotes = (anecdotes) => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}


const reducer = (state = [], action) => {
  switch(action.type) {
    case 'DELETE_ID':
      return  state.filter(anecdote => anecdote.id !== action.data)
    case 'ADD_VOTE':
      return state.map(anecdote => anecdote.id !== action.data.id ? anecdote : action.data)
    case 'CREATE_ANECDOTE':
      return[...state, action.data]
    case 'INIT_ANECDOTES':
      return action.data
    default:
      break;
  }
  return state
}


export default reducer