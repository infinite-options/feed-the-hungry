import React, {useState} from "react";
import {
  // BrowserRouter as Router,
  Router,
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
import history from 'pages/App/History';

function App() {
  // fetch data
  const list = BankAPI.DataLoader();
  var banks = [];
  // check if data exists
  if (list && list.length > 0) {
    banks = BankAPI.RemoveNull(list); // replace all null fields with "N/A"
    banks = BankAPI.RemoveDuplicatesBy("foodbank_id", banks); // merge objects with the same foodbank_id into 1
  }
  const order = useOrder();
  return (
 <Router history={history}>
      <Header />
      <Switch>
      <Route exact path="/">
      <BanksPage list={banks} />
        </Route>
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
          <BankPage list={banks} />
        </Route>
        <Route exact path={"/banks/:bankId/products/checkout"}>
          <CheckoutPage list={banks} order={order} />
        </Route>
        <Route exact ={"/banks/:bankId/products/checkout/confirmation"}>
          <ConfirmationPage list={banks} order={order} />
        </Route>
        <Route path="/about"></Route>
        <Route path="/report"></Route>
      </Switch>
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
