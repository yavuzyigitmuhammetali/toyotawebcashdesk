import {useCallback, useEffect, useRef, useState} from "react";

export const useTooltipVisibility = (delay, performanceMode) => {
    const [showTooltip, setShowTooltip] = useState(false);
    const [visible, setVisible] = useState(false);
    const timeoutRef = useRef(null);

    const handleMouseEnter = useCallback(() => {
        timeoutRef.current = setTimeout(() => {
            setShowTooltip(true);
            setVisible(true);
        }, delay);
    }, [delay]);

    const handleMouseLeave = useCallback(() => {
        clearTimeout(timeoutRef.current);
        setShowTooltip(false);
    }, []);

    useEffect(() => {
        if (!showTooltip) {
            const timeout = setTimeout(() => {
                setVisible(false);
            }, performanceMode ? 0 : 300);
            return () => clearTimeout(timeout);
        }
    }, [showTooltip, performanceMode]);

    useEffect(() => {
        return () => {
            clearTimeout(timeoutRef.current);
        };
    }, []);

    return {visible, showTooltip, handleMouseEnter, handleMouseLeave};
};