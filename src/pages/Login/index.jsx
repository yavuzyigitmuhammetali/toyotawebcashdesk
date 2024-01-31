import React from 'react';
import "./loginIndex.css"
import LoginPageLeftArea from "./LoginPageLeftArea";
import LoginPageRightArea from "./LoginPageRightArea";

function LoginPage({dark = false}) {
    return (
        <div style={{backgroundColor: dark ? "#111418" : "#E9ECF7"}} className="login-page-container">
            <div className="login-page-left-area"><LoginPageLeftArea/></div>

        </div>
    );
}

export default LoginPage;