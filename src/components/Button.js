import React from 'react'

const Button = ({ eventHandler, text, id }) => (
    <button onClick={eventHandler} id={id}>
        {text}
    </button>
)
export default Button