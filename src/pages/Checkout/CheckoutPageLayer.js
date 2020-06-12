import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from "react-router-dom";
import Carousel from "pages/Checkout/Carousel";
import ScrollToTopOnMount from "utils/Scroll/ScrollToTopOnMount";
function CheckoutPageLayer({ obj }) {
  const items = JSON.parse(window.localStorage.getItem(obj.id)) || [];
  const inventory = obj.inventory;
  return (
    <div className="checkout-page-layer">
      <ScrollToTopOnMount />
      <div className="checkout-page-content">
        <div className="order-header">
          <p className="title is-4">{obj.name}</p>
        </div>
        <div className="order-items">
          <Carousel obj={obj} />
        </div>
        <div className="order-confirm">

              <div className="pickup-confirm">
                <p className="title is-5 has-padding-bottom-1-5">
                  Confirm Pickup
                </p>
                <p className="subtitle is-6">{obj.address}</p>
                <Link to="/">Pickup Checkout</Link>
              </div>
              <div className="delivery-confirm">
                <p className="title is-5">Confirm Delivery</p>
                <div className="field">
                  <div className="control">
                    <label>Street</label>
                    <input
                      className="input street"
                      type="text"
                      placeholder="Ex: 123 Main St"
                    />
                  </div>
                </div>
                <div className="field">
                  <div className="control">
                    <label>City</label>
                    <input className="input city" type="text" placeholder="" />
                  </div>
                </div>
                <div className="columns">
                  <div className="column">
                    <div className="field">
                      <div className="control">
                        <label>State</label>
                        <input
                          className="input state"
                          type="text"
                          placeholder=""
                        />
                      </div>
                    </div>
                  </div>
                  <div className="column">
                    <div className="field">
                      <div className="control">
                        <label>Zip</label>
                        <input
                          className="input zip"
                          type="text"
                          placeholder=""
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <Link to="/">Delivery Checkout</Link>
              </div>

            {/* <div className="column is-5">
              <div className="cart-summary-container">
                <div className="card">
                  <header class="card-header">
                        <p class="card-header-title">
                        Cart Summary
                        </p>
                  </header>
                  <div class="card-content">
                    <div class="content">
                      <p className="title is-6">Delivery</p>

                      <p className="title is-6">Pickup</p>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}

        </div>
      </div>
    </div>
  );
}

// const filterSelectedItems = (obj) => {
//     return obj.filter(item => )
// }

//}
export default CheckoutPageLayer;
