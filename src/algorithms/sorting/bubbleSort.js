import React from 'react'
import arrayManager from '../../services/arrayManager'

/**
 * Uses the state provided to take one step in the execution of the sorting algorithm returning
 * a new state after that
 *
 * @param {Bar[]} bars           : an array filled with Bar objects ({ size: int })
 * @param {Boolean} sorted       : if the array is sorted or not
 * @param {Number} complexity    : current complexity of the algorithm
 */
const defaultState = (bars, sorted = false, complexity  = 0) => {
  const algorithmStatus = sorted ? 'Finished sorting!' : 'Ready to start sorting!'
  const analyzedBarsIndex = [-1, 0]
  const upperbound = bars.length - 1
  const lowerbound = 0
  const switched = false
  const step = 0
  const worseComplexity = (bars.length * (bars.length - 1)) / 2 + 1
  const bestComplexity = bars.length - 1

  return [
    {
      algorithmStatus,
      analyzedBarsIndex,
      upperbound,
      lowerbound,
      sorted,
      switched,
      step,
      worseComplexity,
      bestComplexity,
      complexity,
    },
    bars.map(bar => ({ ...bar, analyzed: false, sorted: sorted })),
  ]
}

/**
 * Takes one step in the sorting algorithm
 *
 * @param {oldState} state : state of the algorithm
 * @returns {newState}     : new state of the algorithm
 */
const sort = (state) => {
  const status = state[0]
  const bars = state[1]

  /**
   * Returns the next two bars that will be analyzed by te algorithm
   */
  const getNextBars = () => (
    status.analyzedBarsIndex[1] > status.upperbound
      ? [0, 1]
      : status.analyzedBarsIndex.map(bar => bar + 1)
  )

  /**
   * Determines if the array is sorted
   */
  const getIsSorted = (greater) => (
    (status.upperbound === 0) ||
      (status.analyzedBarsIndex[1] === status.upperbound - 1 && !status.switched && !greater)
  )

  /**
   * Compares two bars
   */
  const compareBars = () => {
    const analyzedBarsIndex = getNextBars()
    const greater = bars[analyzedBarsIndex[0]].size > bars[analyzedBarsIndex[1]].size
    const newBars = bars.map((bar, index) => (
      { ...bar, sorted: false, analyzed: analyzedBarsIndex.includes(index) }
    ))

    return getIsSorted(greater)
      ? defaultState(newBars, true, status.complexity + 1)
      : [
        {
          ...status,
          algorithmStatus:
            greater
              ? 'Because the first bar is greater than the second they are switched'
              : 'Because the first bar is not greater than the second they are left unchanged',
          analyzedBarsIndex: analyzedBarsIndex,
          greater: greater,
          step: greater ? 1 : 0,
          switched: analyzedBarsIndex[0] === 0
            ? false
            : status.switched,
          upperbound: analyzedBarsIndex[1] === status.upperbound
            ? status.upperbound - 1
            : status.upperbound,
          complexity: status.complexity + 1,
        },
        newBars
      ]
  }

  /**
   * Changes the two bars and updates the status
   */
  const changeBars = () => [
    {
      ...status,
      algorithmStatus: 'Switched the two bars',
      step: 0,
      switched: true,
    },
    arrayManager.switchBars(bars, status.analyzedBarsIndex[0], status.analyzedBarsIndex[1])
  ]

  /**
   * Returns the next step of the sorting algorithm based on the state provided in the parameters
   */
  return status.step === 0
    ? compareBars()
    : changeBars()
}

/**
 * Returns the name of the algorithm
 *
 * @returns {String}    : name of the sorting algorithm
 */
const name = () => 'Bubble Sort'

/**
 * Returns the about section of the algorithm
 *
 * @returns {JSX.Element}
 */
const about = () => (

  <div className="BubbleSortAbout">

    <h3>
      About Bubble Sort
    </h3>

    <p>
      {`
      Bubble Sort is a sorting algorithm that repeatedly steps through the list, compares adjacent 
      elements, and swaps them if they are in the wrong order. After each pass through the list, the
      algorithm is sure that the largest element is placed at the last index, which from that point 
      on is no longer analyzed.
      `}
      <br />
      <br />
      {`
      One of Bubble Sort's key strengths is its ability to detect that the list is sorted 
      efficiently without external help by recording if it had to switch any elements. If none were
      switched while iterating through the list, the algorithm knows that all the list's items are 
      in the correct location.
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
)

/**
 * Returns a python implementation of the algorithm
 *
 * @returns {JSX.Element}  : returns an implementation of the algorithm
 */
const implementation = () => (
  <div className="BubbleSortImplementation">

    <h3>
            Python Implementation
    </h3>

    <pre>
      <code>
        {`
def bubble_sort(array):
    upperbound = len(array)
    switched = True

    while switched and upperbound > 1:
        switched = False

        for i in range(1, upperbound):

            if array[i - 1] > array[i]:
                switched = True
                array[i - 1], array[i] = array[i], array[i - 1]

    upperbound -= 1

return array
      `}
      </code>
    </pre>
  </div>
)

const SortingAlgorithm = { sort, defaultState, name, implementation, about }

export default SortingAlgorithm