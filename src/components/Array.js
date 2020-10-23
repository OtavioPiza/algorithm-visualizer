import React from 'react'
import Bar from './Bar'

/**
 * React component representing an array of Bar components
 * 
 * @param {
 *  bars: array of bars objects
 *  eventHandler: hadler for the onClick event
 *  sorted: identifies if the list sorted (1) unsorted (0) or reversed (-1)
 * } param0
 * @returns an array containing a Bar component for each bar on the provided list
 */
const Array = ({ bars, eventHandler, sorted }) => {

    return (
       <div>
            {bars.map((bar, index) => (
                <Bar key={ index } id={ index } size={ bar.size } selected={ bar.selected }
                eventHandler={ eventHandler } sorted={ sorted }/>
            ))}
       </div>
    )
}

export default Array