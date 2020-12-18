import React from 'react'
import arrayManager from '../../services/arrayManager'

/**
 * Returns the state of the algorithm
 * 
 * @param {Bar[]} barArray              : an array with the bars to be sorted
 * @param {Boolean} isSorted            : if the array is sorted or not   
 * @param {Number} currentComplexity    : current complexity of the algorithm
 */
const defaultState = (barArray, isSorted = false, currentComplexity) => [
    {
        algorithmStatus: isSorted ? "Finished sorting!" : "Ready to start sorting!",
        analyzedBarsIndex: [-1, 0],
        maxAnalyzedBarsIndex: [-1, 0],
        upperbound: barArray.length - 1,
        lowerbound: 0,
        sorted: isSorted,
        step: 0,
        worseComplexity: 0,
        bestComplexity: 0,
        currentComplexity: currentComplexity === undefined ? 0 : currentComplexity,
    },
    barArray.map(bar => ({ ...bar, analyzed: false, sorted: isSorted })),
]

/**
 * Takes one step in the sorting algorithm
 * 
 * @param {State} state : state of the algorithm
 * 
 * @returns {State}     : new state of the algorithm
 */
const sort = (state) => {
    const status = state[0]
    const bars = state[1]

    /**
     * Returns the next two bars that will be analyzed by te algorithm
     */
    const compareNextBars = () => {
        const maxAnalyzedBarsIndex = status.maxAnalyzedBarsIndex.map(index => index + 1)

        if (!bars[maxAnalyzedBarsIndex[1]]) {
            return defaultState(bars, true)
        }

        const greater = bars[maxAnalyzedBarsIndex[1]].size > bars[maxAnalyzedBarsIndex[0]].size
        const algorithmStatus = greater
        const newBars = bars.map((bar, index) => (
            index === maxAnalyzedBarsIndex[0] || index === maxAnalyzedBarsIndex[1]
                ? { ...bar, sorted: false, analyzed: true }
                : { ...bar, sorted: false, analyzed: false }
        ))

        return [
            {
                ...status,
                algorithmStatus: algorithmStatus,
                analyzedBarsIndex: maxAnalyzedBarsIndex,
                maxAnalyzedBarsIndex: maxAnalyzedBarsIndex,
                greater: greater,
                step: greater ? 0 : 1,
                lowerbound: status.lowerbound + 1
            },
            newBars
        ]
    }

    const comparePreviousBars = () => {

        if (status.analyzedBarsIndex[0] === 0) {
            return compareNextBars()
        }
        const analyzedBarsIndex = status.analyzedBarsIndex.map(index => index - 1)
        const greater = bars[analyzedBarsIndex[0]].size < bars[analyzedBarsIndex[1]].size
        const algorithmStatus = greater
        const newBars = bars.map((bar, index) => (
            index === analyzedBarsIndex[0] || index === analyzedBarsIndex[1]
                ? { ...bar, sorted: false, analyzed: true }
                : { ...bar, sorted: false, analyzed: false }
        ))

        return [
            {
                ...status,
                algorithmStatus: algorithmStatus,
                analyzedBarsIndex: analyzedBarsIndex,
                greater: greater,
                step: greater ? 0 : 1
            },
            newBars
        ]
    }

    /**
     * Changes the two bars and updates the status
     */
    const switchBars = () => [
        {
            ...status,
            algorithmStatus: "Switched the two bars",
            step: 2,
        },
        arrayManager.switchBars(bars, status.analyzedBarsIndex[0], status.analyzedBarsIndex[1])
    ]


    switch (status.step) {
        case 0:
            return compareNextBars

        case 1:
            return switchBars

        case 2:
            return comparePreviousBars

        default:
            console.log('Something went wrong')
            return defaultState()
    }
}

/**
 * Returns the name of the algorithm
 * 
 * @returns {String}    : name of the sorting algorithm
 */
const name = () => 'Insertion Sort'

/**
 * Returns the about section of the algorithm
 * 
 * @returns {String}    : about section of the algorithm
 */
const about = () => (

    <div className="InsertionSortAbout">

        <h3>
            About Insertion Sort
        </h3>

        <p>
            TODO
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
 * @returns {HTML}  : returns an implementation of the algorithm
 */
const implementation = () => (
    <div className="BubbleSortImplementation">

        <h3>
            Python Implementation
        </h3>

        <pre>
            <code>
                {`TODO`}
            </code>
        </pre>
    </div>
)

export default { sort, defaultState, name, implementation, about }