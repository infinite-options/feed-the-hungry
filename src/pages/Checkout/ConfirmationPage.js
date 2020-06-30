import React, { useState, useEffect, useContext } from "react";

import { Redirect, useParams, withRouter } from "react-router-dom";
import ErrorPage from "pages/Error/ErrorPage";
import LoadingPage from "pages/Error/LoadingPage";
import axios from "axios";
import FailedOrderPage from "pages/Error/FailedOrderPage";
import { OrderContext } from "components/Context/OrderContext";
import { useOurApi } from "API/useOurApi";

function ConfirmationPage() {
  console.log("confirm page");
  const unconfirmed_order = JSON.parse(window.localStorage.getItem("unconfirmed_order")) || {};
  const cartItems = unconfirmed_order.ordered_items
    ? unconfirmed_order.ordered_items
    : [];
  if (cartItems.length === 0) return <ErrorPage />;
  else {
    const order = {
      customer_id: unconfirmed_order.customer_id,
      phone: unconfirmed_order.phone,
      street: unconfirmed_order.street,
      city: unconfirmed_order.city,
      state: unconfirmed_order.state,
      zipcode: unconfirmed_order.zipcode,
      totalAmount: unconfirmed_order.totalAmount,
      delivery_note: "",
      kitchen_id: unconfirmed_order.kitchen_id,
      longitude: unconfirmed_order.longitude,
      latitude: unconfirmed_order.latitude,
      delivery_date: unconfirmed_order.delivery_date,
      order_type: unconfirmed_order.order_type,
      ordered_items: [],
    };
    cartItems.forEach((x) =>
      order.ordered_items.push({ meal_id: x.info.food_id, qty: x.amount })
    );
    console.log(order);

    return (
      <Confirmation
        initialUrl="https://dc3so1gav1.execute-api.us-west-1.amazonaws.com/dev/api/v2/add_order"
        unconfirmed_order={unconfirmed_order}
        order={order}
      />
    );
  }
}

//  WRITE DATA TO API
// the reason why we have to make a separate Confirmation component for the state variables
// is to prevent them from re-rendering the entire ConfirmationPage
// ('url', 'sentOrder', etc will trigger re-render, so if you move all these hooks to ConfirmationPage, 
// they will cause the page to render infinitely!!!! that is very bad since that will cause the axios to fire infinitely,
// resulting in a ton of similar rows of data in the db !!!)

// params: 'order' is the data that will be written to the db, while 'sentOrder' will be written into localStorage
const Confirmation = ({ initialUrl, unconfirmed_order, order }) => {
  const [url, setUrl] = useState(initialUrl);
  const [sentOrder, setSentOrder] = useState(unconfirmed_order);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasErrror] = useState(false);
  const context = useContext(OrderContext);

  useEffect(() => {
    const writeData = async () => {
      try {
        setIsLoading(true)
        const response = await axios.post(url, order);
        const responseData = await response.data;
        // once axios's POST method is called, we update sentOrder
        // so that we know it has already been written to the db.
        window.localStorage.removeItem("cart"); // remove cart data from local storage
        context.setOrderInfo(0);
        setSentOrder(prevState => ({...prevState, isSent: true, order_id: responseData.result.order_id}));
      } catch (err) {
        console.log(err);
        setHasErrror(true);
      } finally {
        setIsLoading(false);
        // ???
      }
    };
    
    if (!sentOrder.isSent) writeData(); // if data is already written to the db, we don't call axios.
  }, [url]);
  
  window.localStorage.setItem("unconfirmed_order", JSON.stringify(sentOrder));
  if (isLoading) return <LoadingPage />
  if (hasError) return <FailedOrderPage />

  return (
    <div className="confirmation-page">
      <div className="confirmation-page-layer">
        <div className="confirmation-page-content">
          <div className="confirmation-page-title">
            <p className="title is-3">{sentOrder.kitchen_name}</p>
          </div>
          <div className="space-2-5"></div>
          <div className="confirmation-page-body">
            <div className="columns">
              <div className="column is-7">
                <div className="confirm-order-container">
                  <p className="title is-6">Your order has been placed</p>
                  <p className="title is-6">Confirmation number: {sentOrder.order_id} </p>
                  <p className="subtitle is-6">
                    A confirmation email has been sent to{" "}
                    {sentOrder.email}
                  </p>
                  <p className="subtitle is-6">
                    Click <a href="#">here</a> to resend confirmation email
                  </p>
                  <div className="divider"></div>
                  <div className="columns">
                    <div className="column is-4">
                      <p className="subtitle is-6">
                        Delivery confirmed for: {sentOrder.date}
                      </p>
                      {/* <br></br> */}
                     <p className="subtitle is-6"> {order.order_type === "delivery" ? "Delivery address" : "Pickup address"}:</p>
                    </div>
                    
                    <div className="column is-8">
                    <p className="subtitle is-6">
                        {sentOrder.delivery_date}
                      </p>
                    {sentOrder.order_type === "delivery" ?
                      <div>
                      {/* <br></br> */}
                      <p className="subtitle is-6">
                        {sentOrder.street}
                      </p>
                      {/* <br></br> */}
                      <p className="subtitle is-6">
                        {sentOrder.city}, {sentOrder.state}{" "}
                        {sentOrder.zipcode}
                      </p></div>
                    :  <p className="subtitle is-6">{sentOrder.kitchen_address}</p>}
                    </div>
                    
                  </div>
                </div>
              </div>
              <div className="column is-5">
                <div className="total-order-container">
                  {sentOrder.ordered_items.map((x) => (
                    <div key={x.info.food_id} className="card cart-item">
                      <div className="card-image cart-item-image">
                        <img src={x.info.fl_image} alt="Placeholder image" />
                      </div>
                      <div className="card-content no-overflow">
                        <p className="title is-7 has-text-grey-light item-brand">
                          {x.info.fl_brand}
                        </p>
                        <p className="subtitle is-6 is-bold">
                          {x.info.food_name}
                        </p>
                        <span className="tag">
                          <span className="subtitle is-7">
                            {x.info.fl_package_type} x{x.amount}
                          </span>
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="divider"></div>
        </div>
      </div>
    </div>
  );
};
export default withRouter(ConfirmationPage);
