import React, { useContext, useRef, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import KeyboardContext from "./context";
import { Button, IconButton } from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";
import KeyboardAltIcon from "@mui/icons-material/KeyboardAlt";
import "./screenKeyboard.css";
import CloseIcon from "@mui/icons-material/Close";

const darkTheme = createTheme({
    typography: {
        button: {
            textTransform: "none",
        },
        fontFamily: "Rubik",
    },

    palette: {
        mode: "dark",
    },
});
const lightTheme = createTheme({
    typography: {
        button: {
            textTransform: "none",
        },
        fontFamily: "Rubik",
    },

    palette: {
        mode: "light",
    },
});

function ScreenKeyboard({ dark = false, language = "tr", style }) {
    const [isDragging, setIsDragging] = useState(false);
    const [keyboardType, setKeyboardType] = useState(language);
    const [onOff, setOnOff] = useState(true);
    const { handleDelete, handleValue, handleEnter } = useContext(KeyboardContext);

    const textInputRef = useRef(null);
    const dragStartRef = useRef(null);

    const handleMouseDown = (e) => {
        const target = e.target;

        if (target.tagName !== "DIV") {
            return;
        }

        setIsDragging(true);
        dragStartRef.current = {
            x: e.clientX,
            y: e.clientY,
            left: textInputRef.current.getBoundingClientRect().left,
            bottom: window.innerHeight - textInputRef.current.getBoundingClientRect().bottom,
        };
    };

    const handleMouseMove = (e) => {
        if (isDragging && dragStartRef.current) {
            const deltaX = e.clientX - dragStartRef.current.x;
            const deltaY = e.clientY - dragStartRef.current.y;

            if (deltaX !== 0 || deltaY !== 0) {
                const newLeft = dragStartRef.current.left + deltaX;
                const newBottom = dragStartRef.current.bottom - deltaY;

                textInputRef.current.style.left = `${newLeft}px`;
                textInputRef.current.style.bottom = `${newBottom}px`;
            }
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const turkishKeyboard = [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "0",
        "del",
        "enter",
        "q",
        "w",
        "e",
        "r",
        "t",
        "y",
        "u",
        "ı",
        "o",
        "p",
        "ğ",
        "a",
        "s",
        "d",
        "ü",
        "f",
        "g",
        "h",
        "j",
        "k",
        "l",
        "ş",
        "i",
        "z",
        "x",
        "c",
        "v",
        "b",
        "n",
        "m",
        "ö",
        "ç",
        "language",
        "@",
        "space",
        ".",
    ];

    const englishKeyboard = [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "0",
        "del",
        "enter",
        "q",
        "w",
        "e",
        "r",
        "t",
        "y",
        "u",
        "i",
        "o",
        "p",
        ";",
        "a",
        "s",
        "d",
        "f",
        "g",
        "h",
        "j",
        "k",
        "l",
        "<",
        ">",
        "z",
        "x",
        "c",
        "v",
        "b",
        "n",
        "m",
        "?",
        "-",
        "_",
        "language",
        "@",
        "space",
        ".",
    ];

    const handleKeyboardType = () => {
        if (keyboardType === "tr") {
            setKeyboardType("en");
        } else if (keyboardType === "en") {
            setKeyboardType("tr");
        }
    };
    let keyboard = () => {
        if (keyboardType === "tr") {
            return turkishKeyboard;
        } else if (keyboardType === "en") {
            return englishKeyboard;
        }
    };

    if (onOff) {
        return (
            <ThemeProvider theme={dark ? darkTheme : lightTheme}>
                <IconButton style={style} onClick={() => setOnOff(!onOff)}>
                    <KeyboardAltIcon />
                </IconButton>
            </ThemeProvider>
        );
    } else {
        return (
            <>
                <IconButton disabled style={style} onClick={() => setOnOff(!onOff)}>
                    <KeyboardAltIcon />
                </IconButton>
                <div
                    className="screen-keyboard-container"
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    ref={textInputRef}
                    style={{
                        position: "fixed",
                        left: 0,
                        bottom: 0,
                        cursor: isDragging ? "grabbing" : "grab",
                        backgroundColor: dark ? "#12161B" : "white",
                        borderColor: dark ? "white" : "black",
                    }}
                >
                    {/* Kırmızı yuvarlak düğme */}
                    <button
                        className="screen-keyboard-close-button"
                        style={{ backgroundColor: dark ? "red" : "#E33E4D" }}
                        onClick={() => setOnOff(true)}
                    >
                        <CloseIcon />
                    </button>
                    <ThemeProvider theme={dark ? darkTheme : lightTheme}>
                        {keyboard().map((item, index) => {
                            if (item === "del") {
                                return (
                                    <Button
                                        size="small"
                                        onClick={handleDelete}
                                        variant="outlined"
                                        className="screen-keyboard-double"
                                        key={index}
                                    >
                                        del
                                    </Button>
                                );
                            } else if (item === "enter") {
                                return (
                                    <Button
                                        size="small"
                                        onClick={handleEnter}
                                        variant="outlined"
                                        style={{ gridRowEnd: "span 4", gridColumnEnd: "-1" }}
                                        key={index}
                                    >
                                        enter
                                    </Button>
                                );
                            } else if (item === "space") {
                                return (
                                    <Button
                                        size="small"
                                        onClick={() => handleValue(" ")}
                                        variant="outlined"
                                        className="screen-keyboard-triple"
                                        key={index}
                                    >
                                        space
                                    </Button>
                                );
                            } else if (item === "") {
                                return (
                                    <Button
                                        className="screen-keyboard-empty-space"
                                        disabled
                                        key={index}
                                    ></Button>
                                );
                            } else if (item === "language") {
                                return (
                                    <Button
                                        size="small"
                                        onClick={handleKeyboardType}
                                        variant="outlined"
                                        startIcon={<LanguageIcon />}
                                        key={index}
                                    ></Button>
                                );
                            } else {
                                return (
                                    <Button
                                        size="small"
                                        onClick={() => handleValue(item)}
                                        variant="outlined"
                                        key={index}
                                    >
                                        {item}
                                    </Button>
                                );
                            }
                        })}
                    </ThemeProvider>
                </div>
            </>
        );
    }
}

export default ScreenKeyboard;
