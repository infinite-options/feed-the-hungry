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
import './styles.css';
import Banks from './Banks/Banks';
import Bank from './Banks/Bank';
import Header from './Header/Header';
import Cart from './Cart/Cart';
import API from './API/API';
import ScrollToTop from './SrollToTop';

function App(){
  // render(){
    const list = API.DataLoader();
    var banks = [];
    if (list && list.length > 0) {
      banks = API.RemoveDuplicatesBy('inventory_foodbank_id', list);
      banks = API.RemoveNull(banks);
    }
    return (
      <Router onUpdate={() => window.scrollTo(0, 0)}>
        <Header />
        {/* A <Switch> looks through its children <Route>s and
        renders the first one that matches the current URL. */}
        <Switch>
          <Route exact path="/banks">
            <ScrollToTop>
              <Banks list={banks} />
            </ScrollToTop>
            
          </Route>
          <Route path={"/banks/:bankId"}>
            <ScrollToTop>
              <Bank list={banks}/>
            </ScrollToTop>
          </Route>
          <Route path="/cart">
            <Cart />
            {/* <Report /> */}
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
    // }
}


export default App;
