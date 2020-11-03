import React, { useState } from 'react'
import Bar from './Bar'
import Button from './Button'
import isSorted from '../services/isSorted'
import BottomBar from './BottomBar'

const ArraySorter = ({ barList, sortingAlgorithm }) => {
    const [bars, setBars] = useState(barList)
    const [barsSelected, setBarsSelected] = useState([])
    const [status, setStatus] = useState({
        algorithmStatus: "",
        analyzedBarsIndex: [0, 1],
        step: 0,
    })
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

    const handleStep = () => {
        const result = sortingAlgorithm(status, bars)
        setStatus(result[0])
        setBars(result[1])
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

    return(
        <div className='ArraySorter'>
            <div className='Array'>
            {bars.map((bar, index) => (
                <Bar key={ index } id={ index } size={ bar.size } analyzed={ bar.analyzed }
                selected={ bar.selected } eventHandler={ selectBar } sorted={ sorted } 
                simplified={ true }/>
            ))}
            </div>
            <BottomBar/>
            <Button text='Step' eventHandler={() => handleStep()}/>
        </div>
    )
}

export default ArraySorter