import React from 'react';
import bubbleSort from '../../algorithms/sorting/bubbleSort';
import arrayManager from '../../util/arrayManager';
import ArraySorter from '../../components/ArraySorter';
import '../../styles/BubbleSort.css';

/**
 * React component representing a BubbleSort page of the application
 *
 * @return {JSX.Element} bubble sort page
 */
const BubbleSort = () => {
    return (
        <ArraySorter barList={arrayManager.getRandomList(10)} sortingAlgorithm={bubbleSort}/>
    );
};

export default BubbleSort;
