import React from 'react';
import PropTypes from 'prop-types';
import styles from './OnlineOfflineIndicator.module.css';

const languageText = {
    en: {online: "Online", offline: "Offline"},
    tr: {online: "Çevrimiçi", offline: "Çevrimdışı"},
};

const OnlineOfflineIndicator = React.memo(({
                                               online = false,
                                               language = 'en',
                                               dark = false,
                                               performanceMode = false
                                           }) => {
    const circleSize = 5;

    return (
        <div className={`${styles.indicator} ${dark ? styles.dark : ''}`}>
            <div className={online ? styles.online : styles.offline}>
                {online ? languageText[language].online : languageText[language].offline}
            </div>
            <div className={styles.circleContainer} aria-hidden="true">
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

OnlineOfflineIndicator.propTypes = {
    online: PropTypes.bool,
    language: PropTypes.oneOf(['en', 'tr']),
    dark: PropTypes.bool,
    performanceMode: PropTypes.bool,
};

export default OnlineOfflineIndicator;

