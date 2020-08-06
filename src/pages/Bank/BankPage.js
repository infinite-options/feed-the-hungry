import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import useStayScrolled from "react-stay-scrolled";
import {
  BrowserRouter as Router,
  Link,
  useParams,
} from "react-router-dom";
import "pages/styles.css";
import LoadingPage from "pages/Error/LoadingPage";
import { useOurApi } from "API/useOurApi";
import ErrorPage from "pages/Error/ErrorPage";
import BankInventory from "pages/Bank/BankInventory";
import BankBanner from "pages/Bank/BankBanner";
import BankFilters from "pages/Bank/BankFilters";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Icons from "components/Icons/Icons";

const BankPage = () => {
  let { bankId } = useParams();
  const fetchedData = useOurApi('https://dc3so1gav1.execute-api.us-west-1.amazonaws.com/dev/api/v2/foodbanks', {});

  if (fetchedData.isLoading) return <LoadingPage />;
  if (fetchedData.hasError || !fetchedData.data.result.result) return <ErrorPage />;
  const bank = fetchedData.getBankBy("foodbank_id", bankId);
  return <Bank bank = {bank}/>
}

const Bank = ({ bank}) => {
  // const inventory = bank.inventory? bank.inventory : [];
  // const delivery_pickup_items = filterInventoryByKey(inventory, 'delivery', 0);
  // const delivery_items = filterInventoryByKey(inventory, 'delivery', 1);
  // const pickup_items = filterInventoryByKey(inventory, 'pickup', 1);
  // const delivery_pickup_items = useOurApi(`https://dc3so1gav1.execute-api.us-west-1.amazonaws.com/dev/api/v2/inventory_filter/${bank.foodbank_id}?delivery=1&pickup=1`,{});
  // const delivery_items = useOurApi(`https://dc3so1gav1.execute-api.us-west-1.amazonaws.com/dev/api/v2/inventory_filter/${bank.foodbank_id}?delivery=1&pickup=0`,{});
  // const pickup_items = useOurApi(`https://dc3so1gav1.execute-api.us-west-1.amazonaws.com/dev/api/v2/inventory_filter/${bank.foodbank_id}?delivery=0&pickup=1`,{})
  const orderType = useOrderType(bank); 

  const [key, setKey] = useState(1);
  window.addEventListener("storage", () => {
    setKey(key + 1);
  });
  // if (delivery_pickup_items.isLoading || delivery_items.isLoading || pickup_items.isLoading) return <LoadingPage />;
  // if (delivery_pickup_items.hasError || delivery_items.hasError || pickup_items.hasError) return <ErrorPage />;
  

    // keep scroll position on rerender
  // const divRef = useRef(null);
  // const { stayScrolled } = useStayScrolled(divRef);
  // useLayoutEffect(
  //   () => {
  //     stayScrolled();
  //   },
  //   [bank]
  // );

  return (
    <div className="bd-main is-fullheight-with-navbar">
      {/* <ScrollToTopOnMount /> */}
    
        <BankBanner obj={bank} />
        <div className="container">
        <BankFilters />
        <div key={key} className="bank-body">
          <BankInventory  bank={bank} delivery={1} pickup={1} orderType={orderType}/>
          {/* {delivery_pickup_items.data.result.result.length > 0 && (
            <div className="inventory-container">
              <div className="inventory-title-container">
                <p className="subtitle inventory-title">Delivery or Pickup</p>
              </div>
              <BankInventory key={key} bank={bank} inventory={delivery_pickup_items.data.result.result} filter="delivery=1&pickup=1" orderType={orderType}/>
            </div>
          )} */}
          <BankInventory  bank={bank} delivery={1} pickup={0}  orderType={orderType}/>
          {/* {delivery_items.data.result.result.length > 0 && (
            <div className="inventory-container">
              <div className="inventory-title-container">
                <p className="subtitle inventory-title">Delivery Only</p>
              </div>
              <BankInventory key={key} inventory={delivery_items.data.result.result} orderType={orderType} />
            </div>
          )} */}
          <BankInventory  bank={bank} delivery={0} pickup={1}  orderType={orderType}/>
          {/* {pickup_items.data.result.result.length > 0 && (
            <div className="inventory-container">
              <div className="inventory-title-container">
                <p className="subtitle inventory-title">Pick Up Only</p>
              </div>
              <BankInventory key={key} inventory={pickup_items.data.result.result} orderType={orderType}/>
            </div>
          )} */}
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
const getBankById = (data, id) => {
    return (data.find(obj => {
        return obj.id === id;
    }));
}


export default React.memo(BankPage);
