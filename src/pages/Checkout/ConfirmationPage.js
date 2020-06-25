import React from "react";
import Notifications from "components/Notifications/Notifications";
import { Redirect, useParams, withRouter } from "react-router-dom";
import ConfirmationPageLayout from "pages/Checkout/ConfirmationPageLayout";
import BankAPI from "API/BankAPI";
import ErrorPage from "pages/Error/ErrorPage";

function ConfirmationPage({ ...bankAPI }) {
  
  const unconfirmed_order = JSON.parse(window.localStorage.getItem('unconfirmed_order'));
  const bank = unconfirmed_order ? bankAPI.getBankBy(unconfirmed_order.kitchen_id) :null;
  if (!Object.keys(unconfirmed_order.length)) return <ErrorPage />
  return (
    <div className="confirmation-page">
      <ConfirmationPageLayout bank={bank} order={unconfirmed_order} />
      {/* {unconfirmed_order.ordered_items.length > 0 ? (
        <ConfirmationPageLayout order={unconfirmed_order} />
      ) : (
        <div className="confirmation-page-error">
          {Notifications.noConfirmation("You have no order confirmation.")}
        </div>
      )} */}
    </div>
  );
}
export default ConfirmationPage;
