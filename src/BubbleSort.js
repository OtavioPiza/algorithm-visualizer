import React from 'react'
import bubbleSort from './algorithms/sorting/bubbleSort'
import arrayManager from './services/arrayManager'
import ArraySorter from './components/ArraySorter'
import './styles/BubbleSort.css'


const BubbleSort = () => {

  return (
    <ArraySorter barList={arrayManager.getRandomList(10)} sortingAlgorithm={bubbleSort} />
  );
}

export default BubbleSort;