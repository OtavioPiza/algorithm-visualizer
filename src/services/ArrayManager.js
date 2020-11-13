const defaultList = [
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

const getBarList = (size) => {
    let barList = []
    
    for (let i = 0; i < size; i++) {
        barList.push({
            size: Math.ceil(Math.random() * 100),
            selected: false,
            analyzed: false,
        })
    }
    return(barList)
}

const getDefaultList = () => defaultList

const setBarList = (newList) => {
    barList = newList
}

export default {getBarList, getDefaultList, setBarList}