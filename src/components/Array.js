import React from 'react'
import Bar from './Bar'

/**
 * React component representing an array of Bar components
 * 
 * @param {
 *  bars: array of bars objects
 *  eventHandler: hadler for the onClick event
 *  isSorted: identifies if the list sorted
 *  isUnsorted: identifies if the list reversed
 * } param0
 * @returns an array containing a Bar component for each bar on the provided list
 */
const Array = ({ bars, eventHandler, isSorted, isUnsorted }) => {

    return (
       <div>
            {bars.map((bar, index) => (
                <Bar key={ index } id={ index } size={ bar.size } selected={ bar.selected }
                eventHandler={ eventHandler } sorted={ isSorted } unsorted={ isUnsorted }/>
            ))}
       </div>
    )
}

export default Array