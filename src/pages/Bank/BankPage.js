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
import { useOurApi } from 'API/useOurApi';
import ErrorPage from "pages/Error/ErrorPage";
import BankInventory from "pages/Bank/BankInventory";
import BankBanner from "pages/Bank/BankBanner";
import BankFilters from "pages/Bank/BankFilters";
import ScrollToTopOnMount from "utils/Scroll/ScrollToTopOnMount";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Icons from "components/Icons/Icons";

function BankPage() {
  console.log("bank page");
  let { bankId } = useParams();
  let { path, url } = useRouteMatch();
  const bank_url = `https://dc3so1gav1.execute-api.us-west-1.amazonaws.com/dev/api/v2/foodbankinfonew/${bankId}`;
  const { data, isLoading, hasError } = useOurApi(bank_url);
  const bank = Object.keys(data).length ? data.result : {};

  const [key, setKey] = useState(1);
  window.addEventListener("storage", () => {
    setKey(key + 1);
  });

  if (isLoading) return <LoadingPage />
  if (hasError || !Object.keys(bank).length ) return <ErrorPage />
 
  return (
    <div className="bank-page-bd"> 
      <ScrollToTopOnMount />
      <div className="bank-container">
        <BankBanner obj={bank} />
        <BankFilters bankUrl={url} />
        <div className="bank-body">
          <div className="columns">
            <div className="column is-6 item-column">
              <div className="inventory-title-container">
                <p className="subtitle inventory-title">Delivery or Pickup</p>
              </div>
              <BankInventory
                key={key}
                inventory={bank.inventory}
                deliveryOrPickup={"both;pickup"}
      
              />
            </div>
            <div className="column is-6 item-column">
              <div className="inventory-title-container">
                <p className="subtitle inventory-title">Delivery Only</p>
              </div>
              <BankInventory
                key={key}
                inventory={bank.inventory}
                deliveryOrPickup="delivery"
              />
            </div>
          </div>
        </div>
        <div className="bank-actions">
          <button className="button is-info">
            <span className="icon">
              <FontAwesomeIcon icon={Icons.faLongArrowAltLeft} />
            </span>
            <span>Return to Search Results</span>
          </button>
          <Link
            to="/order/cart"
          >
            <button className="button is-success">
              <span>Checkout Now</span>
              <span className="icon">
                <FontAwesomeIcon icon={Icons.faLongArrowAltRight} />
              </span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  )

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
