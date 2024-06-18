import React, {useContext, useEffect, useMemo, useState} from "react";
import PropTypes from "prop-types";
import {ThemeProvider} from "@mui/material/styles";
import {Button, IconButton} from "@mui/material";
import KeyboardAltIcon from "@mui/icons-material/KeyboardAlt";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardCapslockIcon from "@mui/icons-material/KeyboardCapslock";
import {darkTheme, lightTheme} from "./theme";
import {useScreenKeyboard} from "./useScreenKeyboard";
import KeyboardContext from "./context";
import "./screenKeyboard.css";


const colorMap = {
    primary: {light: "#F5F5F5", dark: "#12161B"},
    secondary: {light: "#E0E0E0", dark: "#1C1C1C"},
    error: {light: "#FFEBEE", dark: "#2A0F0F"},
    info: {light: "#E3F2FD", dark: "#0F1926"},
    success: {light: "#E8F5E9", dark: "#0F2610"},
    warning: {light: "#FFF8E1", dark: "#2B1F09"},
    inherit: {light: "#FFFFFF", dark: "#000000"}
};

const ScreenKeyboard = ({
                            fullWidth = false,
                            dark = false,
                            language = "tr",
                            style,
                            performanceMode = false,
                            color = "primary"
                        }) => {
    const [onOff, setOnOff] = useState(true);
    const {handleDelete, handleValue, handleEnter} = useContext(KeyboardContext);

    const {
        isDragging,
        capsLock,
        textInputRef,
        handleMouseDown,
        handleMouseMove,
        handleMouseUp,
        handleTouchStart,
        handleTouchMove,
        handleTouchEnd,
        handleKeyboardCapsLock,
        keyboard
    } = useScreenKeyboard(language, onOff);

    const theme = useMemo(() => (dark ? darkTheme : lightTheme), [dark]);

    useEffect(() => {
        const root = document.documentElement;
        root.style.setProperty("--dark-background-color", colorMap[color].dark);
        root.style.setProperty("--light-background-color", colorMap[color].light);
    }, [color]);

    const buttonStyle = useMemo(() => ({
        cursor: isDragging ? "grabbing" : "grab",
        backgroundColor: dark ? "var(--dark-background-color)" : "var(--light-background-color)",
        borderColor: dark ? "white" : "black",
    }), [isDragging, dark]);

    const optimizedButton = (item, index) => {
        const baseClass = dark ? "screen-keyboard-optimized-button-dark" : "screen-keyboard-optimized-button-light";
        if (performanceMode) {
            return (
                <button
                    key={index}
                    className={baseClass}
                    type="button"
                    onClick={() => handleValue(capsLock ? item.toUpperCase() : item)}
                >
                    {capsLock ? item.toUpperCase() : item}
                </button>
            );
        } else {
            return (
                <Button
                    size="small"
                    type="button"
                    onClick={() => handleValue(capsLock ? item.toUpperCase() : item)}
                    variant="outlined"
                    key={index}
                    color={color}
                >
                    {capsLock ? item.toUpperCase() : item}
                </Button>
            );
        }
    };

    const getClassForSpecialButton = (baseClass) => {
        return dark ? `${baseClass}-dark` : `${baseClass}-light`;
    };

    if (onOff) {
        return (
            <IconButton style={style} onClick={() => setOnOff(!onOff)}>
                <KeyboardAltIcon/>
            </IconButton>
        );
    } else {
        return (
            <>
                <IconButton disabled style={style} onClick={() => setOnOff(!onOff)}>
                    <KeyboardAltIcon/>
                </IconButton>
                <div
                    className={`screen-keyboard-container ${fullWidth ? "fullwidth" : ""}`}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                    ref={textInputRef}
                    style={buttonStyle}
                >
                    <button
                        type="button"
                        className="screen-keyboard-close-button"
                        style={{backgroundColor: dark ? "var(--close-button-red)" : "var(--close-button-light-red)"}}
                        onClick={() => setOnOff(true)}
                    >
                        <CloseIcon/>
                    </button>
                    <ThemeProvider theme={theme}>
                        {keyboard.map((item, index) => {
                            switch (item) {
                                case "del":
                                    return performanceMode ? (
                                        <button
                                            type="button"
                                            key={index}
                                            className={getClassForSpecialButton("screen-keyboard-optimized-double")}
                                            onClick={handleDelete}
                                        >
                                            del
                                        </button>
                                    ) : (
                                        <Button
                                            type="button"
                                            size="small"
                                            onClick={handleDelete}
                                            variant="outlined"
                                            className="screen-keyboard-double"
                                            key={index}
                                            color={color}
                                        >
                                            del
                                        </Button>
                                    );
                                case "enter":
                                    return performanceMode ? (
                                        <button
                                            type="button"
                                            key={index}
                                            className={getClassForSpecialButton("screen-keyboard-optimized-enter")}
                                            onClick={handleEnter}
                                        >
                                            enter
                                        </button>
                                    ) : (
                                        <Button
                                            type="button"
                                            size="small"
                                            onClick={handleEnter}
                                            variant="outlined"
                                            style={{gridRowEnd: "span 4", gridColumnEnd: "-1"}}
                                            key={index}
                                            color={color}
                                        >
                                            enter
                                        </Button>
                                    );
                                case "space":
                                    return performanceMode ? (
                                        <button
                                            type="button"
                                            key={index}
                                            className={getClassForSpecialButton("screen-keyboard-optimized-triple")}
                                            onClick={() => handleValue(" ")}
                                        >
                                            space
                                        </button>
                                    ) : (
                                        <Button
                                            type="button"
                                            size="small"
                                            onClick={() => handleValue(" ")}
                                            variant="outlined"
                                            className="screen-keyboard-triple"
                                            key={index}
                                            color={color}
                                        >
                                            space
                                        </Button>
                                    );
                                case "language":
                                    return performanceMode ? (
                                        <button
                                            type="button"
                                            key={index}
                                            className={getClassForSpecialButton("screen-keyboard-optimized-caps")}
                                            onClick={handleKeyboardCapsLock}
                                        >
                                            caps
                                        </button>
                                    ) : (
                                        <Button
                                            type="button"
                                            size="small"
                                            onClick={handleKeyboardCapsLock}
                                            variant="outlined"
                                            startIcon={<KeyboardCapslockIcon/>}
                                            key={index}
                                            color={color}
                                        >
                                            caps
                                        </Button>
                                    );
                                default:
                                    return optimizedButton(item, index);
                            }
                        })}
                    </ThemeProvider>
                </div>
            </>
        );
    }
};

ScreenKeyboard.propTypes = {
    fullWidth: PropTypes.bool,
    dark: PropTypes.bool,
    language: PropTypes.oneOf(['en', 'tr']),
    style: PropTypes.object,
    performanceMode: PropTypes.bool,
    color: PropTypes.oneOf(['primary', 'secondary', 'error', 'info', 'success', 'warning', 'inherit']),
};

export default ScreenKeyboard;
