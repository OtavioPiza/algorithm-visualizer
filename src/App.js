import React from 'react';
import './styles/App.css';
import Button from './components/Button';
import BottomBar from './components/BottomBar';
import Bar from './components/Bar';

function App() {

  return (
    <div className='container'>
      <div className='logo-container'>
        <Bar size={ 90 }></Bar>
        <Bar size={ 70 }></Bar>
        <Bar size={ 80 }></Bar>
        <Bar size={ 100 }></Bar>
        <Bar size={ 20 }></Bar>
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
