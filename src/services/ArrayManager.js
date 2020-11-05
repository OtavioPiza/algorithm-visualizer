let barList = [
    {
        size: 390,
        selected: false,
        analyzed: false
    },
    {
        size: 350,
        selected: false,
        analyzed: false
    },
    {
        size: 200,
        selected: false,
        analyzed: false
    },
    {
        size: 280,
        selected: false,
        analyzed: false
    },
    {
        size: 170,
        selected: false,
        analyzed: false
    },
    {
        size: 410,
        selected: false,
        analyzed: false
    },
    {
        size: 350,
        selected: false,
        analyzed: false
    },
    {
        size: 200,
        selected: false,
        analyzed: false
    },
    {
        size: 280,
        selected: false,
        analyzed: false
    },
    {
        size: 130,
        selected: false,
        analyzed: false
    },
    {
        size: 410,
        selected: false,
        analyzed: false
    },
]

const getBarList = () => barList

const setBarList = (newList) => {
    barList = newList
}

export default {getBarList, setBarList}