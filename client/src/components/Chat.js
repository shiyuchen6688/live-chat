import react, { useState, useEffect } from 'react';

import queryString from 'query-string'; // utlity to parse or format URL
import io from 'socket.io-client';

import InfoBar from './InfoBar';
import Input from './Input';
import ChatRecord from './ChatRecord';
import Notification from './Notification';

import '../main.css';



let socket;


// react router give us location prop
const Chat = ({ location }) => {
    console.log("component rerendered");
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');

    const ENDPOINT = 'localhost:5000';

    const [message, setMessage] = useState('');
    const [listOfMessage, setListOfMessage] = useState([]);
    const [listOfUserInRoom, setListOfUserInRoom] = useState([]);


    useEffect(() => {
        // location.search is what after ? in the URL, parse to object
        const parsedURLSearch = queryString.parse(location.search);
        const { room, name } = parsedURLSearch;

        socket = io(ENDPOINT, { transports: ["websocket", "polling", "flashsocket"] });

        setRoom(room);
        setName(name);

        socket.emit('join', { name, room }, ({ error }) => {
            alert(error);
        });

        // return clean up function
        return () => {
            // socket.emit('disconnect');
            socket.disconnect();
            socket.off(); // Unbind the specified event handler
        }
    }, [ENDPOINT, location.search]);

    useEffect(() => {
        // show user the message
        socket.on('message', (msg) => {
            // console.log(msg);
            setListOfMessage(listOfMessage => [...listOfMessage, msg]);
        })

        // show user who are in the room
        socket.on('roomInfo', ({ room, listOfUserInRoom }) => {
            // console.log(msg);
            setListOfUserInRoom(listOfUserInRoom);
        })
    }, []);



    function sendMessage(e) {
        e.preventDefault(); // avoid page refresh
        if (message) {
            socket.emit('userMessage', { message });
            setMessage('');
        }
    }

    console.log(message, listOfMessage);

    return (
        <div className="chatContainer">
            <div className="chatInnerContainer">
                <InfoBar room={room} />
                <ChatRecord listOfMessage={listOfMessage} name={name} />
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
            </div>
            <Notification listOfUserInRoom={listOfUserInRoom} />
        </div>
    );
};

export default Chat;