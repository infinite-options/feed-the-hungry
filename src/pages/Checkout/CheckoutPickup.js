import React from 'react';
import Icons from "components/Icons/Icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function CheckoutPickup({obj}) {
    return (
        <div className="pickup-confirm">
      <p className="title is-5">Confirm Pickup</p>
      <p className="subtitle is-6">{obj.address}</p>
      <div className="field">
        <div className="control">
          <button className="button is-success confirm-checkout-btn">
            <span className="icon">
              <FontAwesomeIcon icon={Icons.faBoxOpen} />
            </span>
            <span>Pickup Checkout</span>
          </button>
        </div>
      </div>
    </div>
    );
}
export default CheckoutPickup;