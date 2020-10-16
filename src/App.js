import React from 'react';
import './styles/App.css';
import Button from './components/Button';

function App() {
  return (
    <div>
      <div class='logo-container'>
        <img src='./images/logo.png'/>
      </div>
      <div class='text-container'>
        <h1>Algorithm Visualizer</h1>
        <p>An intuitive way to visualize how algorithms work</p>
        <Button text='About'/>
        <Button text='Explore'/>
      </div>
    </div>
  );
}

export default App;
