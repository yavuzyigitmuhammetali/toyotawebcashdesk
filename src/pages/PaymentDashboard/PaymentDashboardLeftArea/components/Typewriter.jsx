import React, {useEffect, useState} from 'react';

function Typewriter({children = " ", speed = 100, style, span = false}) {
    const [currentText, setCurrentText] = useState("");
    const [isTyping, setIsTyping] = useState(false);

    useEffect(() => {
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
    }, [children, speed]);
    return (<>
        {span ? <span style={style}>{currentText}
            {isTyping ? <span>|</span> : null}
            </span> : <div style={style}>{currentText}
            {isTyping ? <span>|</span> : null}
        </div>}
    </>);
}

export default Typewriter;