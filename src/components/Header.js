import React from 'react'

const Header = ({link, title}) => {

    return (
        <div className="header">
            <a href={link}> Go back </a>
            <h1>
                {title}
            </h1>
        </div>
    )
}

export default Header