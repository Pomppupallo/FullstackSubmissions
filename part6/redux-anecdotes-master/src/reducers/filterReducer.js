

export const filter = (filter) => {
    return {
        type: 'NEWFILTER',
        data: {
            filter
        }
    }
}

const reducer = (state = '', action) => {
    switch(action.type) {
        case('NEWFILTER'):
            return action.data
        default:
            return state
    }
}

export default reducer