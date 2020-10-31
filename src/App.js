import React from 'react'
import './styles/App.css';
import Button from './components/Button';
import BottomBar from './components/BottomBar';
import Array from './components/Array'
import ArraySorter from './components/ArraySorter'

const testlist = [
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
]

function App() {

  return (
    <div className='container'>
      <div className='logo-container'>
        <Array barList={ testlist }/>
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
      <BottomBar/>
      <ArraySorter barList={testlist}/>
    </div>
  );
}

export default App;
