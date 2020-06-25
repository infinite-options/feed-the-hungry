import React, {useState} from 'react';
import { Link, useRouteMatch, useParams, useHistory, withRouter, useLocation } from 'react-router-dom';
import EmptyCartPage from 'pages/Error/EmptyCartPage';
import Carousel from "pages/Checkout/Carousel";
import ScrollToTopOnMount from "utils/Scroll/ScrollToTopOnMount";
import CheckoutForm from "pages/Checkout/CheckoutForm";
import './style.css';

function CheckoutPage({ ...bankAPI }){
    const bankId = Object.keys(window.localStorage)[0];
    const bank = bankAPI.data.length > 0 && bankId ? bankAPI.getBankBy(bankId) : {};
    const items = bankId ? JSON.parse(window.localStorage.getItem(bankId)) : [];
    const [key, setKey] = useState(1);

    window.addEventListener("storage", () => {
        setKey(key + 1);
    });
    if (items.length === 0) return <EmptyCartPage />;
    return (
    <div className="checkout-page">
        <div className="checkout-page-layer">
            <ScrollToTopOnMount />
            <div className="checkout-page-content">
                <div className="checkout-page-title">
                <p className="title is-4">{bank.name}</p>
                </div>
                <div key={key} className="checkout-page-body">
                    <div className="order-items">
                    <Carousel itemList={items} />
                    </div>
                    <div className="order-confirm fade-in-quick">
                        <CheckoutForm bank={bank} items={items} />
                    </div>
                </div>
            </div>
            </div>
      </div>
    );
}
// calculate total $ of order
const totalPrice = (items) => {
    var total = 0;
    items.forEach((x) => {
      total += x.item.price * x.amount;
    });
    return total;
  };
export default CheckoutPage;