import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './styles/App.css';
import BubbleSort from './BubbleSort'
import Home from './Home';


function App() {

  return (
    <Router>

      <Switch>

        <Route path="/bubblesort" component={BubbleSort} />
        <Route path="/" component={Home} />

      </Switch>

    </Router>
  );
}

export default App;