import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter as Router, Link, useLocation, withRouter, useParams } from "react-router-dom";
import useQuery from "components/Hooks/useQuery";
import { OrderContext } from "components/Context/OrderContext";

// render food bank's inventory
function BankInventory({ inventory, deliveryOrPickup}) {
  let query = useQuery();
  if (query.get("type"))
    inventory = getItemsByKey(query.get("type"), inventory);

  return (
    <div className="inventory fade-in">
      {inventory.map((x) =>
        deliveryOrPickup.includes(x.delivery_pickup) ? (
          <div key={x.food_id} className="card item">
            <div className="card-content has-no-padding item-content">
              <div className="item-image-container">
                <img
                  src={x.fl_image}
                  className="item-image"
                  alt="Placeholder image"
                ></img>
              </div>
              <div className="item-info">
                <p className="title has-text-grey-light is-7 item-brand">
                  {x.fl_brand}
                </p>
                <p className="subtitle is-6 is-bold no-overflow">
                  {x.food_name}
                </p>
                <p className="subtitle is-7 has-text-grey no-overflow">
                  {x.fl_package_type} ({x.food_unit})
                </p>
                <QuantityInput item={x}/>
              </div>
            </div>
            <div className="card-footer">
              <div className="item-price">
                <span className="subtitle has-font-13 has-text-grey">
                  ${x.fl_value_in_dollars}
                </span>
              </div>
              <div className="item-tags">
                <ItemTags str={x.fl_food_type} />
              </div>
            </div>
          </div>
        ) : null
      )}
    </div>
  );
}

// render an item's tags
function ItemTags({ str }) {
  let { bankId } = useParams();
  return (
    <div className="tags-container no-overflow">
      {str
        ? str.split(";").map((tag) => (
            <Link
              key={tag}
              to={`banks/${bankId}/products?type=${tag}`}
              className="item-tag subtitle has-margin-left-12"
              alt=""
            >
              #{tag}
            </Link>
          ))
        : ""}
    </div>
  );
}
function QuantityInput({ item }) {
  const count = useCounter(item);
  return (
    <div className="field is-grouped is-multiline">
      <div className="control item-actions">
        <button
          className="button is-small"
          onClick={count.decrease}
          disabled={count.value === 0 ? true : false}
        >
          -
        </button>
        <input
          type="text"
          className="input is-small"
          value={count.value}
          readOnly
        />
        <button
          className="button is-small"
          onClick={count.increase}
          disabled={
            item.quantity === 0 || count.value >= item.food_id_limit
              ? true
              : false
          }
        >
          +
        </button>
      </div>
    </div>
  );
}

const useCounter = (x) => {
  let { bankId} = useParams();
  const context = useContext(OrderContext);
  let cart = JSON.parse(window.localStorage.getItem('cart')) || {};
  let initialAmount = 0;
  if (cart.bankId && cart.bankId === bankId){
    let cartItems = cart.items ? cart.items : [];
    let initValue = cartItems.find((item) => {
      return item.info.food_id === x.food_id;
    });
    initialAmount = initValue ? initValue.amount : 0;
}
  const [value, setValue] = useState(initialAmount);

  const increase = () => {
    setValue(value + 1);
  };
  const decrease = () => {
    setValue(value - 1);
  };
  const zero = () => {
    setValue(0);
  };
  const totalAmount = (items) => {
    var total = 0;
    items.forEach((x) => {
      total += x.amount;
    });
    return total;
  };
  useEffect(() => {
    let cart = JSON.parse(window.localStorage.getItem('cart')) || { bankId: "", items: []};
    let cartItems = cart.items ? cart.items : [];

    if (cart.bankId && cart.bankId === bankId){
      let item = cartItems.find((item) => {
        return item.info.food_id === x.food_id;
      });
      if (item && value > 0) item.amount = value;
      else if (item && value === 0) cartItems.splice(cartItems.indexOf(item), 1);
      else if (!item && value > 0) cartItems.push({ info: x, amount: value });

      window.localStorage.setItem('cart', JSON.stringify({ bankId: bankId, items: cartItems}));
   } 
   else if (cart.bankId && cart.bankId != bankId && value > 0){
        cartItems = [];
        cartItems.push({ info: x, amount: value });
        window.localStorage.setItem('cart', JSON.stringify({ bankId: bankId, items: cartItems}));
   } 
   else if (!cart.bankId){
      window.localStorage.setItem('cart', JSON.stringify({ bankId: bankId, items: cartItems}));
   }
   context.setOrderInfo(totalAmount(cartItems));
  }, [value]);

  return {
    value,
    increase,
    decrease,
    zero,
  };
};

const getItemsByKey = (key, arr) => {
  return arr.filter((x) => x.fl_food_type.includes(key));
};
export default withRouter(BankInventory);
