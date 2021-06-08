/* Constants */

/**
 * Default bar object list
 *
 * @type {[{size: number, selected: boolean, analyzed: boolean}]}
 */
const defaultList = [
    {
        size: 40,
        selected: false,
        analyzed: false
    },
    {
        size: 20,
        selected: false,
        analyzed: false
    },
    {
        size: 80,
        selected: false,
        analyzed: false
    },
    {
        size: 60,
        selected: false,
        analyzed: false
    },
    {
        size: 100,
        selected: false,
        analyzed: false
    },
];

/* Functions */

/**
 * Returns a new array of bar objects with either a new bar appended to the old one or the left-most bar removed
 *
 * @param add {boolean} whether a bar should be added (True) or removed (False)
 * @param bars {[{size: number, selected: boolean, analyzed: boolean}]} list of bar objects
 * @returns {[{size: number, selected: boolean, analyzed: boolean}]} new list of bar objects
 */
const addBar = (add = true, bars) => (
    add
        ? bars.concat(
            {
                size: Math.floor(100 * Math.random()),
                selected: false,
                analyzed: false
            }
        )
        : bars.slice(0, bars.length - 1)
);

/**
 * Returns a sorted array of bar objects with the provided number of elements where the bars' size are proportionally
 * divided
 *
 * @param size {number} size of the list
 * @returns {[{size: number, selected: boolean, analyzed: boolean}]} list of bar objects
 */
const getSortedList = (size = 0) => {
    const list = [];

    for (let i = 0; i < size; i++) {
        list.push({
            size: 100 * (i + 1) / (size + 1),
            selected: false,
            analyzed: false,
        });
    }
    return list;
};

/**
 * Returns a list of almost sorted bar objects
 *
 * @param size {number} size of the list
 * @return {[{size: number, selected: boolean, analyzed: boolean}]} list of bar objects
 */
const getAlmostSortedList = (size) => {
    const barList = getSortedList(size);

    for (let i = 0; i < Math.ceil(size / 9); i++) {
        const temporaryIndexOne = Math.floor(Math.random() * size);
        const temporaryIndexTwo = Math.floor((Math.ceil(Math.random() * (size / 4)) + temporaryIndexOne) % size);
        const temp = barList[temporaryIndexOne];

        barList[temporaryIndexOne] = barList[temporaryIndexTwo];
        barList[temporaryIndexTwo] = temp;
    }
    return barList;
};

/**
 * Returns a list of randomly positioned bar objects
 *
 * @param size {number} size of the list
 * @return {[{size: number, selected: boolean, analyzed: boolean}]} list of bar objects
 */
const getRandomList = (size) => {
    const barList = getSortedList(size);

    let currentIndex = barList.length;
    let temporaryValue;
    let randomIndex;

    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = barList[currentIndex];
        barList[currentIndex] = barList[randomIndex];
        barList[randomIndex] = temporaryValue;
    }
    return barList;
};

/**
 * Selects a bar from the array and, if two bars are selected, switches them
 *
 * @param index: index of the bar to be selected
 * @param bars: array of bar objects
 *
 * @return ({size: number})[size]
 */
const selectBar = (index, bars) => {
    /* the bar was already selected */
    if (bars[index].selected) {
        return bars.map((bar) => ({...bar, selected: false}));
    }

    /* the bar was not selected yet */
    else {
        /* searches for another selected bar */
        let secondBarIndex = -1;
        for (let i = 0; i < bars.length; i++) {
            if (bars[i].selected) {
                secondBarIndex = i;
                break;
            }
        }

        /* if another bar is already selected it is switched with the one with the provided index */
        if (secondBarIndex !== -1) {
            return switchBars(bars, index, secondBarIndex);
        }

        /* else the bar with the specified index is marked as selected */
        else {
            return bars.map((bar, i) => i === index ? {...bar, selected: true} : bar);
        }
    }
};

/**
 * Returns if an array of bar objects is sorted or not
 *
 * @param bars: array of bar objects
 *
 * @return boolean: whether the array is sorted
 */
const isSorted = (bars) => {
    let sorted = 1;

    for (let i = 1; i < bars.length; i++) {
        if (bars[i].size < bars[i - 1].size) {
            sorted = 0;
            break;
        }
    }
    if (sorted !== 1) {
        sorted = -1;

        for (let i = 1; i < bars.length; i++) {
            if (bars[i].size > bars[i - 1].size) {
                sorted = 0;
                break;
            }
        }
    }
    return sorted;
};

/**
 * Returns a new array of bar objects with the two specified bars switched
 *
 * @param bars: array of bar objects
 * @param firstBarIndex: index of the first bar to be switched
 * @param secondBarIndex: index of the second bar to be switched
 *
 * @return [{size: number}]
 */
const switchBars = (bars, firstBarIndex, secondBarIndex) => {
    const firstBar = bars[firstBarIndex];
    const secondBar = bars[secondBarIndex];

    return bars.map((bar, index) => index === secondBarIndex ? firstBar : index === firstBarIndex ? secondBar : bar);
};

const arrayManager = {
    addBar,
    getAlmostSortedList,
    getRandomList,
    selectBar,
    defaultList: defaultList,
    isSorted,
    switchBars
}

export default arrayManager;