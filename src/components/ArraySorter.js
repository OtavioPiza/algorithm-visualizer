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
    /* Holds the size of the array */
    const [arraySize, setArraySize] = useState(10)

    /* Holds wheter the algorithm should be running automatically */
    const [running, setRunning] = useState(false)

    const [defaultState, setDefaultState] = useState(props.sortingAlgorithm.defaultState(props.barList))
    const [currentState, setCurrentState] = useState(defaultState)

    // == User Interactivity ======================================================================================== //

    /**
     * Selects a bar from the array and, if two bars are selected, switches them
     * 
     * @param {
     * id : id of the bar to be selected
     * } id 
     */
    const handleSelectBar = (id) => {
        let newBars

        if (!currentState[1][id].selected) {
            let i

            for (i = 0; i < currentState[1].length - 1; i++) {
                if (currentState[1][i].selected) break
            }

            if (currentState[1][i].selected) {
                console.log(id, i);
                const firstBar = {
                    ...currentState[1][id],
                    selected: false,
                    size: currentState[1][i].size
                }

                const secondBar = {
                    ...currentState[1][i],
                    selected: false,
                    size: currentState[1][id].size
                }

                newBars = currentState[1].map((bar, index) => {
                    switch (index) {
                        case id:
                            return firstBar

                        case i:
                            return secondBar
                        
                        default:
                            return bar
                    }
                })
            }
        } else {
            newBars = currentState[1].map((bar, index) => (index === id ? {
                ...currentState[1][id],
                selected: !currentState[1][id].selected
            } : bar))
        }

        setCurrentState(props.sortingAlgorithm.defaultState(newBars))


    }

    // == Control Panel ============================================================================================= //

    /**
     * Sets a new default bar
     * 
     * @param {size: {}, analyzed: {}, sorted: {}} newBarArray 
     */
    const handleNewBarArray = (newBarArray) => {
        setDefaultState(props.sortingAlgorithm.defaultState(newBarArray))
        setCurrentState(defaultState)
    }

    /**
     * Resets the array to its initial state
     */
    const handleReset = () => {
        setCurrentState(defaultState)
    }

    /**
     * Adds or removes a bar from the array
     * 
     * @param {boolean} add indicated wheter a bar is to be added or removed
     */
    const handleAdd = (add = true) => {
        if (!add && arraySize <= 2) return
        setArraySize(add ? arraySize + 1 : arraySize - 1)
        handleNewBarArray((add ? currentState[1].concat(arrayManager.getRandomList(1)) :
            currentState[1].slice(0, arraySize - 1)).map(bar => ({
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
        setCurrentState(props.sortingAlgorithm.sort(currentState))
    }

    // == Auto-run feature ========================================================================================== //

    if (running && !currentState[0].sorted) {
        // try to combine both the status and curent bars states
        setTimeout(
            () => {
                setCurrentState(props.sortingAlgorithm.sort(currentState))
            },
            250
        )
    }


    return (
        <div className='ArraySorter'>
            <div className='Array'>
                {currentState[1].map((bar, index) => (
                    <Bar key={index} id={index} size={bar.size} analyzed={bar.analyzed}
                        selected={bar.selected} eventHandler={handleSelectBar} sorted={bar.sorted}
                        simplified={arraySize > 15} />
                ))}
            </div>

            <BottomBar />

            <div>

                <Button text='Step' eventHandler={() => handleStep()} />
                <Button text='Run' eventHandler={() => setRunning(!running)} />
                <Button text='Reset' eventHandler={() => handleReset()} />
                <Button text="Add bar" eventHandler={() => handleAdd(true)} />
                <Button text="Remove bar" eventHandler={() => handleAdd(false)} />

            </div>

            <BottomBar />

            <div>
                <Button text="Get Random List"
                    eventHandler={() => handleNewBarArray(arrayManager.getRandomList(arraySize))} />
                <Button text="Get Almost Sorted List"
                    eventHandler={() => handleNewBarArray(arrayManager.getAlmostSortedList(arraySize))} />


            </div>

            <BottomBar />

            <div>
                <h1>{currentState[0].algorithmStatus}</h1>
            </div>

            <BottomBar />

            <div>
                <p>
                    Text goes here, Text goes here, Text goes here, Text goes here, Text goes here, Text goes here,
                    Text goes here, Text goes here, Text goes here, Text goes here, Text goes here, Text goes here,
                    Text goes here, Text goes here, Text goes here, Text goes here, Text goes here, Text goes here,
                    Text goes here, Text goes here, Text goes here, Text goes here, Text goes here, Text goes here,
                    Text goes here, Text goes here, Text goes here, Text goes here, Text goes here, Text goes here,
                    Text goes here, Text goes here, Text goes here, Text goes here, Text goes here, Text goes here,
                    Text goes here, Text goes here, Text goes here, Text goes here, Text goes here, Text goes here,
                    Text goes here, Text goes here, Text goes here, Text goes here, Text goes here, Text goes here,
                    Text goes here, Text goes here, Text goes here, Text goes here, Text goes here, Text goes here,
                </p>
            </div>
        </div>
    )
}

export default ArraySorter