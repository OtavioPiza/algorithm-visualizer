import React from 'react'
import "../styles/components/Header.css"

const Header = ({link, title}) => {

    return (
        <div className="Header">
            <a href={link}> Go back </a>
            <h1>
                {title}
            </h1>
        </div>
    )
}

export default Header