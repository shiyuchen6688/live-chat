import React from 'react';

import '../main.css';

import onlineIcon from '../images/onlineIcon.png';
import closeIcon from '../images/closeIcon.png';

const InfoBar = ({ room }) => {
    return (
        <div className="InfoBarcontainer">
            <div className="leftContainer">
                <img className="imageIcon" src={onlineIcon} alt="online image" />
                <h3>{room}</h3>
            </div>
            <div className="rightContainer">
                <a href="/"><img src={closeIcon} alt="close image" /></a>
            </div>
        </div>
    )
};

export default InfoBar;