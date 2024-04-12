import {useRef, useState} from "react";

export const useScreenKeyboard = (language) => {
    const [isDragging, setIsDragging] = useState(false);
    const [keyboardType, setKeyboardType] = useState(language);
    const [capsLock, setCapsLock] = useState(false);
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

    const turkishKeyboard = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "del", "enter", "q", "w", "e", "r", "t", "y", "u", "ı", "o", "p", "ğ", "a", "s", "d", "ü", "f", "g", "h", "j", "k", "l", "ş", "i", "z", "x", "c", "v", "b", "n", "m", "ö", "ç", "language", "@", "space", ".",];

    const englishKeyboard = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "del", "enter", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", ";", "a", "s", "d", "f", "g", "h", "j", "k", "l", "<", ">", "z", "x", "c", "v", "b", "n", "m", "?", "-", "_", "language", "@", "space", ".",];

    const handleKeyboardType = () => {
        if (keyboardType === "tr") {
            setKeyboardType("en");
        } else if (keyboardType === "en") {
            setKeyboardType("tr");
        }
    };

    const handleKeyboardCapsLock = () => {
        setCapsLock(!capsLock);
    }

    let keyboard = () => {
        if (keyboardType === "tr") {
            return turkishKeyboard;
        } else if (keyboardType === "en") {
            return englishKeyboard;
        }
    };

    return {
        isDragging,
        capsLock,
        textInputRef,
        handleMouseDown,
        handleMouseMove,
        handleMouseUp,
        handleKeyboardCapsLock,
        keyboard
    }
}