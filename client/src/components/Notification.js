import React from 'react';

import '../main.css';

const Notifications = ({ listOfUserInRoom }) => {

    if (listOfUserInRoom) {
        return (
            <div className="notificationContainer">
                <div className="listOfUserInRoomContainer">
                    {
                        listOfUserInRoom.map((user) => {
                            const { name } = user;
                            return (
                                <div className="userInRoom">
                                    <p>{name}</p>
                                </div>
                            );

                        })
                    }
                </div>
            </div>
        )
    } else {
        return null; // null simply don't render
    }

};

export default Notifications;