import React, {useState} from "react";
import {
  BrowserRouter as Router,
  // Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
  Redirect,
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
import ConfirmationPage from 'pages/Checkout/ConfirmationPage';
import ErrorPage from 'pages/Error/ErrorPage';
import history from 'pages/App/History';
// import hooks
import { BankContext } from 'components/Context/BankContext';
import { OrderContext } from 'components/Context/OrderContext';

function App() {
  const bankAPI = BankAPI();
  const [orderInfo, setOrderInfo] = useState(0);

  return (
 <Router history={history} >
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
          <BanksPage {...bankAPI} />
        </Route>
        <Route exact path={"/banks/:bankId/products"}>
          <BankPage {...bankAPI} />
        </Route>
        <Route exact path="/order/cart">
           <CheckoutPage {...bankAPI} />
        </Route>
        <Route exact path={"/banks/:bankId/products/checkout/confirmation"}>
          <ConfirmationPage />
        </Route>
        <Route path="/404" component={ErrorPage} />
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
