import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/components/RedirectButton.css'

const RedirectButton = ({ href, text, id, className }) => (
    <Link id={id} className={className === undefined ? 'RedirectButton' : className} to={href}>

        <span>
            {text}
        </span>

    </Link>
)

export default RedirectButton