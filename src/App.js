import React from 'react'
import './styles/App.css';
import Button from './components/Button';
import BottomBar from './components/BottomBar';
import Array from './components/Array'
import ArraySorter from './components/ArraySorter'
import ArrayManager from './services/ArrayManager'

function App() {

  return (
    <div className='container'>
      <div className='logo-container'>
        <Array barList={ ArrayManager.getBarList() }/>
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
      <ArraySorter barList={ ArrayManager.getBarList() }/>
    </div>
  );
}

export default App;
