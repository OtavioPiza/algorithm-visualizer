import React from 'react';
import './styles/App.css';
import Button from './components/Button';
import BottomBar from './components/BottomBar';
import Bar from './components/Bar';

const bars = [
  {
    size: 450,
    selected: false
  },
  {
    size: 350,
    selected: false
  },
  {
    size: 200,
    selected: false
  },
  {
    size: 280,
    selected: false
  },
  {
    size: 170,
    selected: false
  },
]

function App() {

  return (
    <div className='container'>
      <div className='logo-container'>
        {bars.map((bar, index) => (
          <Bar key={ index } id={ index } size={ bar.size } selected={ bar.selected }/>
        ))}
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
