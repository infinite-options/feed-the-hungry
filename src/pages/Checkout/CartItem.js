import React from 'react';

function CartItem({foodItem}){
    return (
        <div className="card cart-item">
            <div className="card-image">
                {/* <figure class="image is-128x128"> */}
                    <img src={foodItem.item.image} alt="Placeholder image" />
                {/* </figure> */}
            </div>
            <div className="card-content">
                <p className="title is-7 has-text-grey-light item-brand">{foodItem.item.brand}</p>
                <p className="subtitle is-6 is-bold">{foodItem.item.food_name}</p>
                <p className="subtitle is-7 has-text-grey">1 {foodItem.item.unit} ({foodItem.item.weight} {foodItem.item.weight_unit})</p>
            </div>
            <footer className="card-footer">
            <p className="card-footer-item">
                <span>
                    ${foodItem.item.price}
                </span>
            </p>
            <p className="card-footer-item">
                <span>
                    x{foodItem.amount}
                </span>
            </p>
            </footer>
        </div>

    );
}
export default CartItem;