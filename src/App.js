import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import './styles/App.css';
import Button from './components/Button';
import BottomBar from './components/BottomBar';
import Array from './components/Array'
import ArraySorter from './components/ArraySorter'
import BubbleSort from './algorithms/bubbleSort'
import arrayManager from './services/arrayManager';


function App() {

  return (
    <div className='container'>
      <div className='logo-container'>
        <Array barList={ arrayManager.getDefaultList() }/>
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
      <ArraySorter barList={ arrayManager.getRandomList(10) } sortingAlgorithm={ BubbleSort }/>
      

    </div>
  );
}

export default App;
