import React, { useState, useEffect, useContext } from "react";

import { Redirect, useParams, withRouter } from "react-router-dom";
import ErrorPage from "pages/Error/ErrorPage";
import LoadingPage from "pages/Error/LoadingPage";
import axios from "axios";
import FailedOrderPage from "pages/Error/FailedOrderPage";
import { OrderContext } from "components/Context/OrderContext";
import { useOurApi } from "API/useOurApi";
import EmptyCartPage from "pages/Error/EmptyCartPage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import ScrollToTop from "utils/Scroll/SrollToTop";


function ConfirmationPage() {
  const unconfirmed_order =
    JSON.parse(window.localStorage.getItem("unconfirmed_order")) || {};
  const cartItems = unconfirmed_order.ordered_items
    ? unconfirmed_order.ordered_items
    : [];
    // if cart is empty
  if (cartItems.length === 0) return <EmptyCartPage />;
  // else, construct order and send it
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
    // we only need the food id and the amount, not the entire item
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
        setIsLoading(true);
        const response = await axios.post(url, order);
        const responseData = await response.data;
        // once axios's POST method is called, we update sentOrder
        // so that we know it has already been written to the db.

        // Hao: adding this for cases where user is not registered as a customer
        const userInfo = JSON.parse(window.localStorage.getItem("userInfo"));
        if (userInfo && userInfo.cart) userInfo.cart = "";
        const EDIT_USER_STATUS_API = `https://dc3so1gav1.execute-api.us-west-1.amazonaws.com/dev/api/v2/edit_user_status/${userInfo.userID}?`;
        if (!userInfo.isCustomer) {
          userInfo.isCustomer = 1;
          axios
            .get(EDIT_USER_STATUS_API + "user_is_customer=1")
            .then(() => {
              window.localStorage.setItem("userInfo", JSON.stringify(userInfo));
            })
            .catch((err) => {
              console.log(err.response);
            });
        }

        window.localStorage.setItem("userInfo", JSON.stringify(userInfo)); // remove cart info from local storage
        context.setOrderTotal(0); // set cart  total to 0
        setSentOrder((prevState) => ({ // update sent order
          ...prevState,
          isSent: true,
          order_id: responseData.result.order_id,
        }));
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

  window.localStorage.setItem("unconfirmed_order", JSON.stringify(sentOrder)); // update unconfirmed_order with sentOrder
  if (isLoading) return <LoadingPage />;
  if (hasError) return <FailedOrderPage />;

  return (
    <div className="bd-main is-fullheight-with-navbar">
      <ScrollToTop />
      <div className="container">
        <div className="confirmation-page-title">
          <p className="title is-3">{sentOrder.kitchen_name}</p>
        </div>
        <div className="space-2-5"></div>
        <div className="confirm-order-container">
          <p className="title is-4">Hey {sentOrder.name},</p>{" "}
          <p className="title is-4 has-text-green">
            <span className="icon" style={{ marginRight: ".5rem" }}>
              <FontAwesomeIcon icon={faCheck} />
            </span>
            <span>We've received your order</span>
          </p>
          <p className="title is-5">Order no#: {sentOrder.order_id} </p>
          <p className="subtitle is-6">
            A confirmation email has been sent to {sentOrder.email}
          </p>
          <p className="subtitle is-6">
            Click <a href="#">here</a> to resend confirmation email
          </p>
          <div className="divider"></div>
          <div className="total-order-container">
            {sentOrder.ordered_items.map((x) => (
              <div key={x.info.food_id} className="card cart-item">
                <div className="card-image cart-item-image">
                  <img src={x.info.fl_image} alt="Placeholder image" />
                </div>
                <div className="card-content no-overflow">
                  {/* <p className="title is-7 has-text-grey-light item-brand">
                          {x.info.fl_brand}
                  </p> */}
                  <p
                    className="title is-7 is-Nunito"
                    style={{ marginBottom: ".5rem" }}
                  >
                    {x.info.fl_name}
                  </p>
                  <span className="tag">
                    <span className="subtitle is-7 is-Nunito">x{x.amount}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="space-2-5"></div>
          <div className="columns">
            <div className="column is-2">
              <p className="subtitle is-6">Delivery date: {sentOrder.date}</p>

              <p className="subtitle is-6">
                {" "}
                {order.order_type === "delivery"
                  ? "Delivery address"
                  : "Pickup address"}
                :
              </p>
            </div>

            <div className="column is-10">
              <p className="subtitle is-6 is-bold">{sentOrder.delivery_date}</p>
              {sentOrder.order_type === "delivery" ? (
                <div>
                  <p className="subtitle is-6">{sentOrder.street}</p>

                  <p className="subtitle is-6">
                    {sentOrder.city}, {sentOrder.state} {sentOrder.zipcode}
                  </p>
                </div>
              ) : (
                <div>
                  {" "}
                  <p className="subtitle is-6 is-bold">
                    {sentOrder.kitchen_name}
                  </p>
                  <p className="subtitle is-6">{sentOrder.kitchen_address}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default withRouter(ConfirmationPage);
