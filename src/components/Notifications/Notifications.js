import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';

const Notifications = {
    // red (danger)
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
    // yellow (warning)
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