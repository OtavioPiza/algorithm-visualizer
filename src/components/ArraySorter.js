import React, { useState } from 'react'
import Array from './Array'
import BubbleSort from '../algorithms/BubbleSort'
import Button from './Button'

const ArraySorter = ({ barList }) => {
    const [bars, setBars] = useState(barList)

    return(
        <div className='ArraySorter'>
            <Array barList={bars} simplified={true}/>
            <Button text='click' eventHandler={() => setBars(BubbleSort({
                analyzedBarsIndex: [0, 1],
                greater: false,
                step: 0,
                switched: false,
            }, barList)[1])}/>
        </div>
    )
}

export default ArraySorter