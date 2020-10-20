import React from 'react'
import '../styles/Bar.css'

const Bar = ({ className, size }) => {
    
    const style = {
        width: size + "px",
        height: size + "px",
    }
    
    return (
        <button className={ className === undefined ? 'Bar' : className } id={ size } style={style}>
        </button>
    )
}
export default Bar;