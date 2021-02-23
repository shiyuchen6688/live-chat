import react, { useState } from 'react';
import { Link } from 'react-router-dom';

import '../main.css';

const Join = () => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');

    // change value of name and room variable base on user input
    function handleInputChange(e) {
        const value = e.target.value;
        const id = e.target.id;
        if (id === "name") setName(value);
        else if (id === "room") setRoom(value);
    }

    // when user click Join button, validate if we need to prevent the transaction
    function handleJoinButtonClick(e) {
        return (!(name && room)) ? e.preventDefault() : null;
    }

    return (
        <div className="joinContainer">
            <div className="joinInnerContainer">
                <h1 className="heading">Join</h1>
                <input id="name" className="joinInput" type="text" placeholder="Name" onChange={handleInputChange}></input>
                <input id="room" className="joinInput" type="text" placeholder="Room" onChange={handleInputChange}></input>
                {/* react component that allows me to do more than a link, also no refresh */}
                <Link to={`/chat?room=${room}&name=${name}`} onClick={handleJoinButtonClick}>
                    <button className="button" type="submit">Join</button>
                </Link>
            </div>
        </div>
    );
};

export default Join;