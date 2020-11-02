import React, { useState } from 'react'
import Bar from './Bar'
import BubbleSort from '../algorithms/BubbleSort'
import Button from './Button'
import isSorted from '../services/isSorted'

const ArraySorter = ({ barList }) => {
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

    console.log(bars);

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

    return(
        <div className='ArraySorter'>
            <div className='Array'>
            {bars.map((bar, index) => (
                <Bar key={ index } id={ index } size={ bar.size } analyzed={ bar.analyzed }
                selected={ bar.selected } eventHandler={ selectBar } sorted={ sorted } 
                simplified={ false }/>
            ))}
            </div>
            <Button text='click' eventHandler={() => setBars(BubbleSort({
                analyzedBarsIndex: [0, 1],
                greater: false,
                step: 0,
                switched: false,
            }, bars)[1])}/>
        </div>
    )
}

export default ArraySorter