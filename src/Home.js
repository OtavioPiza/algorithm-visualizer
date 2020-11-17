import React from 'react'
import './styles/App.css';
import Button from './components/Button';
import BottomBar from './components/BottomBar';
import Array from './components/Array'
import arrayManager from './services/arrayManager';


const Home = () => {

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
    </div>
  );
}

export default Home;