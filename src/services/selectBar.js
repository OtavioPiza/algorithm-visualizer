const selectBar = (firstBarIndex, bars) => {

    if (bars[firstBarIndex].selected) {
        return  bars.map(bar => ({...bar, selected: false}))

    } else {
        let secondBarIndex = -1

        for (let i = 0; i < bars.length - 1; i++) {
            if (bars[i].selected) {
                secondBarIndex = i
                break
            }
        }

        if (secondBarIndex !== -1) {
            return bars.map((bar, i) => {
                switch (i) {
                    case firstBarIndex:
                        return {...bars[secondBarIndex], selected: false}
                    
                    case secondBarIndex:
                        return {...bars[firstBarIndex], selected: false}

                    default:
                        return bar
                }
            })
        } else {
            return bars.map((bar, i) => i === firstBarIndex ? {...bar, selected: true} : bar)
        }
    }
}
export default selectBar