import React from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import About from './About'
import BubbleSort from './pages/sorting/BubbleSort'
import InsertionSort from './InsertionSort'
import Home from './Home'
import Explore from './Explore'

/**
 * This is the page that
 */
const App = () => {

  return (
    <Router basename="/">

      <Switch>

        <Route exact path="/bubblesort" component={BubbleSort} />
        <Route exact path="/insertionsort" component={InsertionSort} />
        <Route exact path="/explore" component={Explore} />
        <Route exact path="/about" component={About} />
        <Route exact path="/" component={Home} />

      </Switch>

    </Router>
  )
}

export default App