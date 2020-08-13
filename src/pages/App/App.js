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
import DonorNonAuth from 'pages/Donor/DonorNonAuth';
import DonorPage from 'pages/Donor/DonorPage';
import ConfirmationPage from 'pages/Checkout/ConfirmationPage';
import ErrorPage from 'pages/Error/ErrorPage';
import LoadingPage from 'pages/Error/LoadingPage';
import HomePage from 'pages/Home/HomePage';
import Footer from 'components/Footer/Footer';
import ScrollToTop from 'utils/Scroll/SrollToTop';
// import hooks
import { OrderContext } from 'components/Context/OrderContext';
import AuthRoute from 'components/Route/AuthRoute';
import NonAuthRoute from 'components/Route/NonAuthRoute';
import { useOurApi } from 'API/useOurApi';
// use San Jose, CA as the default center

function App() {
  const watch = false;
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const [orderTotal, setOrderTotal] = useState(() => {
    const user = JSON.parse(window.localStorage.getItem('userInfo'));
    return user && user.cart !== "" ? user.cart.total : 0;
  });
 const [orderType, setOrderType] = useState("");
  const url = `https://dc3so1gav1.execute-api.us-west-1.amazonaws.com/dev/api/v2/foodbanks`;
  const api = useOurApi(url, {});

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
    <Router basename={"feed-the-hungry"} onUpdate={() => window.scrollTo(0, 0)}>
        {/* <ScrollToTop /> */}
      <OrderContext.Provider value={{ isAuth, setIsAuth, api, orderTotal, setOrderTotal, orderType, setOrderType}}>
        <Header />
        <Switch>
          <NonAuthRoute exact path="/login" component={LoginPage} />
          <NonAuthRoute exact path="/signup" component={SignupPage} />
          {/* <AuthRoute exact path="/" bankAPI={bankAPI} component={BanksPage} /> */}
          <NonAuthRoute exact path="/donateform" component={DonorNonAuth} />
          <AuthRoute exact path="/donate" component={DonorPage} />
          {/* <Route exact path="/banks"><BanksPage api={bankApi} /></Route> */}
          <Route exact path="/banks" component={BanksPage}></Route>
          <Route exact path="/" component={HomePage}></Route>
          <Route exact path="/loading" component={LoadingPage} /> 
          <NonAuthRoute exact path="/signup/social" component={SignupSocial} />
          <NonAuthRoute exact path="/signup/verify" component={SignupVerify} />
          <AuthRoute exact path={"/banks/:bankId/products"} component={BankPage}></AuthRoute>
          <AuthRoute exact path="/order/cart" component={CheckoutPage}></AuthRoute>
          <AuthRoute exact path="/order/cart/confirm" component={ConfirmationPage} />
          <Route component={ErrorPage} /> 
          <Redirect to="/404" />
        </Switch>
        <Footer />
      </OrderContext.Provider>

    </Router>
  );
}

export default App;
