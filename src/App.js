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
import API from './API/API';

function App() {
  const list = API.DataLoader();
  var banks = [];
  if (list) {
    banks = API.RemoveDuplicatesBy('foodbank_id', list);
  }
  console.log(banks);
  return (
    <Router>
      <Header />
      {/* A <Switch> looks through its children <Route>s and
      renders the first one that matches the current URL. */}
      <Switch>
        <Route exact path="/banks">
          <Banks list={banks} />
        </Route>
        <Route path={"/banks/:bankId"}>
          <Bank list={banks} />
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
