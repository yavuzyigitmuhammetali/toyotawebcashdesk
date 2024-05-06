import {useCallback, useEffect, useRef, useState} from "react";

export const useScreenKeyboard = (language, onOff) => {
    const [isDragging, setIsDragging] = useState(false);
    // eslint-disable-next-line no-unused-vars
    const [keyboardType, setKeyboardType] = useState(language);
    const [capsLock, setCapsLock] = useState(false);
    const textInputRef = useRef(null);
    const dragStartRef = useRef(null);
    const [position, setPosition] = useState({x: 0, y: 0});
    const turkishKeyboard = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "del", "enter", "q", "w", "e", "r", "t", "y", "u", "ı", "o", "p", "ğ", "a", "s", "d", "ü", "f", "g", "h", "j", "k", "l", "ş", "i", "z", "x", "c", "v", "b", "n", "m", "ö", "ç", "language", "@", "space", ".",];
    const englishKeyboard = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "del", "enter", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", ";", "a", "s", "d", "f", "g", "h", "j", "k", "l", "<", ">", "z", "x", "c", "v", "b", "n", "m", "?", "-", "_", "language", "@", "space", ".",];

    const startDrag = useCallback((clientX, clientY) => {
        setIsDragging(true);
        dragStartRef.current = {
            x: clientX,
            y: clientY,
            initialX: position.x,
            initialY: position.y,
        };
    }, [position.x, position.y]);

    const handleMouseDown = useCallback((e) => {
        if (e.target.tagName !== "DIV") return;
        startDrag(e.clientX, e.clientY);
    }, [startDrag]);

    const handleMouseMove = useCallback((e) => {
        if (!isDragging || !dragStartRef.current) return;
        const deltaX = e.clientX - dragStartRef.current.x;
        const deltaY = e.clientY - dragStartRef.current.y;
        const newX = dragStartRef.current.initialX + deltaX;
        const newY = dragStartRef.current.initialY + deltaY;
        requestAnimationFrame(() => {
            setPosition({x: newX, y: newY});
            textInputRef.current.style.transform = `translate(${newX}px, ${newY}px)`;
        });
    }, [isDragging]);

    const handleMouseUp = useCallback(() => {
        setIsDragging(false);
    }, []);

    const handleTouchStart = useCallback((e) => {
        const touch = e.touches[0];
        startDrag(touch.clientX, touch.clientY);
    }, [startDrag]);

    const handleTouchMove = useCallback((e) => {
        if (!isDragging || !dragStartRef.current) return;
        const touch = e.touches[0];
        const deltaX = touch.clientX - dragStartRef.current.x;
        const deltaY = touch.clientY - dragStartRef.current.y;
        const newX = dragStartRef.current.initialX + deltaX;
        const newY = dragStartRef.current.initialY + deltaY;
        requestAnimationFrame(() => {
            setPosition({x: newX, y: newY});
            textInputRef.current.style.transform = `translate(${newX}px, ${newY}px)`;
        });
    }, [isDragging]);

    const handleTouchEnd = useCallback(() => {
        setIsDragging(false);
    }, []);

    const handleKeyboardCapsLock = useCallback(() => {
        setCapsLock((prevCapsLock) => !prevCapsLock);
    }, []);

    let keyboard = useCallback(() => {
        return keyboardType === "tr" ? turkishKeyboard : englishKeyboard;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [keyboardType]);

    useEffect(() => {
        if (onOff) {
            setIsDragging(false);
            setPosition({x: 0, y: 0});
            textInputRef.current = null;
        }
    }, [onOff]);

    return {
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
        keyboard,
        position,
    };
};
