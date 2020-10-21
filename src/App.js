import React, { useState } from 'react'
import './styles/App.css';
import Button from './components/Button';
import BottomBar from './components/BottomBar';
import Bar from './components/Bar';
import thisisfine from './styles/images/thisisfine.jpg'; // Dekete

const testlist = [
  {
    size: 390,
    selected: false
  },
  {
    size: 350,
    selected: false
  },
  {
    size: 200,
    selected: false
  },
  {
    size: 280,
    selected: false
  },
  {
    size: 170,
    selected: false
  },
  {
    size: 410,
    selected: false
  },
]

function App() {
  const [bars, setBars] = useState(testlist)
  const [barsSelected, setBarsSelected] = useState([])

  const selectBar = (id) => {
    const bar = bars[id]
    const changedBar = {...bar, selected: !bar.selected}
    setBars(bars.map((bar, index) => index === id ? changedBar : bar))
    if ( !bar.selected ) {
      setBarsSelected(barsSelected.concat(id))
    }
  }
  
  if (barsSelected.length === 2) {
    const firstBar = bars[barsSelected[0]]
    const secondBar = bars[barsSelected[1]]

    const newFirtBar = {...firstBar, size: secondBar.size, selected: false}
    const newSecondBar = {...secondBar, size: firstBar.size, selected: false}

    setBars(bars.map((bar, index) => {
      switch (index) {
        case barsSelected[0]:
          return newFirtBar;
      
        case barsSelected[1]:
          return newSecondBar;

        default:
          return bar;
      }
    }))
    setBarsSelected([])
  }

  let isSorted = true
  for (let i = 1; i < bars.length && isSorted; i++) {
    if (bars[i].size < bars[i - 1].size) {
      isSorted = false;
    }
  }

  // Delete
  let isUnsorted = true
  for (let i = 1; i < bars.length && isUnsorted; i++) {
    if (bars[i].size > bars[i - 1].size) {
      isUnsorted = false;
    }
  }
  console.log(isUnsorted);

  const backgroundImage = `url(${thisisfine})`
  const panicStyle = isUnsorted ? {
    backgroundImage: backgroundImage,
    backgroundSize: "100% 100%"    
  } : {}

  // Delete


  return (
    <div className='container' style={panicStyle}>
      <div className='logo-container'>
        {bars.map((bar, index) => (
          <Bar key={ index } id={ index } size={ bar.size } selected={ bar.selected }
          eventHandler={selectBar} sorted={isSorted} unsorted={isUnsorted}/>
        ))}
      </div>
      <BottomBar/>
      <div className='text-container'>
        <strong>Algorithm Visualizer</strong>
        <p>An intuitive way to visualize how algorithms work</p>
      </div>
      <BottomBar/>
      <div className='button-container'>
        <Button text='About'/>
        <Button text='Explore' id='thisisfine' eventHandler={() => console.log('this is fine')}/>
      </div>
    </div>
  );
}

export default App;
