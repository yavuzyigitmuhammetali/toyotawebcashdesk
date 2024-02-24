import React, {useEffect, useState} from 'react';
import {Box, Button, CssBaseline, Typography} from '@mui/material';
import {ThemeProvider} from '@mui/material/styles';
import ScheduleTable from './components/ScheduleTable';
import {getTheme} from './theme';
import CountdownTimer from "./components/CountdownTimer";
import DataFetchingContext from "../../shared/state/context";
import OnlineOfflineIndicator from "../../shared/components/OnlineOfflineIndicator";

const OfflineErrorPage = ({dark = true}) => {
    const theme = getTheme(dark ? "dark" : "light");
    const {status,online} = React.useContext(DataFetchingContext);
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
                <OnlineOfflineIndicator online={online}/>
                <Typography variant="h4" component="h1" gutterBottom sx={{fontWeight: 'bold', mb: 4}}>
                    Oops! We're currently offline.
                </Typography>
                <Typography variant="h6" sx={{mb: 3}}>
                    Sorry for the inconvenience. Please check our operating hours below and visit us again during those
                    times.
                </Typography>
                <ScheduleTable schedule={schedule}/>
                <Box mt={5}>
                    <Typography variant="body2" sx={{mt: 2}}>
                        Next Shop Opening Time:
                    </Typography>
                    <CountdownTimer schedule={schedule}/>
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{mt: 3, fontWeight: 'bold'}}
                        onClick={() => window.location.reload()}
                    >
                        Try refreshing the page
                    </Button>
                </Box>
            </Box>
        </ThemeProvider>
    );
};

export default OfflineErrorPage;
