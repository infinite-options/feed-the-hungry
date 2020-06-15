import React from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from "react-router-dom";

// import css
<<<<<<< HEAD
import 'bulma/css/bulma.css'; 
import './App.css';
import BanksPage from 'pages/Banks/BanksPage';
import BankPage from 'pages/Bank/BankPage';
import Header from 'components/Header/Header';
import Cart from 'pages/Cart/Cart';
import BankAPI from 'API/BankAPI';
import CheckoutPage from 'pages/Checkout/CheckoutPage';
import LoginPage from 'pages/Login/LoginPage';
import SignupPage from 'pages/Signup/SignupPage';

function App(){
  // render(){
    const list = BankAPI.DataLoader();
    var banks = [];
    if (list && list.length > 0) {
      banks = BankAPI.RemoveNull(list);
      banks = BankAPI.RemoveDuplicatesBy('foodbank_id', banks);
    }
    return (
      <Router>
        <Header />
        <Switch>
          <Route exact path="/login">
              <LoginPage />
          </Route>
          <Route exact path="/signup">
              <SignupPage />
          </Route>
          <Route exact path="/banks">
              <BanksPage list={banks} />
          </Route>
          <Route exact path={"/banks/:bankId/products"}>
            <BankPage list={banks}/>
          </Route>
          <Route exact path={"/banks/:bankId/products/checkout"}>
            <CheckoutPage list={banks}/>
          </Route>
          <Route path="/about">
          </Route>
          <Route path="/report">
          </Route>
        </Switch>
      </Router>
    );
    // }
=======
import "bulma/css/bulma.css";
import "./App.css";
// import components
import BanksPage from "pages/Banks/BanksPage";
import BankPage from "pages/Bank/BankPage";
import Header from "components/Header/Header";
import BankAPI from "API/BankAPI";
import CheckoutPage from "pages/Checkout/CheckoutPage";

function App() {
  // fetch data
  const list = BankAPI.DataLoader();
  var banks = [];
  // check if data exists
  if (list && list.length > 0) {
    banks = BankAPI.RemoveNull(list); // replace all null fields with "N/A"
    banks = BankAPI.RemoveDuplicatesBy("foodbank_id", banks); // merge objects with the same foodbank_id into 1
  }
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/banks">
          <BanksPage list={banks} />
        </Route>
        <Route exact path={"/banks/:bankId/products"}>
          <BankPage list={banks} />
        </Route>
        <Route exact path={"/banks/:bankId/products/checkout"}>
          <CheckoutPage list={banks} />
        </Route>
        <Route path="/about"></Route>
        <Route path="/report"></Route>
      </Switch>
    </Router>
  );
>>>>>>> 2cf95ba0c7efb062599aae9235fb202b6a0fe14f
}

export default App;
