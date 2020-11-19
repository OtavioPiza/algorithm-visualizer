import React from 'react'
import "../styles/components/Header.css"
import { Link } from 'react-router-dom'

const Header = ({link='/', title}) => {

    return (
        <div className="Header">
            <h1>
                {title}
            </h1>
            <Link to={link}>Go back</Link>
        </div>
    )
}

export default Header