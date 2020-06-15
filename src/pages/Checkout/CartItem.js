import React from 'react';

function CartItem({foodItem}){
    return (
        <div className="card cart-item">
            <div className="card-image">
                {/* <figure className="image is-128x128"> */}
                    <img src={foodItem.item.image} alt="Placeholder image" />
                {/* </figure> */}
            </div>
            <div className="card-content no-overflow">
                <p className="title is-7 has-text-grey-light item-brand">{foodItem.item.brand}</p>
                <p className="subtitle is-6 is-bold">{foodItem.item.food_name}</p>
                <p className="subtitle is-7 has-text-grey">{foodItem.item.unit} ({foodItem.item.weight} {foodItem.item.weight_unit})</p>
            </div>
            <footer className="card-footer no-overflow">
            <p className="card-footer-item">
                <span className="no-overflow">
                    ${foodItem.item.price}
                </span>
            </p>
            <p className="card-footer-item">
                <span className="no-overflow">
                    x{foodItem.amount}
                </span>
            </p>
            </footer>
        </div>

    );
}
export default CartItem;