import React, {useState} from 'react';
import EmptyCartPage from 'pages/Error/EmptyCartPage';
import Carousel from "pages/Checkout/Carousel";
import ScrollToTopOnMount from "utils/Scroll/ScrollToTopOnMount";
import CheckoutForm from "pages/Checkout/CheckoutForm";
import './style.css';
import { useOurApi } from 'API/useOurApi';
import LoadingPage from 'pages/Error/LoadingPage';
import ErrorPage from 'pages/Error/ErrorPage';

function CheckoutPage(){
    // retrieve cart items from local storage
    const cart = JSON.parse(window.localStorage.getItem('cart')) || {};
    const bankId = cart.bankId ? cart.bankId : "";
    const bankData = JSON.parse(window.localStorage.getItem(bankId));

    if (bankData) return <CheckoutWithoutApi bank={bankData} />
    return <CheckoutWithApi bankId = {bankId}/>
}
const CheckoutWithApi = ({bankId}) => {
    const url = `https://dc3so1gav1.execute-api.us-west-1.amazonaws.com/dev/api/v2/foodbankinfonew/${bankId}`
    const { data, isLoading, hasError } = useOurApi(url, {});
    const bankData = data.result;
    
    if (isLoading) return <LoadingPage />
    if (hasError) return <ErrorPage />
    return <Checkout bank={bankData}/>

}
const CheckoutWithoutApi = ({bank}) => {
    return <Checkout bank={bank} />
}
const Checkout = ({bank}) => {
    const cart = JSON.parse(window.localStorage.getItem('cart')) || {};
    const cartItems = cart.items ? cart.items : []
    const [key, setKey] = useState(1);
    window.addEventListener("storage", () => {
        setKey(key + 1);
    });

    if (cartItems.length === 0) return <EmptyCartPage />;
    return (
        <div className="checkout-page">
            <div className="checkout-page-layer">
                <ScrollToTopOnMount />
                <div className="checkout-page-content">
                    <div className="checkout-page-title">
                    <p className="title is-4">{bank.fb_name}</p>
                    </div>
                    <div key={key} className="checkout-page-body">
                        <div className="order-items">
                        <Carousel itemList={cartItems} />
                        </div>
                        <div className="order-confirm fade-in-quick">
                            <CheckoutForm bank={bank} items={cartItems} />
                        </div>
                    </div>
                </div>
                </div>
          </div>
        );

}
export default CheckoutPage;