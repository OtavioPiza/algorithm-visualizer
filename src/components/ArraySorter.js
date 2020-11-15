import React, { useState } from 'react'
import Bar from './Bar'
import Button from './Button'
import BottomBar from './BottomBar'
import arrayManager from '../services/arrayManager'

/**
 * 
 * @param {
 * currentArray: list of bar objects
 * sortingAlgorithm: sortingAlgorithm
 * } param0 
 */
const ArraySorter = (props) => {

    /* Holds a default array in case the user wants to reset the algorithm */
    const [defaultArray, setDefaultArray] = useState(props.barList)

    /* Holds the array that is being manipulated by the sorting algorithm */
    const [currentArray, setCurrentArray] = useState(defaultArray)

    /* Holds the size of the array */
    const [arraySize, setArraySize] = useState(10)

    /* Holds which bars the user has selecte */
    const [selectedBarList, setSelectedBarList] = useState([])

    /* Holds the status of the algorithm */
    const [status, setStatus] = useState(props.sortingAlgorithm.defaultState(defaultArray)[0])

    /* Holds wheter the user wants the simplified version of the array */
    const [simplified, setSimplified] = useState(false)

    /**
     * User interactivity
     */

    /**
     * Enables one to interact with the array by switching the position of two currentArray, 
     * and ensures, by returing the sorting algorithm to its default state, its functionality
     */
    if (selectedBarList.length === 2) {
        const newFirstBar = {
            ...currentArray[selectedBarList[0]],
            size: currentArray[selectedBarList[1]].size,
            selected: false,
            analyzed: false,
            sorted: false,
        }
        const newSecondBar = {
            ...currentArray[selectedBarList[1]],
            size: currentArray[selectedBarList[0]].size,
            selected: false,
            analyzed: false,
            sorted: false,
        }

        setStatus(props.sortingAlgorithm.defaultState(currentArray)[0])
        setCurrentArray(currentArray.map((bar, index) => {
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
        const bar = currentArray[id]
        const changedBar = { ...bar, selected: !bar.selected }

        setCurrentArray(currentArray.map((bar, index) => index === id ? changedBar : bar))

        if (!bar.selected) {
            setSelectedBarList(selectedBarList.concat(id))

        } else {
            setSelectedBarList(selectedBarList.filter(selected => selected !== id))
        }
    }

    /**
     * Control Panel
     */

    /**
     * Sets a new default bar
     * 
     * @param {size: {}, analyzed: {}, sorted: {}} newBarArray 
     */
    const handleNewBarArray = (newBarArray) => {
        setDefaultArray(newBarArray)
        setStatus(props.sortingAlgorithm.defaultState(newBarArray)[0])
        setCurrentArray(newBarArray)
        setSelectedBarList([])
    }

    /**
     * Resets the array to its initial state
     */
    const handleReset = () => {
        setStatus(props.sortingAlgorithm.defaultState(defaultArray)[0])
        setCurrentArray(defaultArray/*.map(bar => ({...bar, sorted: false}))*/)
        setSelectedBarList([])
    }

    /**
     * Adds or removes a bar from the array
     * 
     * @param {boolean} add indicated wheter a bar is to be added or removed
     */
    const handleAdd = (add = true) => {
        if (!add && arraySize <= 2) return
        setArraySize(add ? arraySize + 1 : arraySize - 1)
        handleNewBarArray((add ? currentArray.concat(arrayManager.getRandomList(1)) :
            currentArray.slice(0, arraySize - 1)).map(bar => ({
                ...bar,
                analyzed: false,
                sorted: false,
            })))

    }

    /**
     * Handles one step of the sorting algorithm
     * - sets currentArray to those returned by the sortingAlgorithm
     * - sets the status to that returned by the sortingAlgorithm
     */
    const handleStep = () => {
        const result = props.sortingAlgorithm.sort(status, currentArray)
        setStatus(result[0])
        setCurrentArray(result[1])
    }

    /**
     * WIP
     */
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
                {currentArray.map((bar, index) => (
                    <Bar key={index} id={index} size={bar.size} analyzed={bar.analyzed}
                        selected={bar.selected} eventHandler={handleSelectBar} sorted={bar.sorted}
                        simplified={arraySize > 15 || simplified} />
                ))}
            </div>

            <BottomBar />

            <div>
                
                <Button text='Step' eventHandler={() => handleStep()} />
                <Button text='Run' eventHandler={() => console.log("This feature was not yet implemented")} />
                <Button text='Reset' eventHandler={() => handleReset()} />
                <Button text={simplified ? "Normal" : "Simplified"} eventHandler={() => handleSimplified()} />
                
            </div>

            <BottomBar />

            <div>
                <Button text="Get Random List"
                    eventHandler={() => handleNewBarArray(arrayManager.getRandomList(arraySize))} />
                <Button text="Get Almost Sorted List"
                    eventHandler={() => handleNewBarArray(arrayManager.getAlmostSortedList(arraySize))} />
                <Button text="Add bar" eventHandler={() => handleAdd(true)} />
                <Button text="Remove bar" eventHandler={() => handleAdd(false)} />
                
            </div>

            <BottomBar />

            <div>
                <h1>{status.algorithmStatus}</h1>
            </div>

            <BottomBar />

            <div>
                <p>
                    Text goes here, Text goes here, Text goes here, Text goes here, Text goes here, Text goes here,
                    Text goes here, Text goes here, Text goes here, Text goes here, Text goes here, Text goes here,
                    Text goes here, Text goes here, Text goes here, Text goes here, Text goes here, Text goes here, 
                </p>
            </div>
        </div>
    )
}

export default ArraySorter