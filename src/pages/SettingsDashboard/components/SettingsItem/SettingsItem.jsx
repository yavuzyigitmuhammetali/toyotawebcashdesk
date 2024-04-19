import React, {useEffect, useState} from "react";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import "./settingsItem.css";

function SettingsItem({
                          children,
                          onOff = undefined,
                          dark = false,
                          color = "",
                          property = "",
                          icon = <AcUnitIcon/>,
                          onClick = () => {
                          },
                      }) {
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        if (onOff !== undefined) {
            setIsActive(onOff);
        }
    }, [onOff]);

    const handleClick = () => {
        if (onOff !== undefined) {
            setIsActive(!isActive);
        }
        onClick();
    };

    const itemClass = () => {
        let className = "settings-item";
        if (onOff !== undefined) {
            className += isActive ? " active" : " inactive";
        }
        if (dark) {
            className += " dark";
            if (onOff === undefined) {
                className += " undefined-onOff";
            }
        } else {
            className += " light";
        }
        return className;
    };

    return (
        <div
            style={{backgroundColor: color}}
            className={itemClass()}
            onClick={handleClick}
        >
            {icon}
            {children}
            <span className="settings-item-border">{property}</span>
        </div>
    );
}

export default SettingsItem;