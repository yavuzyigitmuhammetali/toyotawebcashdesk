import React from 'react';
import "./mainScreenItem.css"
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import {Link} from "react-router-dom";
function MainScreenItem({children,customIcon,color="#3D526D",dark=false,to}) {
    const IconComponent = customIcon || CurrencyBitcoinIcon;
    return (
        <Link to={to} style={{backgroundColor:dark?"#1E1E1E":"white",color:dark?"white":"#111418",borderColor:dark?"white":"black",textDecoration:"none"}} className="main-screen-item-container">
            <div style={{backgroundColor:color,filter:dark?"brightness(1)":"brightness(1.7)"}} className="main-screen-item-icon">
                <IconComponent/>
            </div>
            <div className="main-screen-item-text">{children}</div>
        </Link>
    );
}

export default MainScreenItem;