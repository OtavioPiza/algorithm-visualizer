/**
 * Returns a new array of bar objects with either a new bar appended to the old one or the left-most bar removed
 *
 * @param {boolean} add indicated whether a bar is to be added or removed
 * @param bars
 */
const addBar = (add = true, bars) => (
  add
    ? bars.concat({ size: Math.floor(100 * Math.random()) })
    : bars.slice(0, bars.length - 1)
)

/**
 * Returns the default list similar to that of the logo
 */
const getDefaultList = () => [
  {
    size: 40
  },
  {
    size: 20
  },
  {
    size: 80
  },
  {
    size: 60
  },
  {
    size: 100
  }
]

/**
 * Returns an ordered list with bar objects
 *
 * @param size
 * @returns {[]}
 */
const getList = (size) => {
  let list = []

  for (let i = 0; i < size; i++) {
    list.push({
      size: 100 * (i + 1) / (size + 1),
      selected: false,
      analyzed: false,
    })
  }
  return list
}

/**
 * Returns a list with almost sorted list
 *
 * @param {Integer} size size of the array
 */
const getAlmostSortedList = (size) => {
  let barList = getList(size)

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
 * Returns a list with randomly sized bars
 *
 * @param {Integer} size size of the array
 */
const getRandomList = (size) => {
  let barList = getList(size)

  let currentIndex = barList.length, temporaryValue, randomIndex

  while (0 !== currentIndex) {

    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1

    temporaryValue = barList[currentIndex]
    barList[currentIndex] = barList[randomIndex]
    barList[randomIndex] = temporaryValue
  }
  return barList
}

/**
 * Selects a bar from the array and, if two bars are selected, switches them
 *
 * @param {int} firstBarIndex index of the bar to be selected
 * @param {array} bars array containig all the bars
 */
const selectBar = (firstBarIndex, bars) => {

  if (bars[firstBarIndex].selected) {
    return bars.map(bar => ({ ...bar, selected: false }))

  } else {
    let secondBarIndex = -1

    for (let i = 0; i < bars.length; i++) {
      if (bars[i].selected) {
        secondBarIndex = i
        break
      }
    }

    if (secondBarIndex !== -1) {
      return bars.map((bar, i) => {
        switch (i) {
        case firstBarIndex:
          return { ...bars[secondBarIndex], selected: false }

        case secondBarIndex:
          return { ...bars[firstBarIndex], selected: false }

        default:
          return bar
        }
      })
    } else {
      return bars.map((bar, i) => i === firstBarIndex ? { ...bar, selected: true } : bar)
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
    index === firstBar ? { ...bar, size: bars[secondBar].size, selected: false } :
      index === secondBar ? { ...bar, size: bars[firstBar].size, selected: false } :
        bar
  ))
)

export default { addBar, getAlmostSortedList, getRandomList, selectBar, switchBars, getDefaultList }