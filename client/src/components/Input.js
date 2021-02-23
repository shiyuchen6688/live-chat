import React from 'react';

const Input = ({ message, setMessage, sendMessage }) => {

    function handleMessageChange(e) {
        setMessage(e.target.value);

    }

    function handleMessageKeyPress(e) {
        if (e.key === 'Enter') sendMessage(e);
    }

    return (
        <form className="messageForm">
            <input
                className="chatInput"
                type="text"
                placeholder="type a message ..."
                value={message}
                onChange={handleMessageChange}
                onKeyPress={handleMessageKeyPress}
            />
            <button
                className="chatButton"
                onClick={(e) => sendMessage(e)}>Send</button>
        </form>
    )
}

export default Input;