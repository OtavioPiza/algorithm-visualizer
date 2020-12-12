import React from 'react'
import Header from './components/Header'
import './styles/Explore.css'

/**
 * React app
 */
function Explore() {

  return (
      <div className='Explore'>
          
          <div className='PageHeader'>
          
            <Header title='Explore'/>

          </div>

          <div className='TextContainer'>

            <h1>
                About
            </h1>

          </div>


      </div> 
  )
}

export default Explore;