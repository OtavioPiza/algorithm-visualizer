import React from 'react'
import '../styles/Button.css'

const Button = ({ eventHandler, text, id }) => (
    <button id={id} onClick={eventHandler}>
        <span>
            {text}
        </span>
    </button>
)
export default Button