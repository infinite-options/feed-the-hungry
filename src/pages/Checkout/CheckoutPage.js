import React from 'react';
import { useRouteMatch, useParams } from 'react-router-dom';
import BankAPI from 'API/BankAPI';
import BankLayout from 'pages/Bank/BankLayout';
import Notifications from 'components/Notifications/Notifications';
import CheckoutPageLayer from 'pages/Checkout/CheckoutPageLayer';
import './style.css';
function CheckoutPage({list}){
    let { bankId } = useParams();
    let {path, url} = useRouteMatch();
    const bank = BankAPI.getBankBy(bankId, list);
    return(
        <div className="checkout-page">
            {bank ? <CheckoutPageLayer obj={bank}/>
            : Notifications.Warning("Loading Data...")}
        </div>
    );
}
export default CheckoutPage;