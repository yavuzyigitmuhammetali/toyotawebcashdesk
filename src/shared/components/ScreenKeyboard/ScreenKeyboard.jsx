import React, {useContext, useMemo, useState} from "react";
import {ThemeProvider} from "@mui/material/styles";
import {Button, IconButton} from "@mui/material";
import KeyboardAltIcon from "@mui/icons-material/KeyboardAlt";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardCapslockIcon from "@mui/icons-material/KeyboardCapslock";
import {darkTheme, lightTheme} from "./theme";
import {useScreenKeyboard} from "./useScreenKeyboard";
import KeyboardContext from "./context";
import "./screenKeyboard.css";

function ScreenKeyboard({fullWidth = false, dark = false, language = "tr", style, performanceMode = false}) {
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
}

export default ScreenKeyboard;
