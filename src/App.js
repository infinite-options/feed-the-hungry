import React from 'react';
import logo from './logo.svg';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";

// import css
import 'bulma/css/bulma.css'; 
import './App.css';

import Banks from './Banks/Banks';
import Bank from './Banks/Bank';
import Header from './Header/Header';

function App() {
  return (
    <Router>
      <Header />
      {/* A <Switch> looks through its children <Route>s and
      renders the first one that matches the current URL. */}

      <Switch>
        <Route exact path="/banks">
          <Banks />
        </Route>
        <Route path={"/banks/:bankId"}>
          <Bank />
        </Route>
        <Route path="/about">
          {/* <About /> */}
        </Route>
        <Route path="/report">
          {/* <Report /> */}
        </Route>
      </Switch>
    </Router>
  );
}


export default App;
