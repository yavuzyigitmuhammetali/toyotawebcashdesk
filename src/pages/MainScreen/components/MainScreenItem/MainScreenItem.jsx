import React from 'react';
import "./mainScreenItem.css";
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import {Link} from "react-router-dom";

const MainScreenItem = React.memo(function MainScreenItem({
                                                              children,
                                                              customIcon: CustomIcon = CurrencyBitcoinIcon,
                                                              color = "#3D526D",
                                                              dark = false,
                                                              to,
                                                              performanceMode = false
                                                          }) {
    return (
        <Link
            to={to}
            className={`main-screen-item-container ${dark ? 'dark' : ''} ${performanceMode ? 'performance-mode' : ''}`}
        >
            <div className={`main-screen-item-icon ${dark ? 'dark' : ''}`} style={{backgroundColor: color}}>
                <CustomIcon/>
            </div>
            <div className="main-screen-item-text">{children}</div>
        </Link>
    );
});

export default MainScreenItem;