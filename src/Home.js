import React from 'react'
import './styles/App.css';
import RedirectButton from './components/RedirectButton';
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
        <RedirectButton text='About'/>
        <RedirectButton text='Explore' id='thisisfine' href={"/bubblesort"}/>
      </div>
    </div>
  );
}

export default Home;