import React, { useState, useEffect } from "react";
import BankAPI from "API/BankAPI";
import { BrowserRouter as Router, Link, useLocation } from "react-router-dom";
import useQuery from 'components/Hooks/useQuery';

function BankInventory({ obj, bankUrl }) {
  let query = useQuery();
  let inventory = obj.inventory;
  if (query.get("type")) inventory = BankAPI.GetItemsByTag(inventory, query.get("type"));

  return (
    <div key={+new Date()} className="inventory fade-in">
      {inventory.map(foodItem => (
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
                {foodItem.weight_unit})
              </p>
              <QuantityInput
                foodItem={foodItem}
                bankId={obj.id}
                limit={foodItem.quantity}
              />
            </div>
          </div>
          <div className="card-footer">
            <div className="item-price">
              <span className="subtitle has-font-13 has-text-grey">
                ${foodItem.price}
              </span>
            </div>
            <div className="item-tags">
              <SplitTags bankUrl={bankUrl} str={foodItem.type} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function SplitTags({ bankUrl, str }) {
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
function QuantityInput({ foodItem, bankId, limit }) {
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
          disabled={count.value === limit ? true : false}
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

// function useQuery() {
//   return new URLSearchParams(useLocation().search);
// }
function isStorageChanged(){
  window.addEventListener("storage", (e) => {
    return true;
  })
  return false;
}

const useCounter = (foodItem, bankId) => {
  let initialValues = JSON.parse(window.localStorage.getItem(bankId)) || [];

  let initValue = initialValues.find((x) => {
    return x.item.food_id === foodItem.food_id;
  });

  const [value, setValue] = useState(initValue ? initValue.amount : 0);

  const increase = () => {
    setValue(value + 1);
  };
  const decrease = () => {
    setValue(value - 1);
  };
  const zero = () => {
    setValue(0);
  };

  useEffect(() => {
    let items = JSON.parse(window.localStorage.getItem(bankId)) || [];
    let item = items.find((x) => {
      return x.item.food_id === foodItem.food_id;
    });
    if (item && (value > 0)) item.amount = value;
    else if (item && (value === 0)) items.splice(items.indexOf(item), 1);
    else if (!item && (value > 0)) items.push({item: foodItem, amount: value});

    window.localStorage.setItem(bankId, JSON.stringify(items));
  }, [value]);

  return {
    value,
    increase,
    decrease,
    zero,
  };
};

export default BankInventory;
