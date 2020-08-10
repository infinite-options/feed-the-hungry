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
  const inventory = useOurApi(`https://dc3so1gav1.execute-api.us-west-1.amazonaws.com/dev/api/v2/inventory_filter/${bank.foodbank_id}`,{});

  if (inventory.hasError) return <ErrorPage />

  return (
    <div className="bd-main is-fullheight-with-navbar">
      <ScrollToTopOnMount/>
        <BankBanner obj={bank} />
        <BankFilters />
        <div className="container">
        {inventory.data.result && inventory.data.result.result.length > 0 ? 
        <div key={key} className="bank-body">
          <BankInventory  bank={bank} delivery={1} pickup={1} orderType={orderType} search={search}/>
          <BankInventory  bank={bank} delivery={1} pickup={0}  orderType={orderType} search={search}/>
          <BankInventory  bank={bank} delivery={0} pickup={1}  orderType={orderType} search={search}/>  
        </div>
        : <div className="no-product">
          <p className="is-Nunito is-6">This food pantry does not have any product at the moment.</p></div>}
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
  const [orderType, setOrderType] = useState(() => {
    const user = JSON.parse(window.localStorage.getItem('userInfo'));
    if (user.cart !="" && user.cart.bankId === bank.foodbank_id) {
      return user.cart.order_type;
    }
    return "";
  });
  // useEffect(() => {
  //   setOrderType("");
  // },[foodBank])
  return {
    orderType,
    setOrderType,
  }
}


export default React.memo(BankPage);
