import React, {useEffect, useState} from 'react';

function Typewriter({children = " ", speed = 100, style, span = false, className = "", isActive = true}) {
    const [currentText, setCurrentText] = useState("");
    const [isTyping, setIsTyping] = useState(false);

    useEffect(() => {
        if (!isActive) {
            setCurrentText(children);
            return;
        }

        let i = 0;
        const interval = setInterval(() => {
            if (i < children.length) {
                setCurrentText(children.substring(0, i + 1));
                i++;
            } else {
                setIsTyping(false);
                clearInterval(interval);
            }
        }, speed);

        setIsTyping(true);
        return () => clearInterval(interval);
    }, [children, speed, isActive]);

    if (span) {
        return (
            <span className={className} style={style}>
                {currentText}
                {isTyping && isActive ? <span>|</span> : null}
            </span>
        );
    } else {
        return (
            <div className={className} style={style}>
                {currentText}
                {isTyping && isActive ? <span>|</span> : null}
            </div>
        );
    }
}

export default Typewriter;
