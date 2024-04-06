import React from 'react';
import {createTheme, ThemeProvider} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import {Alert, AlertTitle} from "@mui/material";


function FullScreenAlert({children, dark = false, title = "Error"}) {
    return (
        <ThemeProvider theme={createTheme({ palette: { mode: dark ? "dark" : "light" } })}>
            <CssBaseline/>
            <Alert style={{position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}
                   severity="error">
                <AlertTitle>{title}</AlertTitle>
                {children}
            </Alert>
        </ThemeProvider>
    );
}

export default FullScreenAlert;