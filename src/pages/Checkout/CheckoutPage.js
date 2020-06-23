import React, {useState} from 'react';
import { Link, useRouteMatch, useParams, useHistory, withRouter, useLocation } from 'react-router-dom';
import BankAPI from 'API/BankAPI';
import BankLayout from 'pages/Bank/BankLayout';
import Notifications from 'components/Notifications/Notifications';
import CheckoutPageLayout from 'pages/Checkout/CheckoutPageLayout';
import EmptyCartPage from 'pages/Error/EmptyCartPage';
import Carousel from "pages/Checkout/Carousel";
import ScrollToTopOnMount from "utils/Scroll/ScrollToTopOnMount";
import CheckoutForm from "pages/Checkout/CheckoutForm";
import './style.css';

function CheckoutPage({ ...bankAPI }){
    const bankId = Object.keys(window.localStorage)[0];
    const bank = bankAPI.data.length > 0 && bankId ? bankAPI.getBankBy(bankId) : {};
    const items = bankId ? JSON.parse(window.localStorage.getItem(bankId)) : [];
    const [key, setKey] = useState(1);
    window.addEventListener("storage", () => {
        setKey(key + 1);
    });
    if (items.length === 0) return <EmptyCartPage />;
    return (
    <div className="checkout-page">
        <div className="checkout-page-layer">
            <ScrollToTopOnMount />
            <div className="checkout-page-content">
                <div className="checkout-page-title">
                <p className="title is-4">{bank.name}</p>
                </div>
                <div className="divider"></div>           
                <div key={key} className="checkout-page-body">
                    <div className="order-items">
                    <Carousel itemList={items} />
                    </div>
                    <div className="divider"></div>
                    <div className="order-confirm fade-in-quick">
                     <div className="columns">
                        <div className="column is-8"> 
                        <CheckoutForm bank={bank} items={items} />
                         </div>
                         <div className="column is-4">
                        <div className="card cart-summary">
                        <header class="card-header">
                            <p class="card-header-title">
                            Cart Summary
                            </p>
                            
                        </header>
                            <div className="card-content">
                                <div className="content">
                                    <div className="columns">
                                        <div className="column">
                                        <span className="subtitle is-6 is-bold">Subtotal: </span><br></br>
                                        <span className="subtitle is-6 is-bold">Shipping: </span>
                                 
                                        </div>
                                        <div className="column price-summary">
                                        <span className="subtitle is-6"> {totalPrice(items)} </span><br></br>
                                        <span className="subtitle is-6"> ? </span>
              
                                        </div>
                                    </div>
                                
                                </div>
                                
                            </div>
                            <div className="price-total">
                                        <div className="has-padding-1-5">
                                        <div className="columns">
                                            <div className="column">
                                                <p className="title is-6">Total: </p>
                                            </div>
                                            <div className="column">
                                                <p className="subtitle is-6 right-most">?</p>
                                            </div>
                                        </div>
                                        <button className="button is-fullWidth is-green">Place Order</button>
                                        </div>
                                        
                                    </div>
                        </div>
                        </div>
                    </div> 
                    </div>
                </div>
            </div>
            </div>
      </div>
    );
    // }
    // let { bankId } = useParams();
    // const bank = BankAPI.getBankBy(bankId, list);
    // return(
    //     <div className="checkout-page">
    //         <CheckoutPageLayout obj={bank} order={order}/>
    //         {bank ? <CheckoutPageLayout obj={bank} order={order}/>
    //         : Notifications.Warning("Loading Data...")}
    //     </div>
    // );
}
// calculate total $ of order
const totalPrice = (items) => {
    var total = 0;
    items.forEach((x) => {
      total += x.item.price * x.amount;
    });
    return total;
  };
export default CheckoutPage;