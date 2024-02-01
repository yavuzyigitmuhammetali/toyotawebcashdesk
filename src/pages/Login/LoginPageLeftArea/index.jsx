import React, {useEffect, useState} from 'react';
import "./loginPageLeftArea.css"
import OnlineOfflineIndicator from "../../../shared/componenets/OnlineOfflineIndicator";
import {checkOnline} from "../../../shared/functions/checkOnline";
import {getStatus} from "./api";
import LoginSrc from "./componenets/LoginSrc";

function LoginPageLeftArea({width = "400px", dark = false}) {
    const [status, setStatus] = useState({});
    const [online, setOnline] = useState(true)

    useEffect(() => {
        getStatus().then(response =>setStatus(response.data));
        const handleOnline = async () => {
            try {
                const result = await checkOnline();
                setOnline(result);
            } catch (error) {
                console.error('Error:', error);
            }
        };
        handleOnline();
    }, []);

    return (
        <div style={{color: dark ? "white" : "#111418", width: width}} className="login-page-left-area-container">
            <div className="login-page-left-area-indicator">
                <OnlineOfflineIndicator online={online}/>
            </div>
            <LoginSrc dark={dark}/>
            <span className="login-page-left-area-texts good-wish">Store Number: {status.store_number}</span>
            <span className="login-page-left-area-texts welcome">WELCOME BACK</span>
            <span className="login-page-left-area-texts explanation">{status.version}</span>
        </div>
    );
}

export default LoginPageLeftArea;
