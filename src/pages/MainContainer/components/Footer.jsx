import React from 'react';
import OnlineOfflineIndicator from "../../../shared/components/OnlineOfflineIndicator/OnlineOfflineIndicator";


const Footer = ({dark, lang, isOnline, formattedDate, status, t}) => (
    <footer className={`main-container-footer ${dark ? 'dark' : ''}`}>
        <div>
            <OnlineOfflineIndicator dark={dark} language={lang} online={isOnline}/>
        </div>
        <div>{formattedDate}</div>
        <div className="status-container">
            <span>{t("cashRegister")}: {status.case}</span>
            <span>{t("store")}: {status.storeNumber}</span>
        </div>
    </footer>
);

export default Footer;