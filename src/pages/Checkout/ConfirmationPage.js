import React, { useState, useEffect } from "react";
import Notifications from "components/Notifications/Notifications";
import { Redirect, useParams, withRouter } from "react-router-dom";
import ConfirmationPageLayout from "pages/Checkout/ConfirmationPageLayout";
import { useOurApi } from "API/useOurApi";
import ErrorPage from "pages/Error/ErrorPage";
import LoadingPage from "pages/Error/LoadingPage";
import axios from "axios";
import FailedOrderPage from "pages/Error/FailedOrderPage";

function ConfirmationPage() {
  console.log("confirm page");
  const unconfirmed_order = JSON.parse(window.localStorage.getItem("unconfirmed_order")) || {};
  const cartItems = unconfirmed_order.ordered_items
    ? unconfirmed_order.ordered_items
    : [];
  // const bankId = unconfirmed_order.kitchen_id ? unconfirmed_order.kitchen_id : "";
  // const url = `https://dc3so1gav1.execute-api.us-west-1.amazonaws.com/dev/api/v2/foodbankinfonew/${bankId}`
  // const { data, isLoading, unmount, hasError } = useOurApi(url, {});
  // const bank = data.result;

  // if (isLoading) { console.log("loading"); return <LoadingPage /> }
  if (cartItems.length === 0) return <ErrorPage />;
  else {
    const order = {
      customer_id: "",
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
const Confirmation = ({ initialUrl, unconfirmed_order, order }) => {
  const [url, setUrl] = useState(initialUrl);
  // const [orderId, setOrderId] = useState("");
  const [sentOrder, setSentOrder] = useState(unconfirmed_order);
  const [hasError, setHasErrror] = useState(false);
  // const [ isSent, setIsSent] = useState(unconfirmed_order.isSent);
  // may need to handle error in the future
  useEffect(() => {

    const writeData = async () => {
      try {
        const response = await axios.post(url, order);
        console.log(response);
        const responseData = await response.data;
        setSentOrder(prevState => ({...prevState, isSent: true, order_id: responseData.result.order_id}));
        // setIsSent(true);
        // setOrderId(responseData.result.order_id);
      } catch (err) {
        console.log(err);
        setHasErrror(true);
      } finally {
        
      }
    };
    if (!sentOrder.isSent) writeData();
  }, [url]);

  window.localStorage.setItem("unconfirmed_order", JSON.stringify(sentOrder));
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
                      <span className="subtitle is-6">
                        Delivery confirmed for: {sentOrder.date}
                      </span>
                      <br></br>
                      <span className="subtitle is-6">Delivery address:</span>
                    </div>
                    <div className="column is-8">
                      <span className="subtitle is-6">
                        {sentOrder.delivery_date}
                      </span>
                      <br></br>
                      <span className="subtitle is-6">
                        {sentOrder.street}
                      </span>
                      <br></br>
                      <span className="subtitle is-6">
                        {sentOrder.city}, {sentOrder.state}{" "}
                        {sentOrder.zipcode}
                      </span>
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
