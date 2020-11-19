import React from 'react'
import { HashRouter as Router, Route } from 'react-router-dom'
import BubbleSort from './BubbleSort'
import Home from './Home'


function App() {

  return (
    <Router basename="algorithm-visualizer/">

      <Route exact path="/" component={Home} />
      <Route path="/bubblesort" component={BubbleSort} />

    </Router>
  );
}

export default App;