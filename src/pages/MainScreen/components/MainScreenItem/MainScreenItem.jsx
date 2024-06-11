// src/pages/MainScreen/components/MainScreenItem/MainScreenItem.jsx
import React from 'react';
import "./mainScreenItem.css";
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import {Link} from "react-router-dom";


function MainScreenItem({children, customIcon, color = "#3D526D", dark = false, to, performanceMode = false}) {
    const IconComponent = customIcon || CurrencyBitcoinIcon;

    return (
        <Link to={to}
              className={`main-screen-item-container ${dark ? 'dark' : ''} ${performanceMode ? 'performance-mode' : ''}`}>
            <div className={`main-screen-item-icon ${dark ? 'dark' : ''}`} style={{backgroundColor: color}}>
                <IconComponent/>
            </div>
            <div className="main-screen-item-text">{children}</div>
        </Link>
    );
}

export default MainScreenItem;
