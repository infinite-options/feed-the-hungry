import React, { useState, useEffect, useContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from "react-router-dom";
import "pages/styles.css";
import LoadingPage from "pages/Error/LoadingPage";
import { useOurApi } from "API/useOurApi";
import ErrorPage from "pages/Error/ErrorPage";
import BankInventory from "pages/Bank/BankInventory";
import BankBanner from "pages/Bank/BankBanner";
import BankFilters from "pages/Bank/BankFilters";
import ScrollToTopOnMount from "utils/Scroll/ScrollToTopOnMount";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Icons from "components/Icons/Icons";


function BankPage() {
  let { bankId } = useParams();
  const url = `https://dc3so1gav1.execute-api.us-west-1.amazonaws.com/dev/api/v2/foodbankinfonew/${bankId}`;
  return <Bank bankUrl={url} />;
}

const Bank = ({ bankUrl }) => {
  const { data, isLoading, hasError } = useOurApi(bankUrl, {});
  const [key, setKey] = useState(1);
  window.addEventListener("storage", () => {
    setKey(key + 1);
  });

  if (isLoading) return <LoadingPage />;
  if (hasError || !data.result) return <ErrorPage />;

  const bank = data.result;
  const delivery_pickup_items = bank.inventory.filter((x) =>
    x.delivery_pickup.includes("both")
  );
  const delivery_items = bank.inventory.filter((x) =>
    x.delivery_pickup.includes("delivery")
  );
  const pickup_items = bank.inventory.filter((x) =>
    x.delivery_pickup.includes("pickup")
  );
  return (
    <div className="bank-page-bd">
      <ScrollToTopOnMount />
      <div className="bank-container">
        <BankBanner obj={bank} />
        <BankFilters />
        <div className="bank-body">
          {delivery_pickup_items.length > 0 && (
            <div className="inventory-container">
              <div className="inventory-title-container">
                <p className="subtitle inventory-title">Delivery or Pickup</p>
              </div>
              <BankInventory key={key} inventory={delivery_pickup_items} />
            </div>
          )}
          {delivery_items.length > 0 && (
            <div className="inventory-container">
              <div className="inventory-title-container">
                <p className="subtitle inventory-title">Delivery Only</p>
              </div>
              <BankInventory key={key} inventory={delivery_items} />
            </div>
          )}
          {pickup_items.length > 0 && (
            <div className="inventory-container">
              <div className="inventory-title-container">
                <p className="subtitle inventory-title">Pick Up Only</p>
              </div>
              <BankInventory key={key} inventory={pickup_items} />
            </div>
          )}
        </div>
        <div className="bank-actions">
          <button className="button is-info">
            <span className="icon">
              <FontAwesomeIcon icon={Icons.faLongArrowAltLeft} />
            </span>
            <span>Return to Search Results</span>
          </button>
          <Link to="/order/cart">
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
  );
};

export default BankPage;
