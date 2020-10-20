import React from 'react'
import '../styles/Bar.css'
import selectedBar from '../styles/images/bar-selected-blue.svg'

const Bar = ({ className, id, size, selected, eventHandler }) => {
   
    const background = selected ? `url(${selectedBar})` : ``
    const style = {
        width: "80px",
        height: size + "px",
        backgroundImage: background,     
    }
    
    return (
        <button className={ className === undefined ? 'Bar' : className } id={ size } style={ style }
        onClick={() => eventHandler(id)}>
        </button>
    )
}
export default Bar;