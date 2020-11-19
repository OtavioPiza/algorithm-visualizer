import React, { useState } from 'react'
import Bar from './Bar'
import Button from './Button'
import BottomBar from './BottomBar'
import arrayManager from '../services/arrayManager'
import '../styles/components/ArraySorter.css'
import Header from './Header'

/**
 * 
 * @param {
 * currentArray: list of bar objects
 * sortingAlgorithm: sortingAlgorithm
 * } param0 
 */
const ArraySorter = ({ sortingAlgorithm, barList = arrayManager.getRandomList(10) }) => {
    /* Holds the size of the array */
    const [arraySize, setArraySize] = useState(10)

    /* Holds wheter the algorithm should be running automatically */
    const [running, setRunning] = useState(false)

    const [defaultState, setDefaultState] = useState(sortingAlgorithm.defaultState(barList))
    const [currentState, setCurrentState] = useState(defaultState)

    // == User Interactivity ======================================================================================== //

    /**
     * Selects a bar from the array and, if two bars are selected, switches them
     * 
     * @param {
     * id : id of the bar to be selected
     * } id 
     */
    const handleSelectBar = (firstBarIndex) => {
        setRunning(false)
        setCurrentState(sortingAlgorithm.defaultState(arrayManager.selectBar(firstBarIndex, currentState[1])))
    }

    // == Control Panel ============================================================================================= //

    /**
     * Sets a new default bar
     * 
     * @param {size: {}, analyzed: {}, sorted: {}} newBarArray 
     */
    const handleNewBarArray = (newBarArray) => {
        setCurrentState(sortingAlgorithm.defaultState(newBarArray))
        setDefaultState(sortingAlgorithm.defaultState(newBarArray))
    }

    /**
     * Resets the array to its initial state
     */
    const handleReset = () => {
        setRunning(false)
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
        handleNewBarArray(arrayManager.addBar(add, currentState[1]))
    }

    /**
     * Handles one step of the sorting algorithm
     */
    const handleStep = () => {
        setCurrentState(sortingAlgorithm.sort(currentState))
    }

    const handleSetList = () => {
        setDefaultState(sortingAlgorithm.defaultState(currentState[1]))
    }

    // == Auto-run feature ========================================================================================== //


    if (running) {

        if (!currentState[0].sorted) {
            // try to combine both the status and curent bars states
            setTimeout(
                () => {
                    setCurrentState(sortingAlgorithm.sort(currentState))
                },
                10
            )
        } else {
            setRunning(false)
        }
    }


    return (
        <div className='container'>
            <Header link="/" />

            <div className='ArraySorter'>

                <div className='Array'>
                    {currentState[1].map((bar, index) => (
                        <Bar key={index} id={index} size={bar.size} analyzed={bar.analyzed}
                            selected={bar.selected} eventHandler={handleSelectBar} sorted={bar.sorted}
                            simplified={arraySize > 15}
                            locked={index > currentState[0].upperbound || index < currentState[1].upperbound} />
                    ))}
                </div>

                <BottomBar />

                <div>

                    <Button text='Step' eventHandler={() => handleStep()} />
                    <Button text={running ? 'Stop' : 'Run'} eventHandler={() => setRunning(!running)} red={running} />
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
                    <Button text="Set list" eventHandler={() => handleSetList()} />

                </div>

                <BottomBar />

                <div>
                    <h1>{running ? "Running!" : currentState[0].algorithmStatus}</h1>
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

                <BottomBar />

                <div>
                    <p>
                        Implementation goes here, Implementation goes here, Implementation goes here, Implementation goes here,
                        Implementation goes here, Implementation goes here, Implementation goes here, Implementation goes here,
                        Implementation goes here, Implementation goes here, Implementation goes here, Implementation goes here,
                        Implementation goes here, Implementation goes here, Implementation goes here, Implementation goes here,
                        Implementation goes here, Implementation goes here, Implementation goes here, Implementation goes here,
                        Implementation goes here, Implementation goes here, Implementation goes here, Implementation goes here,
                        Implementation goes here, Implementation goes here, Implementation goes here, Implementation goes here,
                        Implementation goes here, Implementation goes here, Implementation goes here, Implementation goes here,
                        Implementation goes here, Implementation goes here, Implementation goes here, Implementation goes here,
                </p>
                </div>
            </div>
        </div>
    )
}

export default ArraySorter