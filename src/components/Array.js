import React, { useState } from 'react'
import isSorted from '../services/isSorted'
import Bar from './Bar'
import '../styles/components/Array.css'

/**
 * React component representing an array of Bar components
 * 
 * @param {
 *  bars: array of bars objects
 *  eventHandler: hadler for the onClick event
 *  sorted: identifies if the list sorted (1) unsorted (0) or reversed (-1)
 * } param0
 * @returns an array containing a Bar component for each bar on the provided list
 */
const Array = ({ barList }) => {
    const [bars, setBars] = useState(barList)
    const [barsSelected, setBarsSelected] = useState([])
    const sorted = isSorted(bars)

    const selectBar = (id) => {
        const bar = bars[id]
        const changedBar = {...bar, selected: !bar.selected}

        setBars(bars.map((bar, index) => index === id ? changedBar : bar))

        if (!bar.selected) {
            setBarsSelected(barsSelected.concat(id))

        } else {
            setBarsSelected(barsSelected.filter(selected => selected !== id))
        }
    }
    
    if (barsSelected.length === 2) {
        const firstBar = bars[barsSelected[0]]
        const secondBar = bars[barsSelected[1]]

        const newFirstBar = {...firstBar, size: secondBar.size, selected: false}
        const newSecondBar = {...secondBar, size: firstBar.size, selected: false}

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

    return (
       <div className='Array'>
            {bars.map((bar, index) => (
                <Bar key={ index } id={ index } size={ bar.size } selected={ bar.selected }
                eventHandler={ selectBar } sorted={ sorted }/>
            ))}
       </div>
    )
}

export default Array