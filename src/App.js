import React from 'react'
import { HashRouter as Router, Route } from 'react-router-dom'
import BubbleSort from './BubbleSort'
import Home from './Home'

/**
 * React app
 */
function App() {

  return (
    <Router basename="/">

      <Route exact path="/" component={Home} />
      <Route path="/bubblesort" component={BubbleSort} />

    </Router>
  );
}

export default App;