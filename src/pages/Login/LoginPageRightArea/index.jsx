import React from 'react';
import TextField from '@mui/material/TextField';
import {ThemeProvider, createTheme} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {Alert, AlertTitle, Button} from "@mui/material";
import "./loginPageRightArea.css";

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});
const lightTheme = createTheme({
    palette: {
        mode: 'light',
    },
});

function LoginPageRightArea({dark = false, error = ""}) {
    return (
        <div style={{width: "400px", backgroundColor: dark ? "#1C1F25" : "white", border: "2px solid #1A2027"}}
             className="login-page-right-area-container">
            <div className="login-page-right-area-info">
                <div style={{color: dark ? "white" : "#5492F0"}} className="login-page-right-area-title">Login Account</div>
                <div style={{color: dark ? "#5492F0" : "#E1E2E3"}}>Lorem ipsum dolor sit ame consectetur adipisicing
                    elit Minima tenetur
                </div>
            </div>
            <div className="login-page-right-area-inputs">
                <ThemeProvider theme={dark ? darkTheme : lightTheme}>
                    <CssBaseline/>
                    <TextField id="outlined-basic" label="Username" variant="outlined" size="small"/>
                    <TextField
                        id="outlined-password-input"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        size="small"
                    />
                    <Button variant="contained">Login</Button>
                    {error ?
                        <Alert severity="error">
                            <AlertTitle>Error</AlertTitle>
                            {error}
                        </Alert>
                        :
                        null
                    }
                </ThemeProvider>
            </div>
        </div>
    );
}

export default LoginPageRightArea;