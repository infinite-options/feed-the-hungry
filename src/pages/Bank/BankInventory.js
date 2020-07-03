import React, { useState, useEffect, useContext } from "react";
import {
  BrowserRouter as Router,
  Link,
  useLocation,
  withRouter,
  useParams,
} from "react-router-dom";
import useQuery from "components/Hooks/useQuery";
import { OrderContext } from "components/Context/OrderContext";

// render food bank's inventory
function BankInventory({ inventory }) {
  let query = useQuery();
  if (query.get("type"))
    inventory = getItemsByKey(query.get("type"), inventory);

  const context = useContext(OrderContext);
  return (
    <div className="inventory">
      {inventory.map((x) => (
        <div
          key={x.food_id}
          className={
            context.orderType.includes(x.delivery_pickup)
              ? "card item"
              : " card item has-opacity-0-6"
          }
        >
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
              <p className="subtitle is-6 is-bold no-overflow">{x.food_name}</p>
              <p className="subtitle is-7 has-text-grey no-overflow">
                {x.fl_package_type} ({x.food_unit})
              </p>
              <QuantityInput item={x} />
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
      ))}
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
  const context = useContext(OrderContext);
  return (
    <div>
      <div className="field">
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
              !context.orderType.includes(item.delivery_pickup) ||
              item.quantity === 0 ||
              count.value >= item.food_id_limit
                ? true
                : false
            }
          >
            +
          </button>
        </div>
      </div>

      <div className="space-1-5"></div>
      {item.quantity === 0 && <p className="p is-danger">Out of stock</p>}
      {count.value >= item.food_id_limit && (
        <p className="help is-danger">Limit is {item.food_id_limit}</p>
      )}
    </div>
  );
}

const useCounter = (x) => {
  let { bankId } = useParams();
  const context = useContext(OrderContext);

  const [value, setValue] = useState(() => {
    const cart = JSON.parse(window.localStorage.getItem("cart"));
    const initValue =
      cart && cart.bankId === bankId
        ? cart.items.find((item) => {
            return item.info.food_id === x.food_id;
          })
        : {};
    return initValue && initValue.amount ? initValue.amount : 0;
  });

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
    let cart = JSON.parse(window.localStorage.getItem("cart")) || {
      bankId: "",
      items: [],
    };
    let cartItems = cart.items ? cart.items : [];

    if (cart.bankId && cart.bankId === bankId) {
      let item = cartItems.find((item) => {
        return item.info.food_id === x.food_id;
      });
      if (item && value > 0) item.amount = value;
      else if (item && value === 0)
        cartItems.splice(cartItems.indexOf(item), 1);
      else if (!item && value > 0) cartItems.push({ info: x, amount: value });

      window.localStorage.setItem(
        "cart",
        JSON.stringify({
          bankId: bankId,
          total: totalAmount(cartItems),
          items: cartItems,
        })
      );
      context.setOrderType(
        cartItems[0] ? cartItems[0].info.delivery_pickup : "delivery;pickup"
      );
    } else if (cart.bankId && cart.bankId != bankId && value > 0) {
      cartItems = [];
      cartItems.push({ info: x, amount: value });
      window.localStorage.setItem(
        "cart",
        JSON.stringify({
          bankId: bankId,
          total: totalAmount(cartItems),
          items: cartItems,
        })
      );
      context.setOrderType(cartItems[0].info.delivery_pickup);
    } else if (cart.bankId && cart.bankId != bankId) {
      window.localStorage.setItem("cart", JSON.stringify(cart));
      context.setOrderType("delivery;pickup");
    } else if (!cart.bankId) {
      window.localStorage.setItem(
        "cart",
        JSON.stringify({
          bankId: bankId,
          total: totalAmount(cartItems),
          items: cartItems,
        })
      );
      context.setOrderType("delivery;pickup");
    }
    context.setCartTotal(totalAmount(cartItems));

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
