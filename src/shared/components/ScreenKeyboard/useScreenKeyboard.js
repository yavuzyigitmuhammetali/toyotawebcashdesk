import { useRef, useState, useCallback } from "react";

export const useScreenKeyboard = (language) => {
    const [isDragging, setIsDragging] = useState(false);
    const [keyboardType, setKeyboardType] = useState(language);
    const [capsLock, setCapsLock] = useState(false);
    const textInputRef = useRef(null);
    const dragStartRef = useRef(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const turkishKeyboard = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "del", "enter", "q", "w", "e", "r", "t", "y", "u", "ı", "o", "p", "ğ", "a", "s", "d", "ü", "f", "g", "h", "j", "k", "l", "ş", "i", "z", "x", "c", "v", "b", "n", "m", "ö", "ç", "language", "@", "space", ".",];
    const englishKeyboard = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "del", "enter", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", ";", "a", "s", "d", "f", "g", "h", "j", "k", "l", "<", ">", "z", "x", "c", "v", "b", "n", "m", "?", "-", "_", "language", "@", "space", ".",];


    // Use useCallback to memoize the callback, preventing unnecessary re-creations
    const handleMouseDown = useCallback((e) => {
        const target = e.target;

        if (target.tagName !== "DIV") {
            return;
        }

        setIsDragging(true);
        const rect = textInputRef.current.getBoundingClientRect();
        dragStartRef.current = {
            x: e.clientX,
            y: e.clientY,
            initialX: position.x,
            initialY: position.y,
        };
    }, [position.x, position.y]);

    const handleMouseMove = useCallback((e) => {
        if (isDragging && dragStartRef.current) {
            const deltaX = e.clientX - dragStartRef.current.x;
            const deltaY = e.clientY - dragStartRef.current.y;

            const newX = dragStartRef.current.initialX + deltaX;
            const newY = dragStartRef.current.initialY + deltaY;

            // Use requestAnimationFrame for smooth animations
            requestAnimationFrame(() => {
                setPosition({ x: newX, y: newY });
                textInputRef.current.style.transform = `translate(${newX}px, ${newY}px)`;
            });
        }
    }, [isDragging]);

    const handleMouseUp = useCallback(() => {
        setIsDragging(false);
    }, []);

    const handleKeyboardType = useCallback(() => {
        setKeyboardType((prevType) => (prevType === "tr" ? "en" : "tr"));
    }, []);

    const handleKeyboardCapsLock = useCallback(() => {
        setCapsLock((prevCapsLock) => !prevCapsLock);
    }, []);

    let keyboard = useCallback(() => {
        return keyboardType === "tr" ? turkishKeyboard : englishKeyboard;
    }, [keyboardType]);

    return {
        isDragging,
        capsLock,
        textInputRef,
        handleMouseDown,
        handleMouseMove,
        handleMouseUp,
        handleKeyboardCapsLock,
        keyboard,
        position,
    };
};
