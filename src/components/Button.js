import React from 'react'

const Button = ({ eventHandler, text, src }) => (
    <button onClick={eventHandler}>{text}
        <img src={src} alt={text}/>
    </button>
)
export default Button