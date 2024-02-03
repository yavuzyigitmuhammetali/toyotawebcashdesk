import React, {useEffect, useState} from 'react';
import "./loginPageLeftArea.css"
import OnlineOfflineIndicator from "../../../shared/components/OnlineOfflineIndicator";
import {getStatus} from "./api";
import LoginSrc from "./components/LoginSrc";

function LoginPageLeftArea({width = "400px", dark = false}) {
    const [status, setStatus] = useState({});

    useEffect(() => {
        getStatus().then(response =>setStatus(response.data)).catch(err=>console.log(err));
    }, []);

    return (
        <div style={{color: dark ? "white" : "#111418", width: width}} className="login-page-left-area-container">
            <div className="login-page-left-area-indicator">
                <OnlineOfflineIndicator/>
            </div>
            <LoginSrc dark={dark}/>
            <span className="login-page-left-area-texts good-wish">Store Number: {status.store_number}</span>
            <span className="login-page-left-area-texts welcome">WELCOME BACK</span>
            <span className="login-page-left-area-texts explanation">{status.version}</span>
        </div>
    );
}

export default LoginPageLeftArea;
