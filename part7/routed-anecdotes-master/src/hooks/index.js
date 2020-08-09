import { useState } from 'react'

export const useField = (type) => {
    const [value, setValue] = useState('')

    return {
        input: {
            type,
            value,
            onChange: event => {setValue(event.target.value)}
        },
        reset: () => setValue('')
    }
}