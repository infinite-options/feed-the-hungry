import React, { useState, useEffect, useContext, useRef, useLayoutEffect } from "react";
import useStayScrolled from "react-stay-scrolled";
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

const BankPage = () => {
  console.log("bank page")
  let { bankId } = useParams();
  // const bankData = JSON.parse(window.localStorage.getItem(bankId));
  // if (bankData) return <BankWithoutHook bank={bankData} />
  return <BankWithHook bankId = {bankId}/>
}
const BankWithHook = ({bankId}) => {
  console.log('get bank from api');
  const url = `https://dc3so1gav1.execute-api.us-west-1.amazonaws.com/dev/api/v2/foodbankinfonew/${bankId}`;
  const { data, isLoading, hasError } = useOurApi(url, {});

  if (isLoading) return <LoadingPage />;
  if (hasError || !data.result) return <ErrorPage />;
  window.localStorage.setItem(bankId, JSON.stringify(data.result));
  return <Bank bank = {data.result} />
}

const BankWithoutHook = (data) => {
  console.log('get bank from local storage');
  console.log(data)
  return <Bank bank={data.bank} />
}
const Bank = ({ bank }) => {
  const inventory = bank.inventory? bank.inventory : [];
  const delivery_pickup_items = filterInventoryByKey(inventory, 'delivery_pickup', 'delivery;pickup');
  const delivery_items = filterInventoryByKey(inventory, 'delivery_pickup', 'delivery');
  const pickup_items = filterInventoryByKey(inventory, 'delivery_pickup', 'pickup');
  const orderType = useOrderType(bank); 

  const [key, setKey] = useState(1);
  window.addEventListener("storage", () => {
    setKey(key + 1);
  });
    // keep scroll position on rerender
  const divRef = useRef(null);
  const { stayScrolled } = useStayScrolled(divRef);
  useLayoutEffect(
    () => {
      stayScrolled();
    },
    [bank]
  );

  return (
    <div ref={divRef} className="bank-page-bd">
      {/* <ScrollToTopOnMount /> */}
      <div className="bank-container">
        <BankBanner obj={bank} />
        <BankFilters />
        <div className="bank-body">
          {delivery_pickup_items.length > 0 && (
            <div className="inventory-container">
              <div className="inventory-title-container">
                <p className="subtitle inventory-title">Delivery or Pickup</p>
              </div>
              <BankInventory key={key} inventory={delivery_pickup_items} orderType={orderType}/>
            </div>
          )}
          {delivery_items.length > 0 && (
            <div className="inventory-container">
              <div className="inventory-title-container">
                <p className="subtitle inventory-title">Delivery Only</p>
              </div>
              <BankInventory key={key} inventory={delivery_items} orderType={orderType} />
            </div>
          )}
          {pickup_items.length > 0 && (
            <div className="inventory-container">
              <div className="inventory-title-container">
                <p className="subtitle inventory-title">Pick Up Only</p>
              </div>
              <BankInventory key={key} inventory={pickup_items} orderType={orderType}/>
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
const useOrderType = (bank) => {
  const [foodBank, setFoodBank] = useState(bank);
  const [orderType, setOrderType] = useState("");
  useEffect(() => {
    setOrderType("");
  },[foodBank])
  return {
    orderType,
    setOrderType,
  }
}
const filterInventoryByKey = (arr, key, value) => {
  return arr.filter(x => x[key] === value);
}


export default React.memo(BankPage);
