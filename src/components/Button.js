import React from 'react'

const Button = ({ eventHandler, text }) => (
    <button onClick={eventHandler}>{text}</button>
)
export default Button