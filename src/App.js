import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import BubbleSort from './BubbleSort'
import Home from './Home'


function App() {

  return (
    <HashRouter basename="/">

        <Route path="/bubblesort" component={BubbleSort} />

    </HashRouter>
  );
}

export default App;