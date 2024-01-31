import React from 'react';
import "./loginPage.css"
import LoginPageLeftArea from "./LoginPageLeftArea";
import LoginPageRightArea from "./LoginPageRightArea";

function LoginPage({dark = true}) {
    return (
        <div style={{backgroundColor: dark ? "#111418" : "#E9ECF7"}} className="login-page-container">
            <div className="login-page-left-area"><LoginPageLeftArea dark={dark}/></div>
            <div className="login-page-right-area"><LoginPageRightArea dark={dark}/></div>
        </div>
    );
}

export default LoginPage;