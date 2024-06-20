import React from 'react';
import PropTypes from 'prop-types';
import styles from './TooltipProvider.module.css';
import {useTooltipVisibility} from "./useTooltipVisibility";


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
                             customClass = '',
                             performanceMode = false,
                         }) => {
    const {visible, showTooltip, handleMouseEnter, handleMouseLeave} = useTooltipVisibility(delay, performanceMode);

    const tooltipStyle = {
        backgroundColor: dark ? textColor : backgroundColor,
        color: dark ? backgroundColor : textColor,
        borderRadius,
        fontSize,
    };

    const getTooltipClassNames = () => {
        let tooltipClass = `${styles.tooltipBox} ${styles[`tooltip${position.charAt(0).toUpperCase()}${position.slice(1)}`]} ${customClass}`;

        if (showTooltip && !performanceMode) {
            tooltipClass += ` ${styles.fadeIn}`;
        } else if (!showTooltip && !performanceMode) {
            tooltipClass += ` ${styles.fadeOut}`;
        }

        if (performanceMode) {
            tooltipClass += ` ${styles.performanceMode}`;
        }

        return tooltipClass;
    };

    return (
        <div className={styles.tooltipContainer} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            {children}
            {visible && (
                <div className={getTooltipClassNames()} style={tooltipStyle}>
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
    fontSize: PropTypes.string,
    customClass: PropTypes.string,
    performanceMode: PropTypes.bool,
};

export default TooltipProvider;
