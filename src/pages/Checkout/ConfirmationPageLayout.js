import React from 'react';
import BankAPI from 'API/BankAPI';
import './style.css';
function ConfirmationPageLayout({bank, order}) {
    // const bank = BankAPI.getBankBy(order.orderInfo.kitchen_id, list);
    return (
        <div className="confirmation-page-layer">
            <div className="confirmation-page-content">
                <div className="confirmation-page-title">
                <p className="title is-3">{bank.name}</p>
                </div>
                <div className="space-2-5"></div>
                <div className="confirmation-page-body">
                <div className="columns">
                    <div className="column is-7">
                        <div className="confirm-order-container">
                            <p className="title is-6">Your order has been placed</p>
                            <p className="title is-6">Confirmation number:</p>
                            <p className="subtitle is-6">A confirmation email has been sent to {order.email}@gmail.com</p>
                            <p className="subtitle is-6">Click <a href="#">here</a> to resend confirmation email</p>
                            <div className="divider"></div>
                            <div className="columns">
                                <div className="column is-4">
                                <span className="subtitle is-6">Delivery confirmed for: {order.date}</span><br></br>
                                <span className="subtitle is-6">Delivery address:</span>
                                </div>
                                <div className="column is-8">
                                <span className="subtitle is-6">{order.orderInfo.delivery_date}</span><br></br>
                                <span className="subtitle is-6">{order.orderInfo.street}</span><br></br>
                            <span className="subtitle is-6">{order.orderInfo.city}, {order.orderInfo.state} {order.orderInfo.zipcode}</span>

                                </div>
                            </div>
                            {/* <p className="subtitle is-6">Delivery confirmed for: {order.orderInfo.delivery_date}</p>
                            <p className="subtitle is-6">Delivery address:</p>
                            <p className="subtitle is-bold is-6">{order.orderInfo.street}</p>
                            <p className="subtitle is-bold is-6">{order.orderInfo.city}, {order.orderInfo.state} {order.orderInfo.zipcode}</p> */}

                        </div>
                       
                    </div>
                    <div className="column is-5">
                        <div className="total-order-container">
                                {order.ordered_items.map(x =>
                                    <div className="card cart-item">
                                    <div className="card-image cart-item-image">
                                        {/* <figure className="image is-128x128"> */}
                                            <img src={x.item.image} alt="Placeholder image" />
                                        {/* </figure> */}
                                    </div>
                                    <div className="card-content no-overflow">
                                        <p className="title is-7 has-text-grey-light item-brand">{x.item.brand}</p>
                                        <p className="subtitle is-6 is-bold">{x.item.food_name}
                                        </p>
                                        <span className="tag">
                                            <span className="subtitle is-7">{x.item.unit} x{x.amount}</span>
                                            {/* <span className="subtitle" */}
                                        </span>
                                        {/* <p><span className="subtitle is-7 has-text-grey">{foodItem.item.unit}</span><span className="subtitle is-bold is-7 has-margin-left-0-5">x{foodItem.amount}</span> </p> */}
                                        
                                    </div>
                                    {/* <footer className="card-footer no-overflow">
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
                                    </footer> */}
                                </div>
                                )}
                        </div>
                    </div>
                </div>
                </div>
                <div className='divider'></div>
            </div>
        </div>
        
    );
}
export default ConfirmationPageLayout;