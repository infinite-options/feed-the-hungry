import React, { useState, useEffect, useRef, useLayoutEffect, useContext} from "react";
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
import LoadingInventory from 'pages/Error/LoadingInventory';
import { OrderContext } from "components/Context/OrderContext";

const BankPage = () => {
  let { bankId } = useParams();
  const context = useContext(OrderContext);

  if (context.api.isLoading) return <LoadingPage />;
  if (context.api.hasError) return <ErrorPage />;
  const bank = context.api.getBankBy("foodbank_id", bankId);
  if (!bank) return <ErrorPage />
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
        <div className="bank-inventory">
        <BankFilters />
       
        <div className="container">
        <div key={key} className="bank-body">
          <BankInventory  bank={bank} delivery={1} pickup={1} search={search} orderType={orderType}/>
          <BankInventory  bank={bank} delivery={1} pickup={0} search={search}  orderType={orderType}/>
          <BankInventory  bank={bank} delivery={0} pickup={1} search={search}  orderType={orderType}/>  
        </div>
        <div className="bank-actions">
          {/* <button className="button is-info">
            <span className="icon">
              <FontAwesomeIcon icon={Icons.faLongArrowAltLeft} />
            </span>
            <span>Return to Search Results</span>
          </button> */}
          <Link to="/order/cart">
            <button className="button goto-checkout-btn">
              <span>Checkout Now</span>
              <span className="icon">
                <FontAwesomeIcon icon={Icons.faLongArrowAltRight} />
              </span>
            </button>
          </Link>
        </div>
        </div>
      </div>
    </div>
  );
};

const useOrderType = (bank) => {
  const [orderType, setOrderType] = useState(() => {
    const user = JSON.parse(window.localStorage.getItem('userInfo'));
    if (user.cart !== "" && user.cart.bankId === bank.foodbank_id) {
      return user.cart.order_type;
    }
    return "";
  });

  return {
    orderType,
    setOrderType,
  }
}


export default BankPage;
