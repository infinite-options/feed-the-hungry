import React from 'react';
import {Link, useParams, useRouteMatch, useLocation} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import EmptyCart from 'assets/image/empty-cart.svg';
import './style.css';

// use this component when you want to display a notification 
// notification should only be used at the top
// consider using Messages for smaller components
const Notifications = {
    // red (danger). this notification is red
    Danger: function(msg){
        return (
            <div className="notification is-danger is-light">
                <div className="icon">
                    <FontAwesomeIcon icon={faCircleNotch} spin />
                </div>
                {msg}
            </div>
        )
    },
    // yellow (warning). this notification is yellow
    Warning: function(msg){
        return (
            <div className="notification is-warning is-light">
                <div className="icon">
                    <FontAwesomeIcon icon={faCircleNotch} spin />
                </div>
                {msg}
            </div>
        )
    },
    // this notification is for empty cart at checkout
    IsEmpty: function(msg){
        let { path, url } = useRouteMatch();
        let parentPath = url.substring(0, url.lastIndexOf("/"));
        return (
            <div className="is-empty-message">
                <figure class="image is-128x128">
                    <img src={EmptyCart} />
                </figure>
                <p className="title is-5 has-margin-top-1-5">{msg}</p>
        <Link to={parentPath}><button className="button is-danger">Shop Now</button></Link>
            </div>
        );
    }
}
export default Notifications;