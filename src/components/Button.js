import React from 'react'
import grayButton from '../styles/components/icons/button-gray-3x1.svg'
import redButton from '../styles/components/icons/button-red-3x1.svg'
import '../styles/components/Button.css'

/**
 * React component representing a button
 * 
 * @param {{Function, String, Integer, String, Boolean}} param 
 */
const Button = ({ eventHandler, text, id, className, red = false }) => {

    /**
     * Sets the button background depending on its state
     */
    const background = red ? redButton : grayButton

    /**
     * Sets the button style dependign on its state
     */
    const style = {
        background: `url(${background})`,
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
        color: `${red ? "#0F0D0D" : "#F4F4F4"}`
    }

    // == HTML ====================================================================================================== //

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