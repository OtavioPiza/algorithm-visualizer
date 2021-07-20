import React from 'react';
import arrayManager from '../../util/arrayManager';

/**
 * Locks bars in the list that are already outside of the algorihtm's scope
 * 
 * @param {{
 *  status: number;
 * }[]} bars list of bars
 * @param {Number} lowerBound maximum index allowed 
 */
const _getLockedBarsBellow = (bars, lowerBound) => (
  bars.map((bar, index) => index < lowerBound ? { ...bar, status: bar.status === 2 ? 2 : 4 } : bar)
)

/**
 * Locks bars in the list that are already outside of the algorihtm's scope
 * 
 * @param {{
 *  status: number;
 * }[]} bars list of bars
 * @param {Number} lowerBound maximum index allowed 
 */
const _getLockedBarsAbove = (bars, upperBound) => (
  bars.map((bar, index) => index > upperBound ? { ...bar, status: bar.status === 2 ? 2 : 4 } : bar)
)


/**
 * Returns the state of the algorithm
 *
 * @param {{
 *  size: number;
 *  id: number;
 *  status: number;
 * }[]} barArray                  : a list of bar objects
 * @param {boolean} sorted        : if the list is sorted or not
 * @param {number} complexity     : current complexity of the algorithm
 */
const defaultState = (barArray, sorted = false, currentComplexity = 0) => {
  const message = sorted ? 'Finished sorting!' : 'Ready to start sorting!';
  const worstComplexity = (barArray.length * (barArray.length - 1)) / 2;
  const bestComplexity = barArray.length - 1;

  const _analyzedBarsIndex = [-1, 0];
  const _maxAnalyzedBarsIndex = [-1, 0];
  const _lowerBound = 0;
  const _step = 0;

  return [
    {
      // public use

      message,                // message displayed to the user
      worstComplexity,        // worse case complexity
      bestComplexity,         // best case complexity
      currentComplexity,      // current complexity
      sorted,                 // wheter the list it sorted

      // internal use

      _analyzedBarsIndex,
      _maxAnalyzedBarsIndex,
      _lowerBound,
      _step,

    },
    barArray.map((bar) => ({ ...bar, status: bar.status === 1 ? 1 : sorted ? 3 : 0 })),
  ];
};

/**
 * Takes one _step in the sorting algorithm
 *
 * @param {[{
 *  message: string;
 *  worstComplexity: number;
 *  bestComplexity: number;
 *  currentComplexity: number;
 *  sorted: boolean;
 *  _analyzedBarsIndex: number[];
 *  _maxAnalyzedBarsIndex: number[];
 *  _lowerBound: number;
 *  _step: number;
 * }, {
 *  size: number;
 *  id: number;
 *  status: number;
 * }[]]} state : state of the algorithm
 */
