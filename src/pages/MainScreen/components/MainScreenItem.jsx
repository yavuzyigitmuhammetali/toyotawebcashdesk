import React from 'react';
import "./mainScreenItem.css"
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
function MainScreenItem({children,customIcon,color="#3D526D",dark=false}) {
    const IconComponent = customIcon || CurrencyBitcoinIcon;
    return (
        <div style={{backgroundColor:dark?"#1E1E1E":"white",color:dark?"white":"#111418",borderColor:dark?"white":"black"}} className="main-screen-item-container">
            <div style={{backgroundColor:color,filter:dark?"brightness(1)":"brightness(1.7)"}} className="main-screen-item-icon">
                <IconComponent/>
            </div>
            <div className="main-screen-item-text">{children}</div>
        </div>
    );
}

export default MainScreenItem;