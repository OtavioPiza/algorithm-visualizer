import React, { useState } from 'react'
import Bar from './Bar'
import Button from './Button'
import BottomBar from './BottomBar'
import arrayManager from '../services/arrayManager'
import '../styles/components/ArraySorter.css'
import Header from './Header'

/**
 * A plataform that implements a sorting algorithm
 *
 * @param {sortingAlgorithm, Bar[]} param sorting algorithm and array of bars
 */
const ArraySorter = ({ sortingAlgorithm, barList = arrayManager.getRandomList(10) }) => {
  const [arraySize, setArraySize] = useState(10)                  // Size of the array
  const [running, setRunning] = useState(false)                   // If the algoithm is running
  const [defaultState, setDefaultState]                           // A default state the user can reset to
        = useState(sortingAlgorithm.defaultState(barList))
  const [currentState, setCurrentState] = useState(defaultState)  // The current state of the algorithm

  // == User Interactivity ======================================================================================== //

  /**
     * Selects a bar from the array and, if two bars are selected, switches them
     *
     * @param {Integer} id index of the bar that was selected
     */
  const handleSelectBar = (firstBarIndex) => {
    setRunning(false)
    setCurrentState(sortingAlgorithm.defaultState(arrayManager.selectBar(firstBarIndex, currentState[1])))
  }

  // == Control Panel ============================================================================================= //

  /**
     * Sets a new default bar array to be used by the sorting algorithm
     *
     * @param {{size: {}, analyzed: {}, sorted: {}}} newBarArray new array of bars that will be used
     */
  const handleNewBarArray = (newBarArray) => {
    setCurrentState(sortingAlgorithm.defaultState(newBarArray))
    setDefaultState(sortingAlgorithm.defaultState(newBarArray))
  }

  /**
     * Resets the array to the initial state
     */
  const handleReset = () => {
    setRunning(false)
    setCurrentState(defaultState)
  }

  /**
     * Adds or removes a bar from the array
     *
     * @param {Boolean} add indicated wheter a bar is to be added or removed
     */
  const handleAdd = (add = true) => {
    setRunning(false)

    if (!add && arraySize <= 2) return
    setArraySize(add ? arraySize + 1 : arraySize - 1)
    handleNewBarArray(arrayManager.addBar(add, currentState[1]))
  }

  /**
     * Makes the sorting algorithm take one step
     */
  const handleStep = () => {

    if (!currentState[0].sorted) {
      setCurrentState(sortingAlgorithm.sort(currentState))
    }
  }

  /**
     * Sets the current state of the sorting algorithm as the initial state
     */
  const handleSetList = () => {
    setDefaultState(sortingAlgorithm.defaultState(currentState[1]))
  }

  /**
     * Switches the auto-run feature
     */
  const handleRun = () => {
    setRunning(!running)
  }

  // == Auto-run feature ========================================================================================== //

  /**
     * Auto-run
     */
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

  // == HTML ====================================================================================================== //

  return (
    <div className='ArraySorter'>

      <header className='PageHeader'>

        <Header link="explore" title={sortingAlgorithm.name()} />

      </header>


      <div className='Sorter'>

        <div className='Array'>
          {currentState[1].map((bar, index) => (
            <Bar key={index} id={index} size={bar.size} analyzed={bar.analyzed}
              selected={bar.selected} eventHandler={handleSelectBar} sorted={bar.sorted}
              simplified={arraySize > 15}
              locked={index > currentState[0].upperbound || index < currentState[0].lowerbound} />
          ))}
        </div>

        <BottomBar />

        <div className="ControlPanel">

          <Button text='Step' eventHandler={() => handleStep()} />
          <Button text={running ? 'Stop' : 'Run'} eventHandler={() => handleRun()} red={running} />
          <Button text='Reset' eventHandler={() => handleReset()} />
          <Button text="Add" eventHandler={() => handleAdd(true)} />
          <Button text="Remove" eventHandler={() => handleAdd(false)} />

        </div>

        <BottomBar />

        <div className="ArrayManager">

          <Button text="Random List"
            eventHandler={() => handleNewBarArray(arrayManager.getRandomList(arraySize))} />
          <Button text="Almost Sorted List"
            eventHandler={() => handleNewBarArray(arrayManager.getAlmostSortedList(arraySize))} />
          <Button text="Set list" eventHandler={() => handleSetList()} />

        </div>

        <BottomBar />

        <div className="Status">
          <h1>{running ? 'Running!' : currentState[0].algorithmStatus}</h1>
        </div>

        <BottomBar />

        <div className='Complexity'>
          <h1>
                        Algorithm Complexity
          </h1>

          <p>

                        Worse case complexity: {currentState[0].worseComplexity}
            <br />
                        Best case complexity: {currentState[0].bestComplexity}
            <br />
                        Current case complexity: {currentState[0].complexity}

          </p>

        </div>

        <BottomBar />

        {sortingAlgorithm.about()}

        <BottomBar />

        {sortingAlgorithm.implementation()}

      </div>

    </div>
  )
}

export default ArraySorter