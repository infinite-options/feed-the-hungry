import React from "react";

function CartItem({ foodItem }) {
  return (
    <div className="card cart-item">
      <div className="card-image cart-item-image">
        <img src={foodItem.info.fl_image} alt="Placeholder image" />
      </div>
      <div className="card-content no-overflow">
        <p className="title is-7 has-text-grey-light item-brand">
          {foodItem.info.fl_brand}
        </p>
        <p className="subtitle is-6 is-bold">{foodItem.info.food_name}</p>
        <span className="tag">
          <span className="subtitle is-7">
            {foodItem.info.fl_package_type} x{foodItem.amount}
          </span>
        </span>

        {foodItem.info.delivery_pickup === "delivery" ? (
          <p className="subtitle is-7 is-bold has-text-danger">Delivery Only</p>
        ) : (
          ""
        )}
        {foodItem.info.delivery_pickup === "pickup" ? (
          <p className="subtitle is-7 is-bold has-text-danger">Pickup Only</p>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
export default CartItem;
