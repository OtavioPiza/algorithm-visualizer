import React, { useState } from 'react'
import Bar from './Bar'
import isSorted from '../services/isSorted'
import '../styles/components/Array.css'

/**
 * React component representing an array of Bar components
 * - responsible for the interaction between the user and the bars
 * - does NOT support integration with algorithms
 * 
 * @param {Bar[], Boolean} param    : array of bars and if they should be simplified or not
 * 
 * @returns {Array} : an array containing a Bar component for each bar on the provided list
 */
const Array = ({ barList, simplified }) => {

    /* Holds an array of bars */
    const [bars, setBars] = useState(barList)

    /* Holds the index of the selected bars */
    const [barsSelected, setBarsSelected] = useState([])

    /* Holds whether the array is sorted */
    const sorted = isSorted(bars)

    // == User Interactivity ======================================================================================== //

    /**
     * Selects a Bar in the provided index
     * 
     * @param {Number} id index of the bar
     */
    const selectBar = (id) => {
        const bar = bars[id]
        const changedBar = { ...bar, selected: !bar.selected }

        setBars(bars.map((bar, index) => index === id ? changedBar : bar))

        if (!bar.selected) {
            setBarsSelected(barsSelected.concat(id))

        } else {
            setBarsSelected(barsSelected.filter(selected => selected !== id))
        }

        /**
         * Switches two selected bars
         */
        if (barsSelected.length === 2) {
            const firstBar = bars[barsSelected[0]]
            const secondBar = bars[barsSelected[1]]

            const newFirstBar = { ...firstBar, size: secondBar.size, selected: false }
            const newSecondBar = { ...secondBar, size: firstBar.size, selected: false }

            setBars(bars.map((bar, index) => {
                switch (index) {
                    case barsSelected[0]:
                        return newFirstBar

                    case barsSelected[1]:
                        return newSecondBar

                    default:
                        return bar
                }
            }))
            setBarsSelected([])
        }
    }

    // == HTML ====================================================================================================== //

    return (
        <div className='Array'>
            {bars.map((bar, index) => (
                <Bar key={index} id={index} size={bar.size} analyzed={bar.analyzed}
                    selected={bar.selected} eventHandler={selectBar} sorted={sorted}
                    simplified={simplified} />
            ))}
        </div>
    )
}

export default Array