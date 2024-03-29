import React, { useState } from 'react';
import Bar from './Bar';
import '../styles/components/Array.css';
import arrayManager from '../util/arrayManager';

/**
 * React component representing an array of Bar components
 * - responsible for the interaction between the user and the bars
 * - does NOT support integration with any algorithm algorithms
 *
 * @param {Bar[], Boolean} param    : array of bars and if they should be simplified or not
 * @returns {JSX.Element} : an array containing a Bar component for each bar on the provided list
 */
const SimpleArray = ({ barList, simplified }) => {
  /* Holds an array of bars */
  const [bars, setBars] = useState(barList);

  /* Holds whether the array is sorted */
  const sorted = arrayManager.isSorted(bars);

  // == User Interactivity ======================================================================================== //

  /**
   * Selects a Bar in the provided index
   *
   * @param {Number} id index of the bar
   */
  const selectBar = (id) => {
    setBars(arrayManager.selectBar(id, bars));
  };

  // == HTML ====================================================================================================== //

  return (
    <div className='Array'>
      {bars.map((bar, index) => (
        <Bar key={index} id={index} size={bar.size} status={bar.status === 1 ? 1 : sorted ? 3 : bar.status}
          simplified={simplified} eventHandler={selectBar} />
      ))}
    </div>
  );
};

export default SimpleArray;
