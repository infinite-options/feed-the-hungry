import React from 'react';
import Carousel from 'pages/Checkout/Carousel';

function CheckoutPageLayer({obj}){
    const items = JSON.parse(window.localStorage.getItem(obj.id)) || [];
    const inventory = obj.inventory;
    return(
        <div className="checkout-page-layer">
            <div className="order-container">
                <div className="order-header">
                    <p className="title is-4 bank-title">{obj.name}</p>
                </div>
                <div className="order-body">
                    <Carousel obj={obj}/>
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