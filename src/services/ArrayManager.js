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
        barList.push({
            size: Math.ceil(Math.random() * 100),
            selected: false,
            analyzed: false,
        })
    }
    return (barList)
}

export default { getDefaultList, getRandomList }