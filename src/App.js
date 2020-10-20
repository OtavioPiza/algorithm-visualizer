import React from 'react';
import './styles/App.css';
import Button from './components/Button';
import BottomBar from './components/BottomBar';
import logo from './styles/images/logo.png'
import Bar from './components/Bar';

function App() {

  return (
    <div className='container'>
      <div className='logo-container'>
        <img src={logo} alt='Algorithm Visualizer Logo'/>
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
      <Bar size={1000}></Bar>
    </div>
  );
}

export default App;
