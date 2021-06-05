import React from 'react';
import BottomBar from './components/BottomBar';
import Header from './components/Header';
import RedirectButton from './components/RedirectButton';
import './styles/Explore.css';

/**
 * React app
 */
function Explore() {
  return (
    <div className='Explore'>

      <div className='PageHeader'>

        <Header title='Explore' />

      </div>

      <div className='TextContainer'>


        <h1>
          Sorting algorithms
        </h1>

        <BottomBar></BottomBar>

        <div className='SortingAlgorithms'>

          <RedirectButton href='bubblesort' text='Bubble Sort' />
          <RedirectButton href='insertionsort' text='Insertion Sort' />

        </div>

      </div>


    </div>
  );
}

export default Explore;
