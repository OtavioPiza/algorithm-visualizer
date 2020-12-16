import React from 'react'
import bubbleSort from './algorithms/sorting/bubbleSort'
import arrayManager from './services/arrayManager'
import ArraySorter from './components/ArraySorter'
import './styles/BubbleSort.css'
import insertionSort from './algorithms/sorting/insertionSort'

/**
 * React component representing a BubbleSort page of the application
 */
const BubbleSort = () => {

  return (
    <ArraySorter barList={arrayManager.getRandomList(10)} sortingAlgorithm={insertionSort} />
  );
}

export default BubbleSort;