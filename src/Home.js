import React from 'react';
import RedirectButton from './components/RedirectButton';
import BottomBar from './components/BottomBar';
import SimpleArray from './components/SimpleArray';
import arrayManager from './util/arrayManager';
import './styles/Home.css';

/**
 * React component representing the Home page of the application
 */
const Home = () => {
  return (
    <div className='Container'>
      <div className='Home'>
        <div className='logo-container'>
          <SimpleArray barList={arrayManager.defaultList} />
        </div>
        <BottomBar />
        <div className='text-container'>
          <strong>Algorithm Visualizer</strong>
          <p>An intuitive way to visualize how algorithms work</p>
        </div>
        <BottomBar />
        <div className='button-container'>
          <RedirectButton text='About' href='about'/>
          <RedirectButton text='Explore' id='thisisfine' href="explore" />
        </div>
      </div>
    </div>
  );
};

export default Home;
