import React from "react";
import Notifications from "components/Notifications/Notifications";
import { Redirect, useParams } from "react-router-dom";
import ConfirmationPageLayout from "pages/Checkout/ConfirmationPageLayout";
function ConfirmationPage({ list, order }) {
  console.log(order);

  return (
    <div className="confirmation-page">
      {order.orderInfo.ordered_items.length > 0 ? (
        <ConfirmationPageLayout list={list} order={order} />
      ) : (
        <div className="confirmation-page-error">
          {Notifications.noConfirmation("You have no order confirmation.")}
        </div>
      )}
    </div>
  );
}
export default ConfirmationPage;
