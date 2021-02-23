import React from 'react';
import ScrollToottom from 'react-scroll-to-bottom';

import Message from './Message';
import '../main.css';



const ChatRecord = ({ listOfMessage, name }) => {
    return (
        <ScrollToottom debug={false} className="chatRecord">
            {

                listOfMessage.map((msg, i) => {
                    return (
                        <div key={i}>
                            <Message message={msg} name={name} />
                        </div>
                    );
                })
            }
        </ScrollToottom>
    )
}

export default ChatRecord;