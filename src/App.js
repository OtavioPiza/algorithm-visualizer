import React from 'react';
import Button from './components/Button';

function App() {
  return (
    <div>
      <link rel="stylesheet" href="styles/index.css"/>
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
