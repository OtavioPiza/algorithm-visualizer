import React from 'react';
import Header from './components/Header';
import './styles/About.css';

/**
 * About field
 *
 * @return {JSX.Element} about page
 */
const About = () => (
  <div className='About'>

    <div className='PageHeader'>

      <Header title='About'/>

    </div>

    <div className='TextContainer'>

      <h1>
          About
      </h1>

    </div>

  </div>
);
export default About;
