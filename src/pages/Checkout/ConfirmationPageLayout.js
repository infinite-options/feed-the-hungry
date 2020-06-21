import React from 'react';
import BankAPI from 'API/BankAPI';
import './style.css';
function ConfirmationPageLayout({list, order}) {
    const bank = BankAPI.getBankBy(order.orderInfo.kitchen_id, list);
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
                            <p className="subtitle is-6">A confirmation email has been sent to ??@gmail.com</p>
                            <p className="subtitle is-6">Click <a href="#">here</a> to resend confirmation email</p>
                            <div className="divider"></div>
                            <div className="columns">
                                <div className="column is-4">
                                <span className="subtitle is-6">Delivery confirmed for:</span><br></br>
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
                                {order.orderInfo.ordered_items.map(x =>
                                  <p>{x.meal_id}</p>)}
                        </div>
                    </div>
                </div>
                </div>
                <div className='divider'></div>
            </div>
        </div>
        
    );
}
export default ConfirmationPageLayout