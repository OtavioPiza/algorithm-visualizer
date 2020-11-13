import React, { useState } from 'react'
import Bar from './Bar'
import Button from './Button'
import BottomBar from './BottomBar'
import arrayManager from '../services/arrayManager'

/**
 * 
 * @param {
 * barList: list of bar objects
 * sortingAlgorithm: sortingAlgorithm
 * } param0 
 */
const ArraySorter = ({ barList, sortingAlgorithm }) => {
    const [bars, setBars] = useState(barList)
    const [barsSelected, setBarsSelected] = useState([])
    const [status, setStatus] = useState(sortingAlgorithm.defaultState(barList))

    const selectBar = (id) => {
        const bar = bars[id]
        const changedBar = { ...bar, selected: !bar.selected }

        setBars(bars.map((bar, index) => index === id ? changedBar : bar))

        if (!bar.selected) {
            setBarsSelected(barsSelected.concat(id))

        } else {
            setBarsSelected(barsSelected.filter(selected => selected !== id))
        }
    }

    // == User Interactivity ==================================================================== //

    /**
     * Enables one to interact with the array by switching the position of two bars, and ensures,
     * by returing the sorting algorithm to its default state, its functionality
     */
    if (barsSelected.length === 2) {
        const firstBar = bars[barsSelected[0]]
        const secondBar = bars[barsSelected[1]]

        const newFirstBar = { ...firstBar, size: secondBar.size, selected: false, analyzed: false }
        const newSecondBar = { ...secondBar, size: firstBar.size, selected: false, analyzed: false }

        setStatus(sortingAlgorithm.defaultState(barList))
        setBars(bars.map((bar, index) => {
            switch (index) {
                case barsSelected[0]:
                    return newFirstBar

                case barsSelected[1]:
                    return newSecondBar

                default:
                    return { ...bar, analyzed: false }
            }
        }))
        setBarsSelected([])
    }


    // == Sorting algorithm control panel ======================================================= //
    // to be transformed into its own component in a later version

    /**
     * Handles one step of the sorting algorithm
     * - sets bars to those returned by the sortingAlgorithm
     * - sets the status to that returned by the sortingAlgorithm
     */
    const handleStep = () => {
        const result = sortingAlgorithm.sort(status, bars)
        setStatus(result[0])
        setBars(result[1])
    }

    /**
     * Resets the array to its initial state
     */
    const handleReset = () => {
        setStatus(sortingAlgorithm.defaultState(barList))
        setBars(barList)
        setBarsSelected([])
    }

    return (
        <div className='ArraySorter'>
            <div className='Array'>
                {bars.map((bar, index) => (
                    <Bar key={index} id={index} size={bar.size} analyzed={bar.analyzed}
                        selected={bar.selected} eventHandler={selectBar} sorted={status.sorted ? 1 : 0}
                        simplified={false} />
                ))}
            </div>
            <BottomBar />
            <Button text='Step' eventHandler={() => handleStep()} />
            <Button text='Reset' eventHandler={() => handleReset()} />
            <Button text="Get Random List" eventHandler={() => {setBars(arrayManager.getRandomList(10))}}/>
            <h1>{status.algorithmStatus}</h1>
        </div>
    )
}

export default ArraySorter