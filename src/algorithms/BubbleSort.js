import switchBars from '../services/switchBars'

/**
 * Provides a default state for the BubbleSort algorithm
 * 
 * @param {List of Bars} barList
 */
const defaultState = (barList) => ({
    algorithmStatus: "",
    analyzedBarsIndex: [-1, 0],
    range: [0, barList.length],
    sorted: false,
    switched: false,
    step: 0,
})

/**
 * Provides a sorted state for the BubbleSort algorithm
 * 
 * @param {List of Bars} bars
 */
const sortedState = (barList) => ({
    algorithmStatus: [-1, 0],
    range: [0, barList.length],
    sorted: true,
    switched: false,
    step: 0,
})

/**
 * Responsible for the sorting process which is split between two functions:
 *  >> compareBars
 *  >> switchBars
 * 
 * @param {Status of the algorithm} status 
 * @param {Array of Bars} bars 
 */
const sort = (status, bars) => {

    /**
     * Returns the next two bars that will be analyzed by te algorithm
     */
    const getNextBars = () => (
        status.analyzedBarsIndex[1] === status.range[1] ? [0, 1] :
            status.analyzedBarsIndex.map(bar => bar + 1)
    )

    /**
     * Compares two bars
     */
    const compareBars = () => {

        // == Properties from status ============================================================ //
        const analyzedBarsIndex = getNextBars()             // Array with the analyzed bars
        const switched = status.switched                    // If any two bars were switched
        const range = status.range                          // Range of the bars

        // == Properties from function ========================================================== //

        // If the end of the array was reached
        const eoa = analyzedBarsIndex[1] === range[1] - 1

        // If the first bar is greater than the second
        const greater = bars[analyzedBarsIndex[0]].size > bars[analyzedBarsIndex[1]].size

        // New array of bars that makes the newly analyzed bars orange and the rest gray
        const newBars = bars.map((bar, index) => (
            index === analyzedBarsIndex[0] ? { ...bar, analyzed: true } :
                index === analyzedBarsIndex[1] ? { ...bar, analyzed: true } :
                    { ...bar, analyzed: false }
        ))

        const sorted = eoa && range[1] === 1


        console.log(eoa);
        console.log(switched);

        return [sorted ? sortedState :

            {
                ...status,
                algorithmStatus:
                    greater ? "Because the first bar is greater than the second they are switched" :
                        "Because the first bar is not greater than the second the first bar is left unchanged",
                analyzedBarsIndex: analyzedBarsIndex,
                range: eoa ? [0, range[1] - 1] : range,
                step: greater ? 1 : 0,
                sorted: sorted,
                switched: analyzedBarsIndex[0] === 0 ? false : switched
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
        switchBars(bars, status.analyzedBarsIndex[0], status.analyzedBarsIndex[1])
    ]


    return status.step === 0 ? compareBars() : changeBars()
}

export default { sort, defaultState, sortedState }

