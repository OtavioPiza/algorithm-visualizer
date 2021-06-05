import React from 'react';
import '../styles/components/Header.css';
import {Link} from 'react-router-dom';

/**
 * React component representing a header
 *
 * @param {String, String} param0 link, title
 */
const Header = ({link = '/', title}) => (
  <div className="Header">
    <h1>
      {title}
    </h1>
    <Link to={link}>Go back</Link>
  </div>
);

export default Header;
