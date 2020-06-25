import React, { useState, useEffect, useContext } from "react";
import BankAPI from "API/BankAPI";
import { BrowserRouter as Router, Link, useLocation, withRouter } from "react-router-dom";
import useQuery from "components/Hooks/useQuery";
import { OrderContext } from "components/Context/OrderContext";

// render food bank's inventory
function BankInventory({ obj, deliveryOrPickup, bankUrl }) {
  let query = useQuery();
  let inventory = obj.inventory;
  if (query.get("type"))
    inventory = getItemsByKey(query.get("type"), inventory);
  // key={+new Date()}
  return (
    <div className="inventory fade-in">
      {inventory.map((foodItem) =>
        deliveryOrPickup.includes(foodItem.delivery_pickup) ? (
          <div key={foodItem.food_id} className="card item">
            <div className="card-content has-no-padding item-content">
              <div className="item-image-container">
                <img
                  src={foodItem.image}
                  className="item-image"
                  alt="Placeholder image"
                ></img>
              </div>
              <div className="item-info">
                <p className="title has-text-grey-light is-7 item-brand">
                  {foodItem.brand}
                </p>
                <p className="subtitle is-6 is-bold no-overflow">
                  {foodItem.food_name}
                </p>
                <p className="subtitle is-7 has-text-grey no-overflow">
                  {foodItem.unit} ({foodItem.weight}{" "}
                  {/* {foodItem.weight_unit}) */}
                </p>
                <QuantityInput foodItem={foodItem} bankId={obj.id} />
              </div>
            </div>
            <div className="card-footer">
              <div className="item-price">
                <span className="subtitle has-font-13 has-text-grey">
                  ${foodItem.price}
                </span>
              </div>
              <div className="item-tags">
                <ItemTags bankUrl={bankUrl} str={foodItem.type} />
              </div>
            </div>
          </div>
        ) : null
      )}
    </div>
  );
}

// render an item's tags
function ItemTags({ bankUrl, str }) {
  return (
    <div className="tags-container no-overflow">
      {str
        ? str.split(";").map((tag) => (
            <Link
              key={tag}
              to={`${bankUrl}?type=${tag}`}
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
function QuantityInput({ foodItem, bankId }) {
  const count = useCounter(foodItem, bankId);
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
            foodItem.quantity === 0 || count.value >= foodItem.limit
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
// const useCart = (bank) => {
//   var myOrder = {
//     items: {},
//   };
//   bank.inventory.forEach((x) => {
//     myOrder.items.set(x, 0);
//   });
//   const [order, setOrder] = useState(myOrder);
//   const increaseItemValue = (e, item) => {
//     e.preventDefault();
//     var value = order.items.get(item);
//     if (value === item.quantity) value = 10;
//     else value += 1;
//     setOrder((prevState) => {
//       // ...prevState,
//       // items: {
//       //     [item]:value
//       // }
//       prevState.items.set(item, value);
//       return {
//         ...prevState,
//       };
//     });
//   };
//   const decreaseItemValue = (e, item) => {
//     e.preventDefault();
//     var value = order.items.get(item);
//     if (value === 0) value = 0;
//     else value -= 1;
//     setOrder((prevState) => {
//       prevState.items.set(item, value);
//       return {
//         ...prevState,
//       };
//     });
//   };
//   const getItemValue = (item) => {
//     return order.items.get(item);
//   };
//   return {
//     order,
//     increaseItemValue,
//     decreaseItemValue,
//     getItemValue,
//   };
// };

const useCounter = (foodItem, bankId) => {
  const [orderInfo, setOrderInfo] = useContext(OrderContext);
  let initialValues = JSON.parse(window.localStorage.getItem(bankId)) || [];

  let initValue = initialValues.find((x) => {
    return x.item.food_id === foodItem.food_id;
  });

  const [value, setValue] = useState(initValue ? initValue.amount : 0);

  const increase = () => {
    setValue(value + 1);
    // setOrderInfo(orderInfo + 1);
  };
  const decrease = () => {
    setValue(value - 1);
    // setOrderInfo(orderInfo - 1);
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
    let items = JSON.parse(window.localStorage.getItem(bankId)) || [];
    if (items.length === 0 && value > 0) {
      // setOrderInfo(value);
      window.localStorage.clear();
    }

    let item = items.find((x) => {
      return x.item.food_id === foodItem.food_id;
    });
    if (item && value > 0) item.amount = value;
    else if (item && value === 0) items.splice(items.indexOf(item), 1);
    else if (!item && value > 0) items.push({ item: foodItem, amount: value });

    // if (items.length > 0) setOrderInfo(totalAmount(items));
    setOrderInfo(totalAmount(items));
    window.localStorage.setItem(bankId, JSON.stringify(items));
    // }
  }, [value]);

  return {
    value,
    increase,
    decrease,
    zero,
  };
};

const getItemsByKey = (key, arr) => {
  return arr.filter((x) => x.type.includes(key));
};
export default withRouter(BankInventory);
