import React, {useContext, useEffect, useState} from 'react';
import TextField from '@mui/material/TextField';
import {ThemeProvider, createTheme} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {Alert, AlertTitle, Button} from "@mui/material";
import "./loginPageRightArea.css";
import {login, loginTest} from "./api";
import KeyboardContext from "../../../shared/componenets/ScreenKeyboard/context";

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

function LoginPageRightArea({dark = false}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false)
    const { handleElementClick, value } = useContext(KeyboardContext);
    const loginInfo = {
        username:value["username"]?value["username"]:username
        ,password:value["password"]?value["password"]:password
    };

    useEffect(() => {
        loginTest().then(response=>console.log(response.data)).catch(e => console.log(e));
    }, []);


    const handleLogin = async () => {
        console.log(loginInfo);
        try {
            const response = await login(loginInfo)
            if (response.status ==401){
                setError(true);
            }else {
                setError(false);
            }
        } catch (axiosError) {
            setError(true);
        } finally {

        }
    };

    return (
        <div style={{width: "400px", backgroundColor: dark ? "#1C1F25" : "white", border: "2px solid #1A2027"}}
             className="login-page-right-area-container">
            <div className="login-page-right-area-info">
                <div style={{color: dark ? "white" : "#5492F0"}} className="login-page-right-area-title">Login Account</div>
                <div style={{color: dark ? "#5492F0" : "#E1E2E3"}}>
                    Lütfen Kullancı Adı ve Şifre Girin
                </div>
            </div>
            <form className="login-page-right-area-inputs">
                <ThemeProvider theme={dark ? darkTheme : lightTheme}>
                    <CssBaseline/>
                    <TextField
                        onClick={handleElementClick}
                        onChange={e=>setUsername(e.target.value)}
                        autoComplete="current-password" id="username" placeholder="Username" variant="outlined" size="small"/>
                    <TextField
                        id="password"
                        onChange={e=>setPassword(e.target.value)}
                        onClick={handleElementClick}
                        placeholder="Password"
                        type="password"
                        autoComplete="current-password"
                        size="small"
                    />
                    <Button disabled={(loginInfo.username.length&&loginInfo.password.length)<5} onClick={handleLogin}  variant="contained">Login</Button>
                    {error ?
                        <Alert severity="error">
                            <AlertTitle>Error</AlertTitle>
                            Kullanıcı adı veya şifre hatalı!
                        </Alert>
                        :
                        null
                    }
                </ThemeProvider>
            </form>
        </div>
    );
}

export default LoginPageRightArea;