import React from 'react';
import arrayManager from '../../util/arrayManager';

/**
 * Locks bars in the list that are already outside of the algorihtm's scope
 * 
 * @param {[{size, index, status }]} bars list of bars
 * @param {Number} _upperBound maximum index allowed 
 * 
 * @returns {[{size, index, status }]} list of bars with bars outside of the algorithm's scope locked
 */
const _getLockedBars = (bars, upperBound) => (
    bars.map((bar, index) => index > upperBound ? { ...bar, status: 4 } : bar)
)

/**
 * Uses the state provided to take one _step in the execution of the sorting algorithm returning
 * a new state after that
 *
 * @param {Bar[]} bars           : an array filled with Bar objects ({ size: int })
 * @param {Boolean} sorted       : if the array is sorted or not
 * @param {Number} complexity    : current complexity of the algorithm
 */
const defaultState = (bars, sorted = false, currentComplexity = 0) => {
    const message = sorted ? 'Finished sorting!' : 'Ready to start sorting!';
    const _analyzedBarsIndex = [-1, 0];
    const _upperBound = bars.length - 1;
    const _switched = false;
    const _step = 0;
    const worstComplexity = (bars.length * (bars.length - 1)) / 2 + 1;
    const bestComplexity = bars.length - 1;

    return [
        {
            // public use
            
            message,                // message displayed to the user
            worstComplexity,        // worse case complexity
            bestComplexity,         // best case complexity
            currentComplexity,      // current complexity
            sorted,                 // wheter the list it sorted

            // internal use

            _analyzedBarsIndex,      // list of bars that are analysed
            _upperBound,             // _upperBound of the algorithm's scope
            _switched,               // wheter a switch was made
            _step,                   // step of the algorithms
        },
        bars.map((bar) => ({ ...bar, status: sorted ? 3 : 0 })),
    ];
};

/**
 * Takes one step in the sorting algorithm
 *
 * @param {oldState} state : state of the algorithm
 * @return {newState}     : new state of the algorithm
 */
const sort = (state) => {
    const algorithmState = state[0];
    const bars = state[1];

    /**
     * Returns the next two bars that will be analyzed by te algorithm
     */
    const getNextBars = () => (
        algorithmState._analyzedBarsIndex[1] > algorithmState._upperBound ?
            [0, 1] :
            algorithmState._analyzedBarsIndex.map((bar) => bar + 1)
    );

    /**
     * Determines if the array is sorted
     */
    const getIsSorted = (greater) => (
        (algorithmState._upperBound === 0) ||
        (algorithmState._analyzedBarsIndex[1] === algorithmState._upperBound - 1 && !algorithmState._switched && !greater)
    );

    /**
     * Compares two bars
     */
    const compareBars = () => {
        const _analyzedBarsIndex = getNextBars();
        const greater = bars[_analyzedBarsIndex[0]].size > bars[_analyzedBarsIndex[1]].size;
        const newBars = bars.map((bar, index) => (
            { ...bar, status: _analyzedBarsIndex.includes(index) ? 2 : 0 }
        ));

        return getIsSorted(greater) ?
            defaultState(newBars, true, algorithmState.currentComplexity + 1) :
            [
                {
                    ...algorithmState,
                    message:
                        greater ?
                            'Because the first bar is greater than the second they are _switched' :
                            'Because the first bar is not greater than the second they are left unchanged',
                    _analyzedBarsIndex: _analyzedBarsIndex,
                    greater: greater,
                    _step: greater ? 1 : 0,
                    _switched: _analyzedBarsIndex[0] === 0 ?
                        false :
                        algorithmState._switched,
                    _upperBound: _analyzedBarsIndex[1] === algorithmState._upperBound ?
                        algorithmState._upperBound - 1 :
                        algorithmState._upperBound,
                    currentComplexity: algorithmState.currentComplexity + 1,
                },
                _getLockedBars(newBars, algorithmState._upperBound),
            ];
    };

    /**
     * Changes the two bars and updates the algorithmState
     */
    const changeBars = () => [
        {
            ...algorithmState,
            message: '_switched the two bars',
            _step: 0,
            _switched: true,
        },
        _getLockedBars(arrayManager.switchBars(bars, algorithmState._analyzedBarsIndex[0], algorithmState._analyzedBarsIndex[1]), algorithmState._upperBound),
    ];

    /**
     * Returns the next _step of the sorting algorithm based on the state provided in the parameters
     */
    return algorithmState._step === 0 ?
        compareBars() :
        changeBars();
};

/**
 * Returns the name of the algorithm
 *
 * @return {String}    : name of the sorting algorithm
 */
const name = () => 'Bubble Sort';

/**
 * Returns the about section of the algorithm
 *
 * @return {JSX.Element}
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
      _switched while iterating through the list, the algorithm knows that all the list's items are 
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
);

/**
 * Returns a python implementation of the algorithm
 *
 * @return {JSX.Element}  : returns an implementation of the algorithm
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
    _upperBound = len(array)
    _switched = True

    while _switched and _upperBound > 1:
        _switched = False

        for i in range(1, _upperBound):

            if array[i - 1] > array[i]:
                _switched = True
                array[i - 1], array[i] = array[i], array[i - 1]

    _upperBound -= 1

return array
      `}
            </code>
        </pre>
    </div>
);

const SortingAlgorithm = { sort, defaultState, name, implementation, about };

export default SortingAlgorithm;
