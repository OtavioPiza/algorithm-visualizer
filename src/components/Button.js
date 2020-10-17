import React from 'react'

const Button = ({ eventHandler, text, id }) => (
    <button onClick={eventHandler} id={id}>
        <p>
            {text}
        </p>
    </button>
)
export default Button