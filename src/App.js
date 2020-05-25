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

// import bulma css
import 'bulma/css/bulma.css'; 

// import customized header
import './header.css'; 
import './App.css';


import Banks from './Banks/Banks';
import Bank from './Banks/Bank';

function App() {
  return (
    <Router>
      <nav class="navbar is-white is-fixed-top" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
          <a class="navbar-item" href="#">
            Feed The Hungry
          </a>
          {/* navbar-burger: toggles the navbar menu on touch devices */}
          <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="mainNavbar">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>
        {/* main nagivation bar */}
        <div id="mainNavbar" class="navbar-menu">
          <div class="navbar-start">
            <div class="navbar-item no-left-padding">
              <div class="field is-grouped">
                <p class="control is-expanded no-bottom-margin">
                  <input class="input" type="text" placeholder="Find a food bank"></input>
                </p>
                <p class="control no-bottom-margin">
                  <a class="button is-info">
                    Search
                  </a>
                </p>
              </div>
            </div>
          </div>
          <div class="navbar-end">
            <Link to="/" class="navbar-item ">
              Home
            </Link>
            <div class="navbar-item has-dropdown is-hoverable">
              <a class="navbar-link">
                More
              </a>
              <div class="navbar-dropdown is-right">
                <Link to="/about" class="navbar-item">
                  About
                </Link>
                <a class="navbar-item">
                  Contact
                </a>
                <hr class="navbar-divider"></hr>
                <Link to="/report" class="navbar-item">
                  Report an issue
                </Link>
              </div>
            </div>
            <div class="navbar-item">
              <div class="buttons">
                <a class="button is-primary">
                  Log Out
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>

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
          <About />
        </Route>
        <Route path="/report">
          <Report />
        </Route>
      </Switch>
    </Router>
  );
}
function About(){
  return (
    <div>
      <h1>About</h1>
    <h1>About</h1>
    <h1>About</h1>
    <h1>About</h1>
    <h1>About</h1>
    <h1>About</h1>
    </div>
    

  );
}
function Report(){
  return (
    <div>
      <h1>fad</h1>
    <h1>asdd</h1>
    <h1>Aasdsadt</h1>
    <h1>Aboads</h1>
    <h1>About</h1>
    <h1>About</h1>
    </div>
    

  );
}

export default App;
