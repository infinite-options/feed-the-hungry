import React from 'react';
const Messages = {
    Danger: function(msg) {
        return (
            <article className="message is-danger">
                <div className="message-body">
                    {msg}
                </div>
            </article>
        );
    },
    Success: function(msg){
        return (
            <article className="message is-success">
                <div className="message-body">
                    {msg}
                </div>
            </article>
        );
    }
}
export default Messages;