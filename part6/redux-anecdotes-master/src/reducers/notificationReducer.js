export const setNotification = (message, time) => {
  return async dispatch => {
    dispatch(setMessage(message))
    let timeoutID = setTimeout(() => {
      dispatch(emptyMessage(timeoutID))
    }, (time * 1000))
  }
}

export const setMessage = (message) => {
  return {
    type: 'NEW_MESSAGE',
    data: message,
  }
}

export const emptyMessage = () => {
  return {
    type: 'EMPTY'
  }
}

const reducer = (state = '', action) => {
    switch(action.type) {
      case 'NEW_MESSAGE':
        return action.data
      case 'EMPTY':
        return ('')
      default:
        return state
    }
  }
  
export default reducer