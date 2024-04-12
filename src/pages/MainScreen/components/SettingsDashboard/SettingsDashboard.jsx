import React, {useContext, useState} from "react";
import "./settingsDashboard.css";
import SettingsIcon from "@mui/icons-material/Settings";
import CloseIcon from "@mui/icons-material/Close";
import SettingsItem from "../SettingsItem/SettingsItem";
import {IconButton} from "@mui/material";
import AppStatusContext from "../../../../shared/state/AppStatus/context";
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
                    style={{zIndex: "9999"}}
                    color={!showSettings ? "info" : "error"}
                    onClick={toggleSettings}
                >
                    {showSettings ? <CloseIcon/> : <SettingsIcon/>}
                </IconButton>
                {showSettings && (
                    <div
                        style={{
                            position: "fixed",
                            left: 0,
                            top: 0,
                            boxSizing: "border-box",
                            width: "100%",
                            height: "100%",
                            backgroundColor: "rgba(0,0,0,0.5)",
                        }}
                    >
                        <div style={{
                            color: dark && "white",
                            backgroundColor: dark && "rgb(30, 30, 30)",
                            borderColor: dark && "white"
                        }} className="settings-dashboard-container">
                            <div className="settings-dashboard-header">{t('settings')}</div>
                            <hr
                                style={{
                                    backgroundColor: dark ? "white" : "black",
                                    height: "1px",
                                    border: "none",
                                }}
                            />
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
