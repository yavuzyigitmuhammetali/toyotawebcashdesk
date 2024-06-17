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
import SpeedIcon from '@mui/icons-material/Speed';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import TooltipProvider from "../../shared/components/TooltipProvider/TooltipProvider";
import {clearEverything} from "../../utils/clearEverything";

function SettingsDashboard() {
    const {dark, changeDark, lang, changeLang, changePerformanceMode, performanceMode} = useContext(AppStatusContext);
    const [showSettings, setShowSettings] = useState(false);
    const navigate = useNavigate();
    const {t} = useTranslation();

    const toggleSettings = () => setShowSettings(!showSettings);

    const renderSettingsItem = (icon, property, onClick, content, label, onOff = undefined, color = "#3874CB") => (
        <TooltipProvider performanceMode={performanceMode} dark={dark} content={t(content)}>
            <SettingsItem
                icon={icon}
                property={property}
                onClick={onClick}
                dark={dark}
                performanceMode={performanceMode}
                onOff={onOff}
                color={color}
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
                        className={`settings-dashboard-container ${performanceMode ? 'performance' : ''}`}>
                        <div className="settings-dashboard-header">{t('settings')}</div>
                        <hr className={`settings-divider`}/>
                        <div className="settings-dashboard-body">
                            <div className="settings-dashboard-active-area">
                                {renderSettingsItem(
                                    <DarkModeIcon/>, null, changeDark, 'changeThemeInfo', 'dark-mode', dark, "")}
                                {renderSettingsItem(
                                    <LanguageIcon/>, lang, changeLang, 'changeLangInfo', 'lang', undefined, undefined)}
                                {renderSettingsItem(
                                    <RotateLeftIcon/>, null, () => clearEverything(), 'fullResetInfo', 'fullReset', undefined, undefined)}
                            </div>
                            <div className="settings-dashboard-active-area">
                                {renderSettingsItem(
                                    <PrintIcon/>, null, () => navigate("/receipt/print-test"), 'printTestInfo', 'print-test', undefined, undefined)}
                                {renderSettingsItem(
                                    <SpeedIcon/>, "(𝕓𝕖𝕥𝕒)", changePerformanceMode, 'performanceModeInfo', 'performanceMode', performanceMode, "")}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default SettingsDashboard;
