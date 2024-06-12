import React, {useContext, useState} from "react";
import "./index.css";
import SettingsIcon from "@mui/icons-material/Settings";
import CloseIcon from "@mui/icons-material/Close";
import SettingsItem from "./components/SettingsItem/SettingsItem";
import {IconButton} from "@mui/material";
import AppStatusContext from "../../shared/states/AppStatus/context";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import PrintIcon from "@mui/icons-material/Print";
import LanguageIcon from "@mui/icons-material/Translate";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import TooltipProvider from "../../shared/components/TooltipProvider/TooltipProvider";

function SettingsDashboard({performanceMode = false}) {
    const {dark, changeDark, lang, changeLang} = useContext(AppStatusContext);
    const [showSettings, setShowSettings] = useState(false);
    const navigate = useNavigate();
    const {t} = useTranslation();

    const toggleSettings = () => setShowSettings(!showSettings);

    const renderSettingsItem = (icon, property, onClick, content, label, onOff = undefined) => (
        <TooltipProvider performanceMode={performanceMode} dark={dark} content={t(content)}>
            <SettingsItem
                icon={icon}
                property={property}
                onClick={onClick}
                dark={dark}
                performanceMode={performanceMode}
                onOff={onOff}
            >
                {t(label)}
            </SettingsItem>
        </TooltipProvider>
    );

    return (
        <>
            <IconButton
                className="settings-icon-button"
                color={!showSettings ? "info" : "error"}
                onClick={toggleSettings}
            >
                {showSettings ? <CloseIcon/> : <SettingsIcon/>}
            </IconButton>
            {showSettings && (
                <div className="settings-overlay">
                    <div
                        className={`settings-dashboard-container ${dark ? 'dark' : ''} ${performanceMode ? 'performance' : ''}`}>
                        <div className="settings-dashboard-header">{t('settings')}</div>
                        <hr className={`settings-divider ${dark ? 'dark' : ''}`}/>
                        <div className="settings-dashboard-body">
                            <div className="settings-dashboard-active-area">
                                {renderSettingsItem(
                                    <DarkModeIcon/>, null, changeDark, 'changeThemeInfo', 'dark-mode', dark)}
                                {renderSettingsItem(<LanguageIcon/>, lang, changeLang, 'changeLangInfo', 'lang')}
                            </div>
                            <div className="settings-dashboard-active-area">
                                {renderSettingsItem(
                                    <PrintIcon/>, null, () => navigate("/receipt/print-test"), 'printTestInfo', 'print-test')}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default SettingsDashboard;
