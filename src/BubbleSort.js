import React from 'react'
import './styles/App.css';
import bubbleSort from './algorithms/bubbleSort'
import arrayManager from './services/arrayManager';
import ArraySorter from './components/ArraySorter'


const BubbleSort = () => {

  return (
    <div className='container'>
        <ArraySorter barList={ arrayManager.getRandomList(10) } sortingAlgorithm={ bubbleSort }/>
    </div>
  );
}

export default BubbleSort;