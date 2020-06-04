import React from 'react';

const Notifications = {
    Danger: function(msg){
        return (
            <div className="notification is-danger is-light">
                {msg}
            </div>
        )
    }
}
export default Notifications;