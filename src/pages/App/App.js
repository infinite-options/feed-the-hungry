import React, {useState} from "react";
// import { Router } from 'react-router';
import {
  BrowserRouter as Router,
  // Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
  Redirect,
  withRouter
} from "react-router-dom";
// import bulma and other css styles
import "bulma/css/bulma.css";
import "./App.css";
// import components
import BanksPage from "pages/Banks/BanksPage";
import BankPage from "pages/Bank/BankPage";
import Header from "components/Header/Header";
import BankAPI from "API/BankAPI";
import CheckoutPage from "pages/Checkout/CheckoutPage";
import LoginPage from 'pages/Login/LoginPage';
import SignupPage from 'pages/Signup/SignupPage';
import SignupSocial from 'pages/Signup/SignupSocial';
import SignupVerify from 'pages/Signup/SignupVerify';
import ConfirmationPage from 'pages/Checkout/ConfirmationPage';
import ErrorPage from 'pages/Error/ErrorPage';
import history from 'pages/App/History';
// import hooks
import { useCoordinates } from 'components/Hooks/useCoordinates';
import { OrderContext } from 'components/Context/OrderContext';

function App() {
  const [orderInfo, setOrderInfo] = useState(0);
  console.log("app");
  return (
 <Router>
    <OrderContext.Provider value={[orderInfo, setOrderInfo]}>
      <Header />
      <Switch>
        <Route exact path="/login">
          <LoginPage />
        </Route>
        <Route exact path="/signup">
          <SignupPage />
        </Route>
        <Route exact path="/">
          <BanksPage />
          </Route>
        <Route exact path="/signup/social">
          <SignupSocial />
        </Route>
        <Route exact path="/signup/verify">
          <SignupVerify /> 
        </Route>
        <Route exact path={"/banks/:bankId/products"}>
          <BankPage />
        </Route>
        <Route exact path="/order/cart">
           <CheckoutPage />
        </Route>
        <Route exact path="/order/cart/confirm">
          <ConfirmationPage />
        </Route>
        <Route component={ErrorPage} /> 
        <Redirect to="/404" />
      </Switch>
      </OrderContext.Provider>
    </Router>
  );
}

export default App;
