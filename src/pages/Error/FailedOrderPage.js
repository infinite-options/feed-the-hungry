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
                <figure class="image is-128x128">
                <img src={FailedOrder} alt="Not-found image"/>
                </figure>   
                <div className="not-found-page-content">
                <p className="title is-6 has-text-grey">Oh no! There was something wrong when we were trying to process your order.</p>
                {/* <Link to="/"><button className="button is-green"><span className="icon"><FontAwesomeIcon icon={Icons.faLongArrowAltLeft} /></span><span>Back Home</span></button></Link> */}
                </div>   
            </div>
        </div>
    );
}
export default FailedOrderPage;