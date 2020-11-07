import React, { useState } from 'react'
import isSorted from '../services/isSorted'
import Bar from './Bar'
import '../styles/components/Array.css'

// A default list that is automatically used if one is not provided
let defaultList = [
    {
        size: 390,
        selected: false,
        analyzed: false
    },
    {
        size: 350,
        selected: false,
        analyzed: false
    },
    {
        size: 200,
        selected: false,
        analyzed: false
    },
    {
        size: 280,
        selected: false,
        analyzed: false
    },
    {
        size: 170,
        selected: false,
        analyzed: false
    },
    {
        size: 410,
        selected: false,
        analyzed: false
    }
]


/**
 * React component representing an array of Bar components
 * - responsible for the interaction between the user and the bars
 * - does NOT support algorithms integration: @reference ArraysSorter.js
 * 
 * @param {
 *  bars: array of bars objects
 * } param0
 * @returns an array containing a Bar component for each bar on the provided list
 */
const Array = ({ barList, simplified, analyzed }) => {
    const [bars, setBars] = useState(barList === undefined ? defaultList : barList)
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
                <Bar key={ index } id={ index } size={ bar.size } analyzed={ bar.analyzed }
                selected={ bar.selected } eventHandler={ selectBar } sorted={ sorted } 
                simplified={ simplified }/>
            ))}
       </div>
    )
}

export default Array