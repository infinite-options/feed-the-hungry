import React from 'react';
import './style.css';
import EmptyCart from 'assets/image/empty-cart.png';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Icons from 'components/Icons/Icons';
import ScrollToTop from 'utils/Scroll/SrollToTop';
function EmptyCartPage() {
    return(
        <div className="bd-main is-fullheight-with-navbar">
                <ScrollToTop />
                <div className="empty-cart-msg" >
                <div className="container">
                <figure className="image is-128x128">
                <img src={EmptyCart} alt="Not-found image"/>
                </figure>   
                <div className="not-found-page-content">
                <p className="title is-6 has-text-grey">Your cart is empty</p>
                <Link to="/banks"><button className="button is-green">
                    <span>Shop Now</span></button></Link>
                </div>   
                </div>
            </div>
        </div>
    );
}
export default EmptyCartPage;