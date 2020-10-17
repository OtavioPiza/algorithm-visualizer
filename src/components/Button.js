import React from 'react'

const Button = ({ eventHandler, text, src }) => (
    <button onClick={eventHandler}>
        {text}
    </button>
)
export default Button