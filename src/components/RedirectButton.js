import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/components/RedirectButton.css'

/**
 * React component representing a redirect button
 *
 * @param {String, String, Integer, String} param0 link, text, id, classname
 */
const RedirectButton = ({ href, text, id, className }) => (
  <Link id={id} className={className === undefined ? 'RedirectButton' : className} to={href}>

    <span>
      {text}
    </span>

  </Link>
)

export default RedirectButton