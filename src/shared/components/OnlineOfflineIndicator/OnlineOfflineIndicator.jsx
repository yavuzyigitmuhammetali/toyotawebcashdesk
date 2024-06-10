// Filename: OnlineOfflineIndicator.jsx
import React from 'react';
import './onlineOfflineIndicator.css';

const OnlineOfflineIndicator = React.memo(({
                                               online = false,
                                               language = 'en',
                                               dark = false,
                                               performanceMode = false
                                           }) => {
    const circleSize = 5;
    const languageText = {
        en: {online: "Online", offline: "Offline"},
        tr: {online: "Çevrimiçi", offline: "Çevrimdışı"},
    };

    return (
        <div className={`indicator ${dark ? 'dark' : ''}`}>
            <div className={online ? 'online' : 'offline'}>
                {online ? languageText[language].online : languageText[language].offline}
            </div>
            <div className="circle-container">
                {performanceMode ? (
                    <svg width="20" height="20">
                        <circle cx="10" cy="10" r={circleSize} fill={online ? "green" : "red"}/>
                    </svg>
                ) : (
                    <svg width="20" height="20">
                        <circle cx="10" cy="10" r={circleSize} fill={online ? "green" : "red"} id="point"/>
                        <circle cx="10" cy="10" r={circleSize} fill="none" stroke={online ? "green" : "red"}
                                strokeWidth="2">
                            <animate attributeName="r" from={circleSize} to={circleSize * 2} dur="1s" begin="0s"
                                     repeatCount="indefinite"/>
                            <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0s"
                                     repeatCount="indefinite"/>
                        </circle>
                    </svg>
                )}
            </div>
        </div>
    );
});

export default OnlineOfflineIndicator;
