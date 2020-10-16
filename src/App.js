import React from 'react';
import './styles/index.css';
import Button from './components/Button';

function App() {
  return (
    <div>
      <div class='logo'>
        <img src='./images/logo.png'/>
      </div>
      <div class='text'>
        <Button text='About'/>
        <Button text='Explore'/>
      </div>
    </div>
  );
}

export default App;
