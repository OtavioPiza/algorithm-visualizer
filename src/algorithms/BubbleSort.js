import switchBars from '../services/switchBars'

/**
 * Provides a default state for the BubbleSort algorithm
 * 
 * @param {Array of Bars} bars
 */
const defaultState = (bars) => ({
    algorithmStatus: "",
    analyzedBarsIndex: [0, 1],
    range: [0, bars.length],
    sorted: false,
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
     * Compares two bars
     */
    const compareBars = () => {

        // == Properties from status ============================================================ //
        const analyzedBarsIndex = status.analyzedBarsIndex  // Array with the analyzed bars
        const switched = status.switched                    // If any two bars were switched
        const range = status.range

        // == Properties from function ========================================================== //
        
        // If the end of the array was reached
        const eoa = analyzedBarsIndex[1] === range[1] - 1
        console.log('eoa', eoa);
        console.log('switched', switched);

        // If the first bar is greater than the second
        const greater = bars[analyzedBarsIndex[0]].size > bars[analyzedBarsIndex[1]].size  

        // New array of bars that makes the newly analyzed bars orange and the rest gray
        const newBars = bars.map((bar, index) => (
            index === analyzedBarsIndex[0] ? {...bar, analyzed: true} :
            index === analyzedBarsIndex[1] ? {...bar, analyzed: true} :
            {...bar, analyzed: false}
        ))

        return [{
            ...status,
            algorithmStatus: greater ? "Greater" : "Not greater",
            analyzedBarsIndex: 
                greater ? analyzedBarsIndex :
                eoa ? [0, 1] : 
                analyzedBarsIndex.map(index => index + 1),
            range: eoa ? [0, range[1] - 1] : range,
            step: greater ? 1 : 0,
            sorted: (eoa && !status.switched) || (eoa && !switched),
            switched: analyzedBarsIndex[0] === 0 ? false : switched
            },
            newBars
        ]
    }

    const changeBars = () => {

        if (status.analyzedBarsIndex[1] === bars.length) {

        }

        return [
        {
            ...status,
            algorithmStatus: 'Switch',
            analyzedBarsIndex: status.analyzedBarsIndex.map(index => index + 1),
            step: 0,
            switched: true
        },
        switchBars(bars, status.analyzedBarsIndex[0], status.analyzedBarsIndex[1])
    ]
}

    return status.step === 0 ? compareBars() : changeBars()
}

export default {sort, defaultState}

