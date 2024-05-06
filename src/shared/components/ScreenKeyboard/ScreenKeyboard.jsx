import React, {useContext, useState} from "react";
import {ThemeProvider} from "@mui/material/styles";
import {Button, IconButton} from "@mui/material";
import KeyboardAltIcon from "@mui/icons-material/KeyboardAlt";
import "./screenKeyboard.css";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardCapslockIcon from '@mui/icons-material/KeyboardCapslock';
import {darkTheme, lightTheme} from "./theme";
import {useScreenKeyboard} from "./useScreenKeyboard";
import KeyboardContext from "./context";


function ScreenKeyboard({fullWidth = false, dark = false, language = "tr", style}) {
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
    } = useScreenKeyboard(language, onOff)

    if (onOff) {
        return (<ThemeProvider theme={dark ? darkTheme : lightTheme}>
            <IconButton style={style} onClick={() => setOnOff(!onOff)}>
                <KeyboardAltIcon/>
            </IconButton>
        </ThemeProvider>);
    } else {
        return (<>
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
                style={{
                    cursor: isDragging ? "grabbing" : "grab",
                    backgroundColor: dark ? "#12161B" : "white",
                    borderColor: dark ? "white" : "black",
                }}
            >
                {/* Kırmızı yuvarlak düğme */}
                <button
                    className="screen-keyboard-close-button"
                    style={{backgroundColor: dark ? "red" : "#E33E4D"}}
                    onClick={() => setOnOff(true)}
                >
                    <CloseIcon/>
                </button>
                <ThemeProvider theme={dark ? darkTheme : lightTheme}>
                    {keyboard().map((item, index) => {
                        if (item === "del") {
                            return (<Button
                                size="small"
                                onClick={handleDelete}
                                variant="outlined"
                                className="screen-keyboard-double"
                                key={index}
                            >
                                del
                            </Button>);
                        } else if (item === "enter") {
                            return (
                                <Button
                                    size="small"
                                    onClick={handleEnter}
                                    variant="outlined"
                                    style={{gridRowEnd: "span 4", gridColumnEnd: "-1"}}
                                    key={index}
                                >
                                    enter
                                </Button>);
                        } else if (item === "space") {
                            return (<Button
                                size="small"
                                onClick={() => handleValue(" ")}
                                variant="outlined"
                                className="screen-keyboard-triple"
                                key={index}
                            >
                                space
                            </Button>);
                        } else if (item === "") {
                            return (<Button
                                className="screen-keyboard-empty-space"
                                disabled
                                key={index}
                            ></Button>);
                        }/* else if (item === "language") {
                                return (<Button
                                        size="small"
                                        onClick={handleKeyboardType
                                        variant="outlined"
                                        startIcon={<LanguageIcon/>}
                                        key={index}
                                    ></Button>);
                            }*/ else if (item === "language") {
                            return (<Button
                                size="small"
                                onClick={handleKeyboardCapsLock}
                                variant="outlined"
                                startIcon={<KeyboardCapslockIcon/>}
                                key={index}
                            ></Button>);
                        } else {
                            return (<Button
                                size="small"
                                onClick={() => handleValue(capsLock ? item.toUpperCase() : item)}
                                variant="outlined"
                                key={index}
                            >
                                {capsLock ? item.toUpperCase() : item}
                            </Button>);
                        }
                    })}
                </ThemeProvider>
            </div>
        </>);
    }
}

export default ScreenKeyboard;

