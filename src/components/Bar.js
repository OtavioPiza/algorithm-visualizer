import React from 'react'
import '../styles/Bar.css'

const Bar = ({ className, size }) => {
    
    const style = {
        width: "80px",
        height: size + "px",
    }
    
    return (
        <button className={ className === undefined ? 'Bar' : className } id={ size } style={style}
        onClick={() => console.log('he')}>
        </button>
    )
}
export default Bar;