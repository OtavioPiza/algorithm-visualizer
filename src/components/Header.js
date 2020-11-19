import React from 'react'
import "../styles/components/Header.css"

const Header = ({link, title}) => {

    return (
        <div className="Header">
            <h1>
                {title}
            </h1>
            <a href={link}> Go back </a>
        </div>
    )
}

export default Header