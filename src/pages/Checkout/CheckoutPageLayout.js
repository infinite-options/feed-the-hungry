import React, { useState } from "react";
import Carousel from "pages/Checkout/Carousel";
import ScrollToTopOnMount from "utils/Scroll/ScrollToTopOnMount";
import Notifications from "components/Notifications/Notifications";
import Icons from "components/Icons/Icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CheckoutPickup from 'pages/Checkout/CheckoutPickup';
import CheckoutDelivery from 'pages/Checkout/CheckoutDelivery';

function CheckoutPageLayout({ obj }) {
  
  const [key, setKey] = useState(1);
  window.addEventListener("storage", () => {
    setKey(key + 1);
  });
  const items = JSON.parse(window.localStorage.getItem(obj.id)) || [];
  return (
    <div className="checkout-page-layer">
      <ScrollToTopOnMount />
      <div className="checkout-page-content">
        <div className="checkout-page-title">
          <p className="title is-4">{obj.name}</p>
        </div>
        {items.length === 0 ? (
          Notifications.IsEmpty("Your cart is empty")
        ) : (
          <div key={key} className="checkout-page-body">
            <div className="order-items">
              <Carousel obj={obj} />
            </div>
            <div className="order-confirm fade-in-quick">
              <CheckoutPickup obj={obj} />
              <CheckoutDelivery />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CheckoutPageLayout;
