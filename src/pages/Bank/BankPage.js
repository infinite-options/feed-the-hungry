import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from "react-router-dom";
import "pages/styles.css";
import BankAPI from "API/BankAPI";
import Notifications from "components/Notifications/Notifications";
import BankLayout from "pages/Bank/BankLayout";
import CheckoutPage from "pages/Checkout/CheckoutPage";

function BankPage({ list }) {
  let { bankId } = useParams();
  let { path, url } = useRouteMatch();
  const bank = BankAPI.getBankBy(bankId, list);
  return (

    <div className="bank-page-bd">
    {bank ? (
        <BankLayout obj={bank} />
    ) : (
        Notifications.Warning("Loading Data...")
    )}
    </div>
  );
}

// const useField = (type) => {
//     const [value, setValue] = useState('');
//     const onChange = (event) => {
//         setValue(event.target.value);
//     }
//     return {
//         type,
//         value,
//         onChange
//     }
// }

export default BankPage;
