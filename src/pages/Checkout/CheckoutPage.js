import React from 'react';
import { useRouteMatch, useParams, useHistory } from 'react-router-dom';
import BankAPI from 'API/BankAPI';
import BankLayout from 'pages/Bank/BankLayout';
import Notifications from 'components/Notifications/Notifications';
import CheckoutPageLayout from 'pages/Checkout/CheckoutPageLayout';
import './style.css';
function CheckoutPage({ list, order}){
    let { bankId } = useParams();
    const bank = BankAPI.getBankBy(bankId, list);
    return(
        <div className="checkout-page">
            {bank ? <CheckoutPageLayout obj={bank} order={order}/>
            : Notifications.Warning("Loading Data...")}
        </div>
    );
}
export default CheckoutPage;