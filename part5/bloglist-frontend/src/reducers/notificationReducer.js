
export const clearMessage = () => {
    return {
        type: 'EMPTY'
    }
}

export const setMessage = ( message ) => {
    return {
        type: 'NEW_MESSAGE',
        data: message
    }
}

const reducer = (state= '', action) => {
    switch (action.type) {
        case 'NEW_MESSAGE':
            return action.data
        case 'EMPTY':
            return ''
        default:
            return state
    }
}

export default reducer