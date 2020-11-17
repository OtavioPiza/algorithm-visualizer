import React from 'react'
import '../styles/components/RedirectButton.css'

const RedirectButton = ({ href, text, id, className }) => (
    <a id={id} className={ className === undefined ? 'RedirectButton' : className} href={href} text={text}>
        <span>
            {text}
        </span>
    </a>
)

export default RedirectButton