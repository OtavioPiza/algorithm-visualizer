import React from 'react';
import arrayManager from './util/arrayManager';
import ArraySorter from './components/ArraySorter';
import './styles/InsertionSort.css';
import insertionSort from './algorithms/sorting/insertionSort';

/**
 * React component representing a BubbleSort page of the application
 */
const BubbleSort = () => {
  return (
    <ArraySorter barList={arrayManager.getRandomList(10)} sortingAlgorithm={insertionSort} />
  );
};

export default BubbleSort;
