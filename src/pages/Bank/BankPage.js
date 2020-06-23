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
import LoadingPage from 'pages/Error/LoadingPage';
import BankLayout from "pages/Bank/BankLayout";

function BankPage({ ...bankAPI}) {
  let { bankId } = useParams();
  const bank = bankAPI.getBankBy(bankId);
  if (bank) 
  return (
    <div className="bank-page-bd"> <BankLayout obj={bank} /></div>
  )
  return <LoadingPage />
  // return (

  //   <div className="bank-page-bd">
  //   {bank ? (
  //       <BankLayout obj={bank} />
  //   ) : (
  //       Notifications.Warning("Loading Data...")
  //   )}
  //   </div>
  // );
}

export default BankPage;
