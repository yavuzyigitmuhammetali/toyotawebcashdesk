import React, {useCallback, useEffect, useState} from "react";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import "./settingsItem.css";

function SettingsItem({
                          children,
                          onOff,
                          dark = false,
                          color = "",
                          property = "",
                          icon = <AcUnitIcon/>,
                          onClick = () => {
                          },
                          performanceMode = false,
                      }) {
    const [isActive, setIsActive] = useState(onOff ?? false);

    useEffect(() => {
        if (onOff !== undefined) {
            setIsActive(onOff);
        }
    }, [onOff]);

    const handleClick = useCallback(() => {
        if (onOff !== undefined) {
            setIsActive((prev) => !prev);
        }
        onClick();
    }, [onOff, onClick]);

    const itemClass = [
        "settings-item",
        onOff !== undefined && (isActive ? "active" : "inactive"),
        dark ? "dark" : "light",
        dark && onOff === undefined && "undefined-onOff",
        performanceMode && "performance",
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <div
            style={color ? {backgroundColor: color} : undefined}
            className={itemClass}
            onClick={handleClick}
        >
            {icon}
            {children}
            <span className="settings-item-border">{property}</span>
        </div>
    );
}

export default React.memo(SettingsItem);