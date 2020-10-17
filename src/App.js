import React from 'react';
import './styles/App.css';
import Button from './components/Button';

function App() {

  return (
    <div class='container'>
      <div class='logo-container'>
        <img src='./images/logo.png' alt='Algorithm Visualizer Logo'/>
      </div>
      <div class='text-container'>
        <strong>Algorithm Visualizer</strong>
        <p>An intuitive way to visualize how algorithms work</p>
      </div>
      <div class='button-container'>
        <Button text='About'/>
        <br></br>
        <Button text='Explore'/>
      </div>
    </div>
  );
}

export default App;
