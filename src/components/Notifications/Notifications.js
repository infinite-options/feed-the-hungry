import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';

const Notifications = {
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
    Warning: function(msg){
        return (
            <div className="notification is-warning is-light">
                <div className="icon">
                    <FontAwesomeIcon icon={faCircleNotch} spin />
                </div>
                {msg}
            </div>
        )
    }
}
export default Notifications;