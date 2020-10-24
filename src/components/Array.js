import React, { useState } from 'react'
import Bar from './Bar'

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

    let sorted = 1;
    
    for (let i = 1; i < bars.length; i++) {

        if (bars[i].size < bars[i - 1].size) {
            sorted = 0
            break
        }
    }
    if (sorted !== 1) {
        sorted = -1

        for (let i = 1; i < bars.length; i++) {

            if (bars[i].size > bars[i - 1].size) {
                sorted = 0
                break
            }
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
       <div>
            {bars.map((bar, index) => (
                <Bar key={ index } id={ index } size={ bar.size } selected={ bar.selected }
                eventHandler={ selectBar } sorted={ sorted }/>
            ))}
       </div>
    )
}

export default Array