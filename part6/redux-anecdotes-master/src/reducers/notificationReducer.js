
export const setNotification = (message, time) => {

  return async dispatch => {
    let timer = setTimeout(() => {
      dispatch(emptyMessage())
    }, (time * 1000))
    dispatch(setMessage(message, timer))
  }
}

export const setMessage = (message, timer) => {
  return {
    type: 'NEW_MESSAGE',
    data: {
      message,
      timer
    }
  }
}

export const emptyMessage = (timer) => {
  return {
    type: 'EMPTY',
    data: timer
  }
}

// Viestien tyhjennyksen valvontaan
let timer = []

const reducer = (state = '', action) => {
    switch(action.type) {
      case 'NEW_MESSAGE':
        //Nollataan vanhat setTimeout funktiot, mikäli niitä löytyy
        timer.push(action.data.timer)
        if(timer.length > 1) {
          clearTimeout(timer[0])
          timer = []
        }
        return action.data.message
      case 'EMPTY':
        return ('')
      default:
        return state
    }
  }
  
export default reducer