import React, {useEffect, useState} from 'react';
import {Box, Button, CssBaseline, Typography} from '@mui/material';
import {ThemeProvider} from '@mui/material/styles';
import ScheduleTable from './components/ScheduleTable';
import CountdownTimer from "./components/CountdownTimer";
import OnlineOfflineIndicator from "../../shared/components/OnlineOfflineIndicator/OnlineOfflineIndicator";
import AppStatusContext from "../../shared/states/AppStatus/context";
import {getTheme} from "./theme";
import {useTranslation} from "react-i18next";

const OfflineErrorPage = () => {
    const {status, isOnline, lang, dark} = React.useContext(AppStatusContext);
    const theme = getTheme(dark ? "dark" : "light");
    const {t} = useTranslation();
    const [schedule, setSchedule] = useState(
        {
            "Monday": null,
            "Tuesday": null,
            "Wednesday": null,
            "Thursday": null,
            "Friday": null,
            "Saturday": null,
            "Sunday": null
        })

    useEffect(() => {
        if (status && status.schedule) {
            setSchedule(status.schedule);
        }
    }, [status]);
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100vh',
                    p: 3,
                    bgcolor: 'background.default',
                    color: 'text.primary',
                }}
            >
                <OnlineOfflineIndicator dark={dark} language={lang} online={isOnline}/>
                <Typography variant="h4" component="h1" gutterBottom sx={{fontWeight: 'bold', mb: 4}}>
                    {t('offlineErrorTitle')}
                </Typography>
                <Typography variant="h6" sx={{mb: 3}}>
                    {t('offlineErrorMessage')}
                </Typography>
                <ScheduleTable schedule={schedule}/>
                <Box mt={5}>
                    <Box sx={{textAlign: 'center', mt: 3}}>
                        <Typography variant="body2">
                            {t('nextShopOpeningTime')}
                        </Typography>
                        <CountdownTimer schedule={schedule || {}}/>
                        <Button
                            variant="contained"
                            color="primary"
                            sx={{mt: 3, fontWeight: 'bold'}}
                            onClick={() => window.location.reload()}
                        >
                            {t('tryRefreshing')}
                        </Button>
                    </Box>
                </Box>
            </Box>
        </ThemeProvider>
    );
};

export default OfflineErrorPage;
