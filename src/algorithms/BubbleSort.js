import switchBars from '../services/switchBars'

const BubbleSort = ({ analyzedBarsIndex, step }, bars) => {

    const compareBars = () => {
        const endOfBar = analyzedBarsIndex[1] === bars.length - 1
        const greater = bars[analyzedBarsIndex[0]].size > bars[analyzedBarsIndex[1]].size
        const newFirstBar = {...bars[analyzedBarsIndex[0]], analyzed: true}
        const newSecondBar = {...bars[analyzedBarsIndex[1]], analyzed: true}
        const newBars = bars.map((bar, index) => (
            index === analyzedBarsIndex[0] ? newFirstBar :
            index === analyzedBarsIndex[1] ? newSecondBar :
            {...bar, analyzed: false}
        ))

        console.log(analyzedBarsIndex[1] === bars.length - 1)
        return [{
            algorithmStatus: greater ? "Greater" : "Not greater",
            analyzedBarsIndex: greater ? analyzedBarsIndex :
                endOfBar ? [0, 1] : 
                analyzedBarsIndex.map(index => index + 1),
            step: greater ? 1 : 0,
            switched: false
            },
            newBars
        ]
    }

    const changeBars = () => ([
        {
            algorithmStatus: '',
            analyzedBarsIndex: analyzedBarsIndex.map(index => index + 1),
            step: 0,
            switched: true
        },
        switchBars(bars, analyzedBarsIndex[0], analyzedBarsIndex[1])
    ])

    return step === 0 ? compareBars() : changeBars()
}

export default BubbleSort

