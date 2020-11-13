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
        const bar1 = Math.floor(Math.random() * size)
        const bar2 = Math.floor(Math.random() * size)
        const temp = barList[bar1]

        barList[bar1] = barList[bar2]
        barList[bar2] = barList[temp]
    }

    return (barList)
}

export default { getAlmostSortedList, getDefaultList, getRandomList }