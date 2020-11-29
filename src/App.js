import React from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import About from './About'
import BubbleSort from './BubbleSort'
import Home from './Home'

/**
 * React app
 */
function App() {

  return (
    <Router basename="/">

      <Switch>
        <Route exact path="/bubblesort" component={BubbleSort} />
        <Route exact path="/about" component={About} />
        <Route exact path="/" component={Home} />
      </Switch>
    </Router>
  );
}

export default App;