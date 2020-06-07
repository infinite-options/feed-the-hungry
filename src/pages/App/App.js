import React from 'react';

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
import Banks from 'pages/Banks/Banks';
import Bank from 'pages/Bank/Bank';
import Header from 'components/Header/Header';
import Cart from 'pages/Cart/Cart';
import BankAPI from 'API/BankAPI';
import ScrollToTop from 'utils/Scroll/SrollToTop';

function App(){
  // render(){
    const list = BankAPI.DataLoader();
    var banks = [];
    if (list && list.length > 0) {
      banks = BankAPI.RemoveDuplicatesBy('foodbank_id', list);
      banks = BankAPI.RemoveNull(banks);
    }
    return (
      <Router>
        <Header />
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
          </Route>
          <Route path="/about">
          </Route>
          <Route path="/report">
          </Route>
        </Switch>
      </Router>
    );
    // }
}


export default App;
