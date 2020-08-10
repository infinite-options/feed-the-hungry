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
import { useOurApi } from "API/useOurApi";
import ErrorPage from "pages/Error/ErrorPage";
import LoadingInventory from 'pages/Error/LoadingInventory';

// render food bank's inventory
function BankInventory({ bank, delivery, pickup, search, orderType }) {
 const [key, setKey] = useState(0);
  const url = `https://dc3so1gav1.execute-api.us-west-1.amazonaws.com/dev/api/v2/inventory_filter/${bank.foodbank_id}?delivery=${delivery}&pickup=${pickup}` + search;
  const api = useOurApi(url,{});
  useEffect(() => {
   api.setUrl(url);
   setKey(key+1);
  },[url])
  
  if (api.isLoading) return <LoadingInventory />
  if (api.hasError) return <p className="title is-6">Unable to load products</p>
  if (api.data.result.result.length === 0) return "";
  if (orderType.orderType === "delivery" && delivery === 0) return "";
  if (orderType.orderType === "pickup" && pickup === 0) return "";
  return (
    <div key={key} className="inventory-container animate-bottom">
    <div className="inventory-title-container">
      {delivery === 1 && pickup === 1 && <p className="subtitle inventory-title">Delivery or Pickup</p>}
      {delivery === 1 && pickup === 0 && <p className="subtitle inventory-title">Delivery Only</p>}
      {delivery === 0 && pickup === 1 && <p className="subtitle inventory-title">Pickup Only</p>}
    </div>

    <div className="inventory">
      {api.data.result.result.map((x) => (
        <div
          key={x.food_id}
          className="card item-card"
        >
          <div className="card-image">
            <figure className="image is-155x155">
              <img src={x.fl_image}  />
            </figure>
          </div>
          <div className="card-content">
            <div className="content">
              <p className="item-brand" style={{marginBottom:0}}>
                {x.fl_brand}
              </p>
              <p className="item-name is-bold" style={{marginBottom:0}}>{x.fl_name}</p>
              <p className="item-unit">
                {x.fl_package_type} ({x.fl_amount} {x.fl_unit})
              </p>
              <p>{x.food_id}</p>
              <QuantityInput bank={bank} item={x} orderType={orderType} />
            </div>
          </div>
          {/* <div className="card-content has-no-padding item-content">
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
              <p className="subtitle is-6 is-bold no-overflow">{x.fl_name}</p>
              <p className="subtitle is-7 has-text-grey no-overflow">
                {x.fl_package_type} ({x.fl_amount} {x.fl_unit})
              </p>
              <QuantityInput item={x} orderType={orderType} />
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
          </div> */}
        </div>
      ))}
    </div>
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
function QuantityInput({bank, item, orderType }) {
  const count = useCounter(bank, item, orderType);
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
              item.quantity === 0 
              // count.value >= item.food_id_limit
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
      {/* {count.value >= item.food_id_limit && (
        <p className="help is-danger">Limit is {item.food_id_limit}</p>
      )} */}
    </div>
  );
}

const useCounter = (bank, x, orderType) => {
  let { bankId } = useParams();
  const context = useContext(OrderContext);

  const [value, setValue] = useState(() => {
    const user = JSON.parse(window.localStorage.getItem("userInfo"));
    const cart = user.cart != "" ? user.cart : {}; 
    const initValue = cart.bankId === bankId ? cart.items.find((item) => {
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
    let user = JSON.parse(window.localStorage.getItem("userInfo"));
    let cart = user.cart != "" ? user.cart : { bankId: "", items: []};
    let bank_id = cart.bankId;
    let cart_items = cart.items;
    // CASE 1: if user is choosing products from the same food pantry again
    if (cart.bankId === bankId) {
      // check if the product user is currently selecting is in cart
      let item = cart_items.find((item) => {
        return item.info.food_id === x.food_id;
      });
      if (item && value > 0) item.amount = value; // update selected amount if that product is already in cart
      else if (item && value === 0) cart_items.splice(cart_items.indexOf(item), 1); // if product is deleted from cart
      else if (!item && value > 0) cart_items.push({ info: x, amount: value }); // if product is not in cart but gets selected
    } 
    // CASE 2: if user is choosing products from a diffrent food pantry
    else if (cart.bankId != bankId && value > 0) { 
      cart_items = [];
      cart_items.push({ info: x, amount: value });
      bank_id = bankId;
      window.localStorage.setItem('current_pantry',JSON.stringify(bank));
    } 

    cart.bankId = bank_id;
    cart.items = cart_items;
    cart.total = totalAmount(cart_items);
    user.cart = cart;
    window.localStorage.setItem(
      "userInfo",
      JSON.stringify(user)
    );

    const delivery_only_items = getItemsByKey(cart_items,"pickup",0);
    const pickup_only_items = getItemsByKey(cart_items, "delivery", 0);

    if (delivery_only_items.length > 0) orderType.setOrderType("delivery");
    else if (pickup_only_items.length > 0) orderType.setOrderType("pickup");
    else orderType.setOrderType("");

    context.setCartTotal(totalAmount(cart_items));
  }, [value]);

  return {
    value,
    increase,
    decrease,
    zero,
  };
};

const getItemsByKey = (arr, key, value) => {
  return arr.filter((x) => x.info[key] === value);
};
const filterInventoryByKey = (arr, key, value) => {
  return arr.filter((x) => x[key].includes(value));
}

export default withRouter(BankInventory);
