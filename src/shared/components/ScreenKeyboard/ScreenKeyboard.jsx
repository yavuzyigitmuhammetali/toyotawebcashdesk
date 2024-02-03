import React, {useContext, useRef, useState} from 'react';
import {createTheme, ThemeProvider} from "@mui/material/styles";
import KeyboardContext from "./context";
import CssBaseline from "@mui/material/CssBaseline";
import {Button} from "@mui/material";
import LanguageIcon from '@mui/icons-material/Language';
import "./screenKeyboard.css"

const darkTheme = createTheme({
    typography: {
        button: {
            textTransform: 'none'
        },
        fontFamily: 'Rubik',
    },

    palette: {
        mode: 'dark',
    },
});
const lightTheme = createTheme({
    typography: {
        button: {
            textTransform: 'none'
        },
        fontFamily: 'Rubik',
    },

    palette: {
        mode: 'light',
    },
});

function ScreenKeyboard({dark = false, defaultLang  = "tr"}) {
    const [isDragging, setIsDragging] = useState(false);
    const [keyboardType, setKeyboardType] = useState(defaultLang)
    const [position, setPosition] = useState({ x: 0, bottom: -20 });
    const { handleDelete, handleValue } = useContext(KeyboardContext);

    const textInputRef = useRef(null);
    const dragStartRef = useRef(null);

    const simulateEnterKey = () => {
        if (textInputRef.current) {
            const event = new KeyboardEvent('keydown', {
                key: 'Enter',
                keyCode: 13,
                which: 13,
            });
            textInputRef.current.dispatchEvent(event);
        }
    };

    const handleMouseDown = (e) => {
        const target = e.target;

        if (target.tagName === 'BUTTON') {
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
        "1","2","3","4","5","6","7","8","9","0","del","enter",
        "q","w","e","r","t","y","u","ı","o","p","ğ","ü",
        "a","s","d","f","g","h","j","k","l","ş","i",
        "z","x","c","v","b","n","m","ö","ç","language","@","space","."
    ];

    const englishKeyboard = [
        "1","2","3","4","5","6","7","8","9","0","del","enter",
        "q","w","e","r","t","y","u","i","o","p",";",
        "a","s","d","f","g","h","j","k","l","<",">",
        "z","x","c","v","b","n","m","?","-","_","language","@","space","."
    ];

    const handleKeyboardType =()=>{
        if (keyboardType === "tr"){
            setKeyboardType("en");
        }
        else if (keyboardType === "en"){
            setKeyboardType("tr");
        }
    }
    let keyboard = ()=>{
        if (keyboardType === "tr"){
            return turkishKeyboard;
        }
        else if (keyboardType === "en"){
            return englishKeyboard;
        }
    }

    const handleCloseButtonClick = () => {
        const container = textInputRef.current;
        if (container && container.parentNode) {
            container.parentNode.removeChild(container);
        }
    };

    return (
        <div
            className="screen-keyboard-container"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            ref={textInputRef}
            style={{
                position: 'fixed',
                left: position.x + 'px',
                bottom: position.bottom + 'px', // bottom değeri ekleniyor
                cursor: isDragging ? 'grabbing' : 'grab',
                backgroundColor: dark?"#12161B":"white",
                borderColor: dark?"white":"black",
            }}
        >

            {/* Kırmızı yuvarlak düğme */}
            <button className="screen-keyboard-close-button" style={{backgroundColor:dark?"red":"#E33E4D"}} onClick={handleCloseButtonClick}></button>
            <ThemeProvider theme={dark?darkTheme:lightTheme}>
                <CssBaseline />
                {keyboard().map((item, index) => {
                    if (item === 'del') {
                        return (
                            <Button onClick={handleDelete} variant="outlined" className="screen-keyboard-double" key={index}>
                                del
                            </Button>
                        );
                    } else if (item === 'enter') {
                        return (
                            <Button
                                onClick={simulateEnterKey}
                                variant="outlined"
                                style={{ gridRowEnd: 'span 4', gridColumnEnd: '-1' }}
                                key={index}
                            >
                                enter
                            </Button>
                        );
                    } else if (item === 'space') {
                        return (
                            <Button onClick={() => handleValue(' ')} variant="outlined" className="screen-keyboard-triple" key={index}>
                                space
                            </Button>
                        );
                    } else if (item === '') {
                        return <Button className="screen-keyboard-empty-space" disabled key={index}></Button>;
                    }  else if (item === 'language') {
                        return <Button onClick={handleKeyboardType} variant="outlined" startIcon={<LanguageIcon/>} key={index}></Button>;
                    }else {
                        return (
                            <Button onClick={() => handleValue(item)} variant="outlined" key={index}>
                                {item}
                            </Button>
                        );
                    }
                })}
            </ThemeProvider>
        </div>
    );
}

export default ScreenKeyboard;