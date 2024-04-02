import React, { useState, useEffect } from "react";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import "./settingsItem.css";

function SettingsItem({
    children,
    onOff = undefined,
    dark = false,
    color = "",
    property = "",
    icon = <AcUnitIcon />,
    onClick = () => {},
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
        if (onOff === undefined) return "settings-item";
        return `settings-item ${isActive ? "active" : "inactive"}`;
    };

    return (
        <div
            style={{
                backgroundColor: color,
                color: dark ? "white" : "black",
                filter: dark ? "brightness(120%)" : "",
                borderColor: dark && onOff === undefined ? "white" : "",
            }}
            className={itemClass()}
            onClick={handleClick}
        >
            {icon}
            {children}
            <span style={{ borderLeft: "2px solid", paddingLeft: "10px" }}>{property}</span>
        </div>
    );
}

export default SettingsItem;
