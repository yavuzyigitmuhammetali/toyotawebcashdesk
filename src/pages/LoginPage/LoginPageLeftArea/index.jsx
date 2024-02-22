import React from 'react';
import "./loginPageLeftArea.css"
import OnlineOfflineIndicator from "../../../shared/components/OnlineOfflineIndicator";
import LoginSrc from "./components/LoginSrc";
import StatusContext from "../../../shared/state/context";

function LoginPageLeftArea({width = "400px", dark = false}) {
    const {online,status} = React.useContext(StatusContext);


    return (
        <div style={{color: dark ? "white" : "#111418", width: width}} className="login-page-left-area-container">
            <div className="login-page-left-area-indicator">
                <OnlineOfflineIndicator online={online}/>
            </div>
            <LoginSrc dark={dark}/>
            <span className="login-page-left-area-texts good-wish">Store Number: {status.storeNumber}</span>
            <span className="login-page-left-area-texts welcome">WELCOME BACK</span>
            <span className="login-page-left-area-texts explanation">{status.version}</span>
        </div>
    );
}

export default LoginPageLeftArea;
