import React from 'react'
import Bar from './Bar'

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