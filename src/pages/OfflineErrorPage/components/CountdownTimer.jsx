import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import {getNextOpening} from "../functions";
import { useTranslation } from "react-i18next";

const CountdownTimer = ({ schedule }) => {
    const [timeLeft, setTimeLeft] = useState('');
    const { t } = useTranslation(); 

    useEffect(() => {
        const updateCountdown = () => {
            const openingTime = getNextOpening(schedule);
            if (!openingTime) {
                setTimeLeft(t('noOpeningTimes'));
                return;
            }

            const now = new Date();
            const difference = openingTime - now;

            if (difference > 0) {
                let hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
                let minutes = Math.floor((difference / 1000 / 60) % 60);
                let seconds = Math.floor((difference / 1000) % 60);

                hours = (hours < 10) ? '0' + hours : hours;
                minutes = (minutes < 10) ? '0' + minutes : minutes;
                seconds = (seconds < 10) ? '0' + seconds : seconds;

                setTimeLeft(`${hours}:${minutes}:${seconds}`);
            } else {
                setTimeLeft(t('openingSoon'));
            }
        };

        updateCountdown();
        const interval = setInterval(updateCountdown, 1000);

        return () => clearInterval(interval);
    }, [schedule,t]);

    return (
        <Typography variant="h6">
            {timeLeft}
        </Typography>
    );
};

export default CountdownTimer;
