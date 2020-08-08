import React, { useState, useEffect, useRef, useLayoutEffect} from "react";
import useStayScrolled from "react-stay-scrolled";
import {
  BrowserRouter as Router,
  Link,
  useParams,
  useLocation, 
  useRouteMatch
} from "react-router-dom";
import "pages/styles.css";
import LoadingPage from "pages/Error/LoadingPage";
import { useOurApi } from "API/useOurApi";
import ErrorPage from "pages/Error/ErrorPage";
import ScrollToTop from 'utils/Scroll/SrollToTop';
import ScrollToTopOnMount from 'utils/Scroll/ScrollToTopOnMount';
import BankInventory from "pages/Bank/BankInventory";
import BankBanner from "pages/Bank/BankBanner";
import BankFilters from "pages/Bank/BankFilters";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Icons from "components/Icons/Icons";
import useQuery from "components/Hooks/useQuery";
const BankPage = ({api}) => {
  let { bankId } = useParams();
  // const fetchedData = useOurApi('https://dc3so1gav1.execute-api.us-west-1.amazonaws.com/dev/api/v2/foodbanks', {});

  if (api.isLoading) return <LoadingPage />;
  if (api.hasError || !api.data.result.result) return <ErrorPage />;
  const bank = api.getBankBy("foodbank_id", bankId);
  return <Bank bank = {bank}/>
}

const Bank = ({ bank }) => {
  const orderType = useOrderType(bank); 
  const [key, setKey] = useState(1);
  window.addEventListener("storage", () => {
    setKey(key + 1);
  });

    // keep scroll position on rerender
  // const divRef = useRef(null);
  // const { stayScrolled } = useStayScrolled(divRef);
  // useLayoutEffect(
  //   () => {
  //     stayScrolled();
  //   },
  //   [bank]
  // );

  let query = useQuery();
  const search =  query.get('search') ? '&' +  query.get('search').replace(/ /g,'&') : '' ;

  return (
    <div className="bd-main is-fullheight-with-navbar">
      <ScrollToTopOnMount/>
    
        <BankBanner obj={bank} />
        <div className="container">
        <BankFilters />
        <div key={key} className="bank-body">
          <BankInventory  bank={bank} delivery={1} pickup={1} orderType={orderType} search={search}/>
          <BankInventory  bank={bank} delivery={1} pickup={0}  orderType={orderType} search={search}/>
          <BankInventory  bank={bank} delivery={0} pickup={1}  orderType={orderType} search={search}/>
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
