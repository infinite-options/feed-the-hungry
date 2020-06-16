import React from 'react';
const Messages = {
    Danger: function(msg) {
        return (
            <article class="message is-danger">
                <div class="message-body">
                    {msg}
                </div>
            </article>
        );
    },
    Success: function(msg){
        return (
            <article class="message is-success">
                <div class="message-body">
                    {msg}
                </div>
            </article>
        );
    }
}
export default Messages;