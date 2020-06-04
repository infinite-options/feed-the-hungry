import React from 'react';
import Rice from '../image/rice.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Icons from '../icons/Icons';

function Cart(){
    return (
        <div className="cart-page">
            <div className="cart-container">
                <div className="columns">
                    <div className="column is-7">
                        <div className="delivery-or-pickup">
                            <p className="title is-4">Delivery or Pickup</p>
                            <div className="items-container">
                                <div className="item cart-item">
                                    <span className="icon delete-item">
                                        <FontAwesomeIcon icon={Icons.faTrashAlt} style={{fontSize: 20 }} />
                                    </span>
                                    <div className="columns">
                                        <div className="column is-7 flex-center">
                                            <div className="item-image-container">
                                                <figure className="image is-square">
                                                    <img className="is-rounded" src={Rice} alt=""></img>
                                                </figure>
                                            </div>
                                            <div className="item-header">
                                                <p className="title is-5">Item</p>
                                                <p className="subtitle is-6">
                                                    Unit
                                                </p>      
                                            </div>
                                        </div>
                                        <div className="column is-5 flex-center">
                                            <div className="item-action">
                                                <div className="field is-grouped is-grouped-multiline">
                                                    <div className="control">
                                                        <span className="icon decrease-qty">
                                                            <FontAwesomeIcon icon={Icons.faChevronDown} />
                                                        </span>
                                                    </div>
                                                    <div className="control amount">
                                                        <span  className="title is-6">
                                                        1
                                                        </span>
                                                    </div>
                                                    <div className="control">
                                                        <span className="icon increase-qty">
                                                            <FontAwesomeIcon icon={Icons.faChevronUp} />
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="item cart-item">
                                    <span className="icon delete-item">
                                        <FontAwesomeIcon icon={Icons.faTrashAlt} style={{fontSize: 20 }} />
                                    </span>
                                    <div className="columns">
                                        <div className="column is-7 flex-center">
                                            <div className="item-image-container">
                                                <figure className="image is-square">
                                                    <img className="is-rounded" src={Rice} alt=""></img>
                                                </figure>
                                            </div>
                                            <div className="item-header">
                                                <p className="title is-5">Item</p>
                                                <p className="subtitle is-6">
                                                    Unit
                                                </p>      
                                            </div>
                                        </div>
                                        <div className="column is-5 flex-center">
                                            <div className="item-action">
                                                <div className="field is-grouped is-grouped-multiline">
                                                    <div className="control">
                                                        <span className="icon decrease-qty">
                                                            <FontAwesomeIcon icon={Icons.faChevronDown} />
                                                        </span>
                                                    </div>
                                                    <div className="control amount">
                                                        <span  className="title is-6">
                                                        1
                                                        </span>
                                                    </div>
                                                    <div className="control">
                                                        <span className="icon increase-qty">
                                                            <FontAwesomeIcon icon={Icons.faChevronUp} />
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="item cart-item">
                                    <span className="icon delete-item">
                                        <FontAwesomeIcon icon={Icons.faTrashAlt} style={{fontSize: 20 }} />
                                    </span>
                                    <div className="columns">
                                        <div className="column is-7 flex-center">
                                            <div className="item-image-container">
                                                <figure className="image is-square">
                                                    <img className="is-rounded" src={Rice} alt=""></img>
                                                </figure>
                                            </div>
                                            <div className="item-header">
                                                <p className="title is-5">Item</p>
                                                <p className="subtitle is-6">
                                                    Unit
                                                </p>      
                                            </div>
                                        </div>
                                        <div className="column is-5 flex-center">
                                            <div className="item-action">
                                                <div className="field is-grouped is-grouped-multiline">
                                                    <div className="control">
                                                        <span className="icon decrease-qty">
                                                            <FontAwesomeIcon icon={Icons.faChevronDown} />
                                                        </span>
                                                    </div>
                                                    <div className="control amount">
                                                        <span  className="title is-6">
                                                        1
                                                        </span>
                                                    </div>
                                                    <div className="control">
                                                        <span className="icon increase-qty">
                                                            <FontAwesomeIcon icon={Icons.faChevronUp} />
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="delivery">
                            <p className="title is-4">Delivery Only</p>
                            <div className="items-container">
                                <div className="item cart-item">
                                    <span className="icon delete-item">
                                        <FontAwesomeIcon icon={Icons.faTrashAlt} style={{fontSize: 20 }} />
                                    </span>
                                    <div className="columns">
                                        <div className="column is-7 flex-center">
                                            <div className="item-image-container">
                                                <figure className="image is-square">
                                                    <img className="is-rounded" src={Rice} alt=""></img>
                                                </figure>
                                            </div>
                                            <div className="item-header">
                                                <p className="title is-5">Item</p>
                                                <p className="subtitle is-6">
                                                    Unit
                                                </p>      
                                            </div>
                                        </div>
                                        <div className="column is-5 flex-center">
                                            <div className="item-action">
                                                <div className="field is-grouped is-grouped-multiline">
                                                    <div className="control">
                                                        <span className="icon decrease-qty">
                                                            <FontAwesomeIcon icon={Icons.faChevronDown} />
                                                        </span>
                                                    </div>
                                                    <div className="control amount">
                                                        <span  className="title is-6">
                                                        1
                                                        </span>
                                                    </div>
                                                    <div className="control">
                                                        <span className="icon increase-qty">
                                                            <FontAwesomeIcon icon={Icons.faChevronUp} />
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="column is-5">
                        <div className="total-items-container">
                            <p className="title is-4">Order Summary</p>
                            <div className="total-items">
                                <div className="columns">
                                    <div className="column is-2">
                                        <p className="title is-6">Items</p>
                                    </div>
                                    <div className="column is-2">
                                        <p className="title is-6">2</p>
                                    </div>
                                    <div className="column is-8 right-most">
                                        <p className="title is-6">$40</p>
                                    </div>
                                </div>
                            </div>
                            <button className="button checkout-btn">Check Out</button>
                            <a href="/banks" className="title is-6 back-to-shopping">
                                <span className="icon icon-wrapper">
                                    <FontAwesomeIcon icon={Icons.faLongArrowAltLeft} />    
                                </span>    
                                Back to Shopping
                            </a>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    );
}
export default Cart;