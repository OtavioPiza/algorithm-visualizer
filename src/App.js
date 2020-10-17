import React from 'react';
import './styles/App.css';
import Button from './components/Button';

function App() {

  return (
    <div className='container'>
      <div className='logo-container'>
        <img src='./images/logo.png' alt='Algorithm Visualizer Logo'/>
      </div>
      <div className='text-container'>
        <strong>Algorithm Visualizer</strong>
        <p>An intuitive way to visualize how algorithms work</p>
      </div>
      <div className='button-container'>
        <Button text='About'/>
        <Button text='Explore' id='thisisfine' eventHandler={() => console.log('this is fine')}/>
      </div>
    </div>
  );
}

export default App;
