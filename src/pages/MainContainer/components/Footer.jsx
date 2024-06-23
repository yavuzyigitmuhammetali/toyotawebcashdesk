import React from 'react';
import OnlineOfflineIndicator from "../../../shared/components/OnlineOfflineIndicator/OnlineOfflineIndicator";

const Footer = ({dark, lang, isOnline, formattedDate, status, t, performanceMode}) => (
    <footer className="main-container__footer">
        <OnlineOfflineIndicator
            performanceMode={performanceMode}
            dark={dark}
            language={lang}
            online={isOnline}
        />
        <time>{formattedDate}</time>
        <div className="status-container">
            <span>{t("cashRegister")}: {status.case}</span>
            <span>{t("store")}: {status.storeNumber}</span>
        </div>
    </footer>
);

export default React.memo(Footer);