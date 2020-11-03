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

export default switchBars