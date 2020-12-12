import React from 'react'
import BottomBar from './components/BottomBar'
import Header from './components/Header'
import RedirectButton from './components/RedirectButton'
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
                Sorting algorithms
            </h1>

            <BottomBar></BottomBar>

            <RedirectButton href='bubblesort' text='Bubble Sort' />

          </div>


      </div> 
  )
}

export default Explore;