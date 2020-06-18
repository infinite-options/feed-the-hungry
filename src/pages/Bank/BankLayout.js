import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useLocation,
  useParams,
} from "react-router-dom";
import BankAPI from "API/BankAPI";
import BankInventory from "pages/Bank/BankInventory";
import BankBanner from "pages/Bank/BankBanner";
import BankFilters from "pages/Bank/BankFilters";
import ScrollToTopOnMount from "utils/Scroll/ScrollToTopOnMount";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Icons from 'components/Icons/Icons';
import { faWindowRestore } from "@fortawesome/free-solid-svg-icons";
function BankLayout({ obj }) {
  let { path, url } = useRouteMatch();
  const [key, setKey] = useState(1);
  window.addEventListener("storage", () => {
    setKey(key + 1);
  })

//   const cart = useCart(obj);
  return (
    <div className="bank-page-bd">
      <ScrollToTopOnMount />
      <div className="bank-container">
        <BankBanner obj={obj} />
        <BankFilters bankUrl={url} />
        <div className="bank-body">
          <div className="columns">
            <div className="column is-6">
              <div className="inventory-title-container">
                <p className="subtitle inventory-title">Delivery or Pickup</p>
              </div>
              <BankInventory
              key={key}
              obj={obj}
              deliveryOrPickup={"both;pickup"}
              bankUrl={url}
              />
         
            </div>
            <div className="column is-6">
              <div className="inventory-title-container">
                <p className="subtitle inventory-title">Delivery Only</p>
              </div>
              <BankInventory
              key={key}
              obj={obj}
              deliveryOrPickup="delivery"
              bankUrl={url}
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
            <Link to={`${url}/checkout`} >
                <button className="button is-success" >
                  <span className="icon">
                      <FontAwesomeIcon icon={Icons.faLongArrowAltRight} />
                  </span>
                  <span>Checkout Now</span>
                </button>
            </Link>
          </div>
      </div>
    </div>
  );
}

const useCart = (obj) => {
    const myOrder = {
};
    var items = JSON.parse(window.localStorage.getItem(obj.id)) || {};
    Object.keys(obj.inventory).map(foodId => {
        myOrder[foodId] = items[foodId] || 0;
    })
    const [order, setOrder] = useState(myOrder);
    const increaseItemValue = (foodId) => {
        var value = order[foodId];
        if (value === obj.inventory[foodId].quantity) value = 10;
        else value = value + 1;
        setOrder(prevState => ({
            ...prevState,
            [foodId]:value
        }));
    };
    const decreaseItemValue = (foodId) => {
        var value = order[foodId];
        if (value === 0) value = 0;
        else value -=1;
        setOrder(prevState => ({
            ...prevState,
            [foodId]:value
        }));
    };
    const getItemValue = (foodId) => {
        return order[foodId];
    }
    useEffect(()=> {
        window.localStorage.setItem(obj.id, JSON.stringify(order));
    },[order])
    return {
        order,
        increaseItemValue,
        decreaseItemValue,
        getItemValue
    };
}

export default BankLayout;
