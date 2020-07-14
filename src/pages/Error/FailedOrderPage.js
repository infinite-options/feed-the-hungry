import React from 'react';
import './style.css';
import FailedOrder from 'assets/image/failed-order.svg';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Icons from 'components/Icons/Icons';
function FailedOrderPage() {
    return(
        <div className="not-found-page">
            <div className="not-found-page-body"> 
                <figure className="image is-128x128">
                <img src={FailedOrder} alt="Not-found image"/>
                </figure>   
                <div className="not-found-page-content">
                <p className="title is-6 has-text-grey">Oh no! A problem occurred when we were trying to process your order.</p>
                <p className="subtitle is-bold is-6 has-text-grey ">Your order could not be placed.</p>
                <div className="space-1-5"></div>
                <Link to="/"><button className="button is-danger"><span>Contact Support</span></button></Link>
                </div>   
            </div>
        </div>
    );
}
export default FailedOrderPage;