const sort = (state) => {
  const status = state[0];
  const bars = state[1];

  /**
     * Returns the next two bars that will be analyzed by te algorithm
     */
  const compareNextBars = () => {
    const _maxAnalyzedBarsIndex = status._maxAnalyzedBarsIndex.map((index) => index + 1);

    if (!bars[_maxAnalyzedBarsIndex[1]]) {
      return defaultState(bars, true, status.currentComplexity);
    }

    const greater = bars[_maxAnalyzedBarsIndex[1]].size > bars[_maxAnalyzedBarsIndex[0]].size;
    const message = greater ?
      'Because the second bar is greater than the second, they are left unchanged and the algorithm continues' :
      'Because the first bar is greater than the second, they are switched and the algorithm starts analysing the bars to its left';
    const newBars = bars.map((bar, index) => (
      index === _maxAnalyzedBarsIndex[0] || index === _maxAnalyzedBarsIndex[1] ?
        { ...bar, status: 2 } :
        { ...bar, status: 0 }
    ));

    return [
      {
        ...status,
        message: message,
        _analyzedBarsIndex: _maxAnalyzedBarsIndex,
        _maxAnalyzedBarsIndex: _maxAnalyzedBarsIndex,
        _step: greater ? 0 : 1,
        _lowerBound: status._lowerBound + 1,
        currentComplexity: status.currentComplexity + 1,
      },
      _getLockedBarsBellow(newBars, status._lowerBound)
    ];
  };

  /**
   * Compares the previous bars
   */
  const comparePreviousBars = () => {
    if (status._analyzedBarsIndex[0] === 0) {
      return compareNextBars();
    }

    const _analyzedBarsIndex = status._analyzedBarsIndex.map((index) => index - 1);
    const greater = bars[_analyzedBarsIndex[1]].size > bars[_analyzedBarsIndex[0]].size;
    const message = greater ?
      'Because the second bar is greater than the second, they are left unchanged and the algorithm goes back to where it left off' :
      'Because the first bar is greater than the second, they are switched and the algorithm continues to the left';
    const newBars = bars.map((bar, index) => (
      index === _analyzedBarsIndex[0] || index === _analyzedBarsIndex[1] ?
        { ...bar, status: 2 } :
        { ...bar, status: 0 }
    ));

    return [
      {
        ...status,
        message,
        _analyzedBarsIndex,
        _step: greater ? 0 : 1,
        currentComplexity: status.currentComplexity + 1,
      },
      _getLockedBarsAbove(newBars, status._maxAnalyzedBarsIndex[0])
    ];
  };

  /**
   * Changes the two bars and updates the status
   */
  const switchBars = () => [
    {
      ...status,
      message: 'Switched the two bars',
      _step: 2,
    },
    arrayManager.switchBars(bars, status._analyzedBarsIndex[0], status._analyzedBarsIndex[1])
  ];


  switch (status._step) {
    case 0:
      return compareNextBars;

    case 1:
      return switchBars;

    case 2:
      return comparePreviousBars;

    default:
      console.log('Something went wrong :(');
      return defaultState();
  }
};

/**
 * Returns the name of the algorithm
 *
 * @return {String}    : name of the sorting algorithm
 */
const name = () => 'Insertion Sort';

/**
 * Returns the about section of the algorithm
 *
 * @return {String}    : about section of the algorithm
 */
const about = () => (

  <div className="about">

    <h3>
      About Insertion Sort
    </h3>

    <p>
      {`
      Insertion sort is another brute force sorting algorithm. It works similar to what you do when, for example,
      sorting a deck of cards: moving lower valued cards down the deck until the card to its left is as low as it can
      be. Then the algorithm moves on to the next object in the list. This procedure generates a sorted list to the
      left of the last analyzed item.
      `}

      <br /> <br />

      {`
      Similar to Bubble Sort, we can enhance Insertion Sort's performance by not checking all the cards to the left of 
      the one analyzed. Because we know the array to the left of the item is sorted, we can stop after finding the first
      item that has a value greater or equal to the one analyzed and proceed with the algorithm.
      `}
    </p>

    <h3>
      How our Implementation Works
    </h3>

    <ul>
      <li><strong>Blue: </strong>bar is selected by the user</li>
      <li><strong>Orange: </strong>bar is currently analyzed</li>
      <li><strong>Gray: </strong>bar is considered sorted by the algorithm</li>
      <li><strong>Green: </strong>the list is sorted</li>
    </ul>

  </div>
);

/**
 * Returns a python implementation of the algorithm
 *
 * @return {HTML}  : returns an implementation of the algorithm
 */
const implementation = () => (
  <div className="implementation">

    <h3>
      Python Implementation
    </h3>

    <pre>
      <code>
        {`def insertion_sort(array):

for i in range(1, len(array)):
    key = array[i]
    j = i - 1

    while j >= 0 and key < array[j]:
        array[j + 1] = array[j]
        j -= 1

    array[j + 1] = key

return array
                `}
      </code>
    </pre>
  </div>
);

const SortingAlgorithm = {
  sort,
  defaultState,
  name,
  implementation,
  about,
};

export default SortingAlgorithm