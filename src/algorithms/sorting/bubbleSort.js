import React from 'react'
import arrayManager from '../../services/arrayManager'

/**
 * Default status for the array
 * 
 * @param {size: {}, analyzed: {}, sorted: {}} barArray
 * @param {boolean} isSorted true if the list is sorted
 * 
 * @returns {status }
 */
const defaultState = (barArray, isSorted = false, currentComplexity) => [
    {
        algorithmStatus: isSorted ? "Finished sorting!" : "Ready to start sorting!",
        analyzedBarsIndex: [-1, 0],
        upperbound: barArray.length - 1,
        lowerbound: 0,
        sorted: isSorted,
        switched: false,
        step: 0,
        worseComplexity: (barArray.length * (barArray.length - 1)) / 2,
        bestComplexity: barArray.length - 1,
        currentComplexity: currentComplexity === undefined ? 0 : currentComplexity,
    },
    barArray.map(bar => ({ ...bar, analyzed: false, sorted: isSorted })),
]

/**
 * Returns the name of the algorithm
 */
const name = () => 'Bubble Sort'

/**
 * Returns a python implementation of the algorithm
 */
const implementation = () => (
    <div className="Implementation">

        <h3>
            Python Implementation
        </h3>

        <pre>
            <code>
                {
`def bubble_sort(array):
    upperbound = len(array)
    switched = True

    while switched and upperbound > 1:
        switched = False

        for i in range(1, upperbound):

            if array[i - 1] > array[i]:
                switched = True
                array[i - 1], array[i] = array[i], array[i - 1]

    upperbound -= 1

return array`}
            </code>
        </pre>
    </div>
)

const about = () => (

    <div className="About">

        <h3>
            About Bubble Sort
        </h3>

        <p>
            Bubble Sort is a sorting algorithm that repeatedly steps through the list, compares adjacent elements, and
            swaps them if they are in the wrong order. After each pass through the list, the algorithm is sure that the
            largest element is placed at the last index, which from that point on is no longer analyzed.
            <br />
            <br />
            One of Bubble Sort's key strengths is its ability to detect that the list is sorted efficiently without
            external help by recording if it had to switch any elements. If none were switched while iterating through the
            list, the algorithm knows that all the list's items are in the correct location.
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
 * Responsible for the sorting process which is split between two functions:
 *  >> compareBars
 *  >> switchBars
 *
 * @param {Status of the algorithm} status
 * @param {Array of Bars} bars
 */
const sort = (state) => {
    const status = state[0]
    const bars = state[1]

    /**
     * Returns the next two bars that will be analyzed by te algorithm
     */
    const getNextBars = () => (
        status.analyzedBarsIndex[0] >= status.upperbound ? [0, 1] :
            status.analyzedBarsIndex.map(bar => bar + 1)
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
        // Holds the indexes of the bars being currently analyzed
        const analyzedBarsIndex = getNextBars()

        // Holds wheater the first bar is greater than the second
        const greater = bars[analyzedBarsIndex[0]].size > bars[analyzedBarsIndex[1]].size

        // Holds a new list of bars where only the analzed bars are orange
        const newBars = bars.map((bar, index) => (
            index === analyzedBarsIndex[0] ? { ...bar, sorted: false, analyzed: true } :
                index === analyzedBarsIndex[1] ? { ...bar, sorted: false, analyzed: true } :
                    { ...bar, sorted: false, analyzed: false }
        ))


        return getIsSorted(greater) ? defaultState(newBars, true, status.currentComplexity) : [
            {
                ...status,
                algorithmStatus:
                    greater ? "Because the first bar is greater than the second they are switched" :
                        "Because the first bar is not greater than the second they are left unchanged",
                analyzedBarsIndex: analyzedBarsIndex,
                greater: greater,
                step: greater ? 1 : 0,
                switched: analyzedBarsIndex[0] === 0 ? false : status.switched,
                upperbound: analyzedBarsIndex[1] === status.upperbound ? status.upperbound - 1 : status.upperbound,
                currentComplexity: status.currentComplexity + 1,
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
            algorithmStatus: "Switched the two bars",
            step: 0,
            switched: true,
        },
        arrayManager.switchBars(bars, status.analyzedBarsIndex[0], status.analyzedBarsIndex[1])
    ]


    return status.step === 0 ? compareBars() : changeBars()
}

export default { sort, defaultState, name, implementation, about }

