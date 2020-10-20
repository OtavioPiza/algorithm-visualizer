import React from 'react';
import './styles/App.css';
import Button from './components/Button';
import BottomBar from './components/BottomBar';
import Bar from './components/Bar';

function App() {

  return (
    <div className='container'>
      <div className='logo-container'>
        <Bar size={ 900 }></Bar>
        <Bar size={ 700 }></Bar>
        <Bar size={ 800 }></Bar>
        <Bar size={ 1000 }></Bar>
        <Bar size={ 200 }></Bar>
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
