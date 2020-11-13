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
    const [defaultBars, setDefaultBars] = useState(barList)
    const [bars, setBars] = useState(defaultBars)
    const [barsSelected, setBarsSelected] = useState([])
    const [status, setStatus] = useState(sortingAlgorithm.defaultState(defaultBars))

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

        setStatus(sortingAlgorithm.defaultState(bars))
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

    /**
     * Selects a bar from the array
     * 
     * @param {
     * id : id of the bar to be selected
     * } id 
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
    }

    // == Sorting algorithm control panel ======================================================= //

    /**
     * 
     */
    const handleNewBar = (newBarArray) => {
        setDefaultBars(newBarArray)
        setStatus(sortingAlgorithm.defaultState(newBarArray))
        setBars(newBarArray)
        setBarsSelected([])
    }

    /**
     * Resets the array to its initial state
     */
    const handleReset = () => {
        setStatus(sortingAlgorithm.defaultState(defaultBars))
        setBars(defaultBars)
        setBarsSelected([])
    }

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

    return (
        <div className='ArraySorter'>
            <div className='Array'>
                {bars.map((bar, index) => (
                    <Bar key={index} id={index} size={bar.size} analyzed={bar.analyzed}
                        selected={bar.selected} eventHandler={selectBar} sorted={status.sorted ? 1 : 0}
                        simplified={true} />
                ))}
            </div>
            <BottomBar />
            <Button text='Step' eventHandler={() => handleStep()} />
            <Button text='Reset' eventHandler={() => handleReset()} />
            <BottomBar />
            <Button text="Get Random List" eventHandler={() =>
                handleNewBar(arrayManager.getRandomList(10))
            } />
            <h1>{status.algorithmStatus}</h1>
        </div>
    )
}

export default ArraySorter