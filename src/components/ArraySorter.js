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
const ArraySorter = (props) => {
    const [defaultBarList, setDefaultBarList] = useState(props.barList)
    const [barList, setBarList] = useState(defaultBarList)
    const [barListSize, setBarListSize] = useState(10)
    const [selectedBarList, setSelectedBarList] = useState([])
    const [status, setStatus] = useState(props.sortingAlgorithm.defaultState(defaultBarList)[0])
    const [simplified, setSimplified] = useState(false)

    // == User Interactivity ==================================================================== //

    /**
     * Enables one to interact with the array by switching the position of two barList, and ensures,
     * by returing the sorting algorithm to its default state, its functionality
     */
    if (selectedBarList.length === 2) {
        const firstBar = barList[selectedBarList[0]]
        const secondBar = barList[selectedBarList[1]]

        const newFirstBar = {
            ...firstBar,
            size: secondBar.size,
            selected: false,
            analyzed: false,
            sorted: false,
        }
        const newSecondBar = {
            ...secondBar,
            size: firstBar.size,
            selected: false,
            analyzed: false,
            sorted: false,
        }

        setStatus(props.sortingAlgorithm.defaultState(barList))
        setBarList(barList.map((bar, index) => {
            switch (index) {
                case selectedBarList[0]:
                    return newFirstBar

                case selectedBarList[1]:
                    return newSecondBar

                default:
                    return { ...bar, analyzed: false, sorted: false }
            }
        }))
        setSelectedBarList([])
    }

    /**
     * Selects a bar from the array
     * 
     * @param {
     * id : id of the bar to be selected
     * } id 
     */
    const handleSelectBar = (id) => {
        const bar = barList[id]
        const changedBar = { ...bar, selected: !bar.selected }

        setBarList(barList.map((bar, index) => index === id ? changedBar : bar))

        if (!bar.selected) {
            setSelectedBarList(selectedBarList.concat(id))

        } else {
            setSelectedBarList(selectedBarList.filter(selected => selected !== id))
        }
    }

    // == Sorting algorithm control panel ======================================================= //

    /**
     * 
     */
    const handleNewBarArray = (newBarArray) => {
        setDefaultBarList(newBarArray)
        setStatus(props.sortingAlgorithm.defaultState(newBarArray))
        setBarList(newBarArray)
        setSelectedBarList([])
    }

    /**
     * Resets the array to its initial state
     */
    const handleReset = () => {
        setStatus(props.sortingAlgorithm.defaultState(defaultBarList)[1])
        setBarList(defaultBarList.map(bar => ({
            ...bar,
            sorted: false,
        })))
        setSelectedBarList([])
        console.log();
    }

    /**
     * Handles one step of the sorting algorithm
     * - sets barList to those returned by the sortingAlgorithm
     * - sets the status to that returned by the sortingAlgorithm
     */
    const handleStep = () => {
        const result = props.sortingAlgorithm.sort(status, barList)
        setStatus(result[0])
        setBarList(result[1])
    }

    const handleRun = () => {
        do {
            setTimeout(handleStep(), 10000)
        } while (!status.sorted)
    }

    /**
     * 
     */
    const handleSimplified = () => {
        setSimplified(!simplified)
    }

    return (
        <div className='ArraySorter'>
            <div className='Array'>
                {barList.map((bar, index) => (
                    <Bar key={index} id={index} size={bar.size} analyzed={bar.analyzed}
                        selected={bar.selected} eventHandler={handleSelectBar} sorted={bar.sorted}
                        simplified={simplified} />
                ))}
            </div>
            <div>
                <BottomBar />
                <Button text='Step' eventHandler={() => handleStep()} />
                <Button text='Run' eventHandler={() => handleRun()} />
                <Button text='Reset' eventHandler={() => handleReset()} />
                <Button text={simplified ? "Normal" : "Simplified"} eventHandler={() => handleSimplified()} />
                <BottomBar />
                <Button text="Get Random List" eventHandler={() =>
                    handleNewBarArray(arrayManager.getRandomList(barListSize))
                } />
                <Button text="Get Almost Sorted List" eventHandler={() =>
                    handleNewBarArray(arrayManager.getAlmostSortedList(barListSize))
                } />
                <Button text="Add bar" eventHandler={() => {
                    handleNewBarArray(barList.concat(arrayManager.getRandomList(1)))
                    setBarListSize(barListSize + 1)
                }
                } />
                <Button text="Remove bar" eventHandler={() => {
                    if (barListSize > 2) {
                        handleNewBarArray(barList.slice(0, barListSize - 1))
                        setBarListSize(barListSize - 1)
                    }
                }
                } />
                <BottomBar />
                <h1>{status.algorithmStatus}</h1>
            </div>
        </div>
    )
}

export default ArraySorter