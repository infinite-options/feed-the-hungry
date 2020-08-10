import React, {useState} from 'react';
import EmptyCartPage from 'pages/Error/EmptyCartPage';
import Carousel from "pages/Checkout/Carousel";
import ScrollToTopOnMount from "utils/Scroll/ScrollToTopOnMount";
import CheckoutForm from "pages/Checkout/CheckoutForm";
import './style.css';
import LoadingPage from 'pages/Error/LoadingPage';
import ErrorPage from 'pages/Error/ErrorPage';

function CheckoutPage({api}){
    const user = JSON.parse(window.localStorage.getItem('userInfo'));

    if (api.isLoading) return <LoadingPage />;
    if (api.hasError || !user) return <ErrorPage />;

    const bank = api.getBankBy("foodbank_id", user.cart.bankId);
    if (!user.cart.total || user.cart.total === 0)  return <EmptyCartPage />;
    return <Checkout bank={bank} user={user}/>
}

const Checkout = ({bank, user}) => {
    const cart = user.cart;
    const [key, setKey] = useState(1);
    window.addEventListener("storage", () => {
        setKey(key + 1);
    });

    return (
        <div className="bd-main is-fullheight-with-navbar">
            <div className="checkout-page-layer">
                <ScrollToTopOnMount />
                <div className="checkout-page-content">
                    <div className="checkout-page-title">
                    <p className="title is-4">{bank.fb_name}</p>
                    </div>
                    <div key={key} className="checkout-page-body">
                        <div className="order-items">
                        <Carousel itemList={cart.items} />
                        </div>
                        <div className="order-confirm fade-in-quick">
                            <CheckoutForm bank={bank} items={cart.items} />
                        </div>
                    </div>
                </div>
                </div>
          </div>
        );

}
export default CheckoutPage;