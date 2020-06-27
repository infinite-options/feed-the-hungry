import React, {useState, useEffect} from "react";
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
import { BankContext } from 'components/Context/BankContext';
import { OrderContext } from 'components/Context/OrderContext';

import AuthRoute from 'components/Route/AuthRoute';
import NonAuthRoute from 'components/Route/NonAuthRoute';

function App() {
  const bankAPI = BankAPI();
  const [orderInfo, setOrderInfo] = useState(0);
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    onLoad();
  }, [])

  function onLoad() {
    try {
      if (!isAuth && JSON.parse(window.localStorage.getItem("userInfo"))) {
        console.log("Authenticated");
        setIsAuth(true);
      }
    }
    catch (err) {
      console.log(err);
    }
    setLoading(false);
  }

  return !loading && (
    <Router>
      <OrderContext.Provider value={{orderInfo, setOrderInfo, isAuth, setIsAuth}}>
        <Header />
        <Switch>
          <NonAuthRoute exact path="/login" restricted={true} isAuth={isAuth} component={LoginPage} />
          <NonAuthRoute exact path="/signup" restricted={true} isAuth={isAuth} component={SignupPage} />
          {/* <AuthRoute exact path="/" isAuth={isAuth} bankAPI={bankAPI} component={BanksPage} /> */}
          <Route exact path="/"><BanksPage {...bankAPI} /></Route>
          <NonAuthRoute exact path="/signup/social" restricted={true} isAuth={isAuth} component={SignupSocial} />
          <NonAuthRoute exact path="/signup/verify" restricted={true} isAuth={isAuth} component={SignupVerify} />
          <AuthRoute exact path={"/banks/:bankId/products"} isAuth={isAuth} bankAPI={bankAPI} component={BankPage} />
          <AuthRoute exact path="/order/cart" isAuth={isAuth} bankAPI={bankAPI} component={CheckoutPage} />
          <AuthRoute exact path="/order/cart/confirm" isAuth={isAuth} bankAPI={bankAPI} component={ConfirmationPage} />
          <Route component={ErrorPage} /> 
          <Redirect to="/404" />
        </Switch>
      </OrderContext.Provider>
    </Router>
  );
}
const useOrder = () => {
  const default_order = 
  {
    customer_id: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    totalAmount: "",
    delivery_note: "",
    kitchen_id: "",
    longitude: "",
    latitude: "",
    delivery_date: "",
    ordered_items: []
  };

  const [ orderInfo, setOrderInfo ] = useState(default_order);
  return {
    orderInfo,
    setOrderInfo
  }
}

export default App;
