import React from 'react'
import grayButton from '../styles/components/icons/button-gray-3x1.svg'
import redButton from '../styles/components/icons/button-red-3x1.svg'
import '../styles/components/Button.css'

const Button = ({ eventHandler, text, id, className, red = false }) => {

    const background = red ? redButton : grayButton

    const style = {
        background: `url(${background})`,
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
        color: `${red ? "#0F0D0D" : "#F4F4F4"}`
    }

    return (
        <button id={id} className={className === undefined ? 'Button' : className}
            onClick={eventHandler} style={style}>
            <span>
                {text}
            </span>
        </button>
    )
}

export default Button