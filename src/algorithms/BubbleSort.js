/**
 * 
 */
const BubbleSort = ({ analyzedBarsIndex, greater, step, switched }, bars) => {

    const compareBars = () => {
        const newFirstBar = {...bars[analyzedBarsIndex[0]], selected: true}
        const newSecondBar = {...bars[analyzedBarsIndex[1]], selected: true}

        newBars = bars.map((bar, index) => {
            switch (index) {
                case analyzedBarsIndex[0]:
                    return 

                case analyzedBarsIndex[1]:


            }
        })
    }

    const switchBars = () => {

    }

}

export default BubbleSort

