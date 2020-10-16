import React from 'react'

const Button = ({ eventHandler, text, src }) => (
    <button onClick={eventHandler}>{text}
        <img src={src}></img>
    </button>
)
export default Button