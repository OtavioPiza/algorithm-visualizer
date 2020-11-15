/**
 * Returns a list with almost sorted list
 * 
 * @param {
 * size of the list of bars
 * } size 
 */
const getAlmostSortedList = (size) => {
    let barList = []

    for (let i =  0; i < size; i++) {
        barList.push({
            size: 100 * (i + 1) / (size + 1),
            selected: false,
            analyzed: false,
        })
    }

    for (let i = Math.ceil(size / 10); i < size; i++) {
        const bar1 = barList[Math.floor(Math.random() * size)]
        const bar2 = barList[Math.floor(Math.random() * size)]
        return barList.map(bar => 
            bar === bar1 ? bar2 :
            bar === bar2 ? bar1 :
            bar
        )
    }
}

/**
 * Returns a list with the logo bars
 */
const getDefaultList = () => {
    return (
        [
            {
                size: 70,
                selected: false,
                analyzed: false
            },
            {
                size: 90,
                selected: false,
                analyzed: false
            },
            {
                size: 30,
                selected: false,
                analyzed: false
            },
            {
                size: 50,
                selected: false,
                analyzed: false
            },
            {
                size: 80,
                selected: false,
                analyzed: false
            },
            {
                size: 40,
                selected: false,
                analyzed: false
            }
        ]
    )
}

/**
 * Returns a list with randomly sized bars
 * 
 * @param {
 * size of the list of bars
 * } size 
 */
const getRandomList = (size) => {
    let barList = []

    for (let i = 0; i < size; i++) {
        let size = Math.ceil(Math.random() * 100)
        
        if (size < 10) {
            size += 10
        }

        barList.push({
            size: size,
            selected: false,
            analyzed: false,
        })
    }
    return (barList)
}

const selectBar = (firstBarIndex, bars) => {

    if (bars[firstBarIndex].selected) {
        return  bars.map(bar => ({...bar, selected: false}))

    } else {
        let secondBarIndex = -1

        for (let i = 0; i < bars.length - 1; i++) {
            if (bars[i].selected) {
                secondBarIndex = i
                break
            }
        }

        if (secondBarIndex !== -1) {
            return bars.map((bar, i) => {
                switch (i) {
                    case firstBarIndex:
                        return {...bars[secondBarIndex], selected: false}
                    
                    case secondBarIndex:
                        return {...bars[firstBarIndex], selected: false}

                    default:
                        return bar
                }
            })
        } else {
            return bars.map((bar, i) => i === firstBarIndex ? {...bar, selected: true} : bar)
        }
    }
}

/**
 * Switches two bars reseting their selected and analyzed properties to false
 * 
 * @param {Arrays of bars} bars 
 * @param {Index of the first bar} firstBar 
 * @param {Index of the second bar} secondBar 
 */
const switchBars = (bars, firstBar, secondBar) => (
    bars.map((bar, index) => (
        index === firstBar ? { ...bar, size: bars[secondBar].size, selected: false} :
        index === secondBar ? { ...bar, size: bars[firstBar].size, selected: false} :
        bar
    ))
)

export default { getAlmostSortedList, getDefaultList, getRandomList, selectBar, switchBars }