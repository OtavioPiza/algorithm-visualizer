/**
 * 
 */
const BubbleSort = ({ analyzedBarsIndex, greater, step, switched }, bars) => {

    const compareBars = () => {
        const newGreater = bars[analyzedBarsIndex[0]].size > bars[analyzedBarsIndex[1]].size
        const newFirstBar = {...bars[analyzedBarsIndex[0]], analyzed: true}
        const newSecondBar = {...bars[analyzedBarsIndex[1]], analyzed: true}
        const newBars = bars.map((bar, index) => {
            
            switch (index) {
                case analyzedBarsIndex[0]:
                    return newFirstBar

                case analyzedBarsIndex[1]:
                    return newSecondBar

                default:
                    return bar
            }
        })
        return [
            {
                analyzedBarsIndex: analyzedBarsIndex,
                greater: newGreater,
                step: 1,
                switched: false
            },
            newBars
        ]
    }
    const switchBars = () => {
    }
    return step === 0 ? compareBars() : switchBars()
}

export default BubbleSort

