import React from 'react';
import ReactEmoji from 'react-emoji';

import '../main.css';

const Message = ({ message, name }) => {
    // check if this chat record is send by "this user" or someone else
    let msgFromThisUser = false;
    const trimmedName = name.trim().toLowerCase();
    if (message.userName === trimmedName) {
        msgFromThisUser = true;
    }

    console.log(message);
    console.log(trimmedName);

    // emojify message text
    // const text = ReactEmoji.emojify(message.text);
    const text = message.text;

    if (msgFromThisUser) {
        return (
            <div className="messageContainer myMessageContainer">
                <p className="messageSender myMessageSender">{message.userName}</p>
                <div className="messageBox myMessage">
                    <p className="messageContent myMessageContent">{text}</p>
                </div>
            </div>
        )
    } else {
        // message is NOT sent by this user
        return (
            <div className="messageContainer otherMessageContainer">
                <div className="messageBox otherMessage">
                    <p className="messageContent otherMessageContent">{text}</p>
                </div>
                <p className="messageSender otherMessageSender">{message.userName}</p>
            </div>
        )
    }
}

export default Message;