import React, {useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import './TooltipProvider.css';

const TooltipProvider = ({
                             children,
                             content,
                             delay = 400,
                             position = 'top',
                             dark = false,
                             backgroundColor = 'black',
                             textColor = 'white',
                             borderRadius = '4px',
                             fontSize = '0.5em',
                             customClass = ''
                         }) => {
    const [showTooltip, setShowTooltip] = useState(false);
    const [visible, setVisible] = useState(false);
    const timeoutRef = useRef(null);
    const tooltipRef = useRef(null);

    const handleMouseEnter = () => {
        timeoutRef.current = setTimeout(() => {
            setShowTooltip(true);
            setVisible(true);
        }, delay);
    };

    const handleMouseLeave = () => {
        clearTimeout(timeoutRef.current);
        setShowTooltip(false);
    };

    useEffect(() => {
        if (!showTooltip) {
            const timeout = setTimeout(() => {
                setVisible(false);
            }, 300); // Animasyon süresi ile aynı olmalı
            return () => clearTimeout(timeout);
        }
    }, [showTooltip]);

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    const tooltipStyle = {
        backgroundColor: dark ? textColor : backgroundColor,
        color: dark ? backgroundColor : textColor,
        borderRadius,
        fontSize,
        pointerEvents: 'none'
    };

    return (
        <div className="tooltip-container" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            {children}
            {visible && (
                <div
                    onMouseEnter={() => (setVisible(false))}
                    className={`tooltip-box tooltip-${position} ${customClass} ${showTooltip ? 'fade-in' : 'fade-out'}`}
                    style={tooltipStyle} ref={tooltipRef}>
                    {content}
                </div>
            )}
        </div>
    );
};

TooltipProvider.propTypes = {
    children: PropTypes.node.isRequired,
    content: PropTypes.node.isRequired,
    delay: PropTypes.number,
    position: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
    backgroundColor: PropTypes.string,
    textColor: PropTypes.string,
    borderRadius: PropTypes.string,
    customClass: PropTypes.string
};

export default TooltipProvider;