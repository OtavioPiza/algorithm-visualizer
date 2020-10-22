import React from 'react'
import '../styles/components/Button.css'

const Button = ({ eventHandler, text, id, className }) => (
    <button id={id} className={ className === undefined ? 'Button' : className} 
    onClick={eventHandler}>
        <span>
            {text}
        </span>
    </button>
)

export default Button