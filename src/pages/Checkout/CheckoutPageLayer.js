import React, { useState } from "react";
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
import Notifications from "components/Notifications/Notifications";
import BankAPI from "API/BankAPI";
import Icons from "components/Icons/Icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DateTime from "pages/Checkout/DateTime";

function CheckoutPageLayer({ obj }) {
  const street = useField("text");
  const city = useField("text");
  const state = useField("text");
  const zip = useField("text");
  const checkbox = useField("checkbox");
  const date = useField("text");
  const [key, setKey] = useState(1);
  window.addEventListener("storage", () => {
    setKey(key + 1);
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(
      street.value +
        " " +
        city.value +
        " " +
        state.value +
        " " +
        zip.value +
        " " +
        checkbox.value +
        " " +
        date.value
    );
  };
  const ref = React.createRef();
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
              <div className="pickup-confirm">
                <p className="title is-5">Confirm Pickup</p>
                {/* <ItemList list={items} /> */}
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
              <div className="delivery-confirm">
                <p className="title is-5">Confirm Delivery</p>
                {/* <ItemList list={items} /> */}
                <form onSubmit={handleSubmit}>
                  <div className="field">
                    <label>Street</label>
                    <div className="control">
                      <input
                        className="input"
                        type={street.type}
                        value={street.value}
                        onChange={street.onChange}
                        placeholder="Ex: 123 Main St"
                      />
                    </div>
                  </div>
                  <div className="field">
                    <label>City</label>
                    <div className="control">
                      <input
                        className="input"
                        type={city.type}
                        value={city.value}
                        onChange={city.onChange}
                      />
                    </div>
                  </div>
                  <div className="columns">
                    <div className="column">
                      <div className="field">
                        <label>State</label>
                        <div className="control">
                          <input
                            className="input"
                            type={state.type}
                            value={state.value}
                            onChange={state.onChange}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="column">
                      <div className="field">
                        <label>Zip</label>
                        <div className="control">
                          <input
                            className="input"
                            type={zip.type}
                            value={zip.value}
                            onChange={zip.onChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="title is-6">Choose delivery time:</p>
                  <div className="level">
                    <div className="level-left">
                      <div className="level-item">
                        <DateTime ref={ref}
                          type={date.type}
                          value={date.value}
                          onChange={date.onChange}
                        />
                      </div>
                    </div>
                    <div className="level-right">
                      <div className="level-item">
                        <div className="field">
                          <div className="control">
                            <label class="checkbox">
                              <input
                                type={checkbox.type}
                                value={checkbox.value}
                                onChange={checkbox.onChange}
                              />
                              <span className="has-margin-left-0-5">
                                I want my delivery as soon as possible
                              </span>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <div className="delivery-options">
                  <div className="columns">
                    <div className="column delivery-option-1">
                      <DateTime />
                    </div>
                    <div className="column delivery-option-2">
                      <div className="field">
                        <div className="control">
                          <label class="checkbox">
                            <input type="checkbox" />
                            <span className="has-margin-left-0-5">
                              I want my delivery as soon as possible
                            </span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}
                  <div className="field">
                    <div className="control">
                      <button className="button is-success">
                        <span className="icon">
                          <FontAwesomeIcon icon={Icons.faTruck} />
                        </span>
                        <span>Delivery Checkout</span>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
const ItemList = ({ list }) => {
  return (
    <div className="item-list">
      {list.map((x) => (
        // <div className="level item-level">
        //   <div className="level-left">
        //     <div className="level-item">
        //     <span>{x.item.food_name}</span>
        //     </div>
        //   </div>
        //   <div className="level-right">
        //     <div className="level-item">
        //     <span>x{x.amount}</span>
        //     </div>
        //   </div>
        // </div>
        <p>
          <span className="subtitle is-6">{x.item.food_name}</span>
          <span className="title is-6 has-margin-left-0-5">x{x.amount}</span>
        </p>
      ))}
      <p className="title is-6">Total: {list.length}</p>
    </div>
  );
};

const useField = (type) => {
  const [value, setValue] = useState('');

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};
export default CheckoutPageLayer;
