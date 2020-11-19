import React from 'react'
import bubbleSort from './algorithms/bubbleSort'
import arrayManager from './services/arrayManager';
import ArraySorter from './components/ArraySorter'


const BubbleSort = () => {

  return (
    <ArraySorter barList={arrayManager.getRandomList(10)} sortingAlgorithm={bubbleSort} />
  );
}

export default BubbleSort;