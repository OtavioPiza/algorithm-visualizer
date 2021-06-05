/**
 * Returns a new array of bar objects with either a new bar appended to the old one or the left-most bar removed
 *
 * @param {boolean} add indicated whether a bar is to be added or removed
 * @param bars
 *
 * @return ({size: number})[size]
 */
const addBar = (add = true, bars) => {
  return (
    add ?
      bars.concat({size: Math.floor(100 * Math.random())}) :
      bars.slice(0, bars.length - 1)
  );
};

/**
 * Returns an array of bar objects which simulate the logo of the application
 *
 * @return ({size: number})[size]
 */
const getDefaultList = () => [
  {
    size: 40,
  },
  {
    size: 20,
  },
  {
    size: 80,
  },
  {
    size: 60,
  },
  {
    size: 100,
  },
];

/**
 * Returns a sorted array of bar objects with the provided number of elements where the bars' size are proportionally
 * divided
 *
 * @param size
 *
 * @return ({size: number})[size]
 */
const getList = (size) => {
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
 * Returns an array of bar objects with the provided number of elements where at least one bar is not sorted
 *
 * @param size
 *
 * @return ({size: number})[size]
 */
const getAlmostSortedList = (size) => {
  const barList = getList(size);

  for (let i = 0; i < Math.ceil(size / 9); i++) {
    const temporaryIndexOne = Math.floor(Math.random() * size);
    const temporaryIndexTwo = Math.floor((Math.ceil(Math.random() * (size / 4)) + temporaryIndexOne) % size);
    const temporaryValue = barList[temporaryIndexOne];

    barList[temporaryIndexOne] = barList[temporaryIndexTwo];
    barList[temporaryIndexTwo] = temporaryValue;
  }
  return barList;
};

/**
 * Returns an array of bar objects where all the elements are randomly positioned
 *
 * @param size
 *
 * @return ({size: number})[size]
 */
const getRandomList = (size) => {
  const barList = getList(size);

  let currentIndex = barList.length; let temporaryValue; let randomIndex;

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


export default {addBar, getAlmostSortedList, getRandomList, selectBar, getDefaultList, isSorted, switchBars};
