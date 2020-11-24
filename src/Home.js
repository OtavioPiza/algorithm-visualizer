import React from 'react'
import RedirectButton from './components/RedirectButton';
import BottomBar from './components/BottomBar';
import Array from './components/Array'
import arrayManager from './services/arrayManager';
import './styles/Home.css';


const Home = () => {

  return (
    <div className='Container'>
      <div className='Home'>
        <div className='logo-container'>
          <Array barList={arrayManager.getDefaultList()} />
        </div>
        <BottomBar />
        <div className='text-container'>
          <strong>Algorithm Visualizer</strong>
          <p>An intuitive way to visualize how algorithms work</p>
        </div>
        <BottomBar />
        <div className='button-container'>
          <RedirectButton text='About' />
          <RedirectButton text='Explore' id='thisisfine' href={"/bubblesort"} />
        </div>
      </div>
    </div>
  );
}

export default Home;