import React from 'react';
import './style.css';
import EmptyCart from 'assets/image/empty-cart.png';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Icons from 'components/Icons/Icons';
function EmptyCartPage() {
    return(
        <div className="not-found-page">
            <div className="not-found-page-body"> 
                <figure className="image is-128x128">
                <img src={EmptyCart} alt="Not-found image"/>
                </figure>   
                <div className="not-found-page-content">
                <p className="title is-6 has-text-grey">Your cart is empty</p>
                <Link to="/"><button className="button is-green">
                    {/* <span className="icon"><FontAwesomeIcon icon={Icons.faLongArrowAltLeft} /></span> */}
                    <span>Shop Now</span></button></Link>
                </div>   
            </div>
        </div>
    );
}
export default EmptyCartPage;