import React, {useContext, useState} from "react";
import "./settingsDashboard.css";
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

function SettingsDashboard() {
    const {dark, changeDark, lang, changeLang} = useContext(AppStatusContext);
    const [showSettings, setShowSettings] = useState(false);
    const navigate = useNavigate();
    const {t} = useTranslation();

    const toggleSettings = () => setShowSettings(!showSettings);
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
                    <div className={`settings-dashboard-container ${dark ? 'dark' : ''}`}>
                        <div className="settings-dashboard-header">{t('settings')}</div>
                        <hr className={`settings-divider ${dark ? 'dark' : ''}`}/>
                        <div className="settings-dashboard-body">
                            <div className="settings-dashboard-active-area">
                                <SettingsItem
                                    icon={<DarkModeIcon/>}
                                    dark={dark}
                                    onClick={changeDark}
                                    onOff={dark}
                                >
                                    {t("dark-mode")}
                                </SettingsItem>
                                <SettingsItem
                                    icon={<LanguageIcon/>}
                                    property={lang}
                                    onClick={changeLang}
                                    dark={dark}
                                >
                                    {t("lang")}
                                </SettingsItem>
                            </div>
                            <div className="settings-dashboard-active-area">
                                <SettingsItem
                                    icon={<PrintIcon/>}
                                    onClick={() => navigate("/receipt/print-test")}
                                    dark={dark}
                                >
                                    {t("print-test")}
                                </SettingsItem>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default SettingsDashboard;
