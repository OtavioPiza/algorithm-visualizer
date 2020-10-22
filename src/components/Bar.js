import React from 'react'
import '../styles/components/Bar.css'
import selectedBar from '../styles/components/icons/bar-selected-blue.svg'
import sortedBar from '../styles/components/icons/bar-sorted-green.svg'
import pepe from "../styles/images/3.jpg"

const Bar = ({ className, id, size, selected, sorted, unsorted /** Delete */, eventHandler }) => {
   
    const background = sorted ? `url(${sortedBar})` :
        unsorted ? `url(${pepe})` : // Delete
        selected ? `url(${selectedBar})` : ``
    
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