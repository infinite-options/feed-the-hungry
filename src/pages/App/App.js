import React, {useState, useEffect} from "react";
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
import CheckoutPage from "pages/Checkout/CheckoutPage";
import LoginPage from 'pages/Login/LoginPage';
import SignupPage from 'pages/Signup/SignupPage';
import SignupSocial from 'pages/Signup/SignupSocial';
import SignupVerify from 'pages/Signup/SignupVerify';
import DonorPage from 'pages/Donor/DonorPage';
import ConfirmationPage from 'pages/Checkout/ConfirmationPage';
import ErrorPage from 'pages/Error/ErrorPage';
import HomePage from 'pages/Home/HomePage';
// import hooks
import { OrderContext } from 'components/Context/OrderContext';
import { usePosition } from 'use-position';
import AuthRoute from 'components/Route/AuthRoute';
import NonAuthRoute from 'components/Route/NonAuthRoute';
// use San Jose, CA as the default center
const DEFAULT_LATITUDE = 37.338208;
const DEFAULT_LONGITUDE = -121.886329;

function App() {
  const watch = false;
  const { latitude, longitude, error } = usePosition(watch, {enableHighAccuracy: true});
  const position = latitude && longitude ? [latitude, longitude]: [DEFAULT_LATITUDE, DEFAULT_LONGITUDE];
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const [cartTotal, setCartTotal] = useState(0);

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
          <NonAuthRoute exact path="/login" component={LoginPage} />
          <NonAuthRoute exact path="/signup" component={SignupPage} />
          {/* <AuthRoute exact path="/" bankAPI={bankAPI} component={BanksPage} /> */}
<<<<<<< HEAD
          <NonAuthRoute exact path="/donate" component={DonorPage} />
          <Route exact path="/"><BanksPage /></Route>
=======
          <Route exact path="/banks"><BanksPage /></Route>
          <Route exact path="/"><HomePage /></Route>
>>>>>>> 7252634cea96ce07770a5eee9f30131ac7454ca5
          <NonAuthRoute exact path="/signup/social" component={SignupSocial} />
          <NonAuthRoute exact path="/signup/verify" component={SignupVerify} />
          <AuthRoute exact path={"/banks/:bankId/products"} component={BankPage} />
          <AuthRoute exact path="/order/cart" component={CheckoutPage} />
          <AuthRoute exact path="/order/cart/confirm" component={ConfirmationPage} />
          <Route component={ErrorPage} /> 
          <Redirect to="/404" />
        </Switch>
      </OrderContext.Provider>
    </Router>
  );
}

export default App;
