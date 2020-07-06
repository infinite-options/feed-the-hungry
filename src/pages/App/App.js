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
// import hooks
import { OrderContext } from 'components/Context/OrderContext';
import { usePosition } from 'use-position';
import AuthRoute from 'components/Route/AuthRoute';
import NonAuthRoute from 'components/Route/NonAuthRoute';
// use San Jose, CA as the default center
const DEFAULT_LATITUDE = 37.338208;
const DEFAULT_LONGITUDE = -121.886329;

function App() {
 
  const watch = true;
  const { latitude, longitude, error } = usePosition(watch, {enableHighAccuracy: true});
  const position = !error ? [latitude, longitude] : [DEFAULT_LATITUDE, DEFAULT_LONGITUDE];
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const [cartTotal, setCartTotal] = useState(0);

  console.log("main");
  useEffect(() => {
    onLoad();
    window.addEventListener('storage', onLoad);

    return () => {
      window.removeEventListener('storage', onLoad)
    }
  }, [])

  function onLoad() {
    try {
      if (!isAuth && JSON.parse(window.localStorage.getItem("userInfo"))) {
        console.log("Authenticated");
        setIsAuth(true);
      }
      else if (!JSON.parse(window.localStorage.getItem("userInfo"))) {
        console.log("User is not logged in");
        setIsAuth(false);
      }
    }
    catch (err) {
      console.log(err);
    }
    setLoading(false);
  }

  return !loading && (
    <Router basename={"feed-the-hungry"}>
      <OrderContext.Provider value={{cartTotal, setCartTotal, position, isAuth, setIsAuth}}>
        <Header />
        <Switch>
          <NonAuthRoute exact path="/login" isAuth={isAuth} component={LoginPage} />
          <NonAuthRoute exact path="/signup" isAuth={isAuth} component={SignupPage} />
          {/* <AuthRoute exact path="/" isAuth={isAuth} bankAPI={bankAPI} component={BanksPage} /> */}
          <Route exact path="/"><BanksPage /></Route>
          <NonAuthRoute exact path="/signup/social" isAuth={isAuth} component={SignupSocial} />
          <NonAuthRoute exact path="/signup/verify" isAuth={isAuth} component={SignupVerify} />
          <AuthRoute exact path={"/banks/:bankId/products"} isAuth={isAuth} component={BankPage} />
          <AuthRoute exact path="/order/cart" isAuth={isAuth} component={CheckoutPage} />
          <AuthRoute exact path="/order/cart/confirm" isAuth={isAuth} component={ConfirmationPage} />
          <Route component={ErrorPage} /> 
          <Redirect to="/404" />
        </Switch>
      </OrderContext.Provider>
    </Router>
  );
}

export default App;
