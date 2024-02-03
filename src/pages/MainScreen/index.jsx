import React from 'react';
import "./mainScreen.css"
import OnlineOfflineIndicator from "../../shared/componenets/OnlineOfflineIndicator";

function MainScreen() {
    return (
        <>
            <div className="main-screen-container">
                <div className="main-screen-active-area">
                    <div className="main-screen-sides">
                        <div>DENEME</div>
                        <div>DENEME</div>
                        <div>DENEME</div>
                        <div>DENEME</div>
                    </div>
                    <div className="main-screen-sides">
                        <div>DENEME</div>
                        <div>DENEME</div>
                        <div>DENEME</div>
                        <div>DENEME</div>
                    </div>
                </div>
            </div>
            <div className="main-screen-lower-left" >
                <OnlineOfflineIndicator/>
            </div>
            <div className="main-screen-upper-left">SOLÜST</div>
            <div className="main-screen-upper-right">SAĞÜST</div>
            <div className="main-screen-lower-right">SAĞALT</div>
        </>

    );
}

export default MainScreen;