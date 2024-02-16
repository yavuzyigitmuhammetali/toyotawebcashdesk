import React, {useContext, useEffect, useState} from 'react';
import TextField from '@mui/material/TextField';
import {ThemeProvider, createTheme} from '@mui/material/styles';
import {Alert, AlertTitle, Button} from "@mui/material";
import "./loginPageRightArea.css";
import {login, loginTest} from "./api";
import KeyboardContext from "../../../shared/components/ScreenKeyboard/context";
import ScreenKeyboard from "../../../shared/components/ScreenKeyboard/ScreenKeyboard";

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
    const [error, setError] = useState(false)
    const [buttonState, setButtonState] = useState(false)
    const { handleElementClick, value,onChangeValue,enter } = useContext(KeyboardContext);
    useEffect(() => {
        loginTest().then(response=>console.log(response.data)).catch(e => console.log(e));
    }, []);

    useEffect(() => {
        if (value["username"]&&value["password"]){
            if ((value["username"].length>=5&&value["password"].length)>5){
                setButtonState(true)
            }
            else {
                setButtonState(false)
            }
        }else {
            setButtonState(false)
        }
        setError(false);
    }, [value]);

    const handleLogin = async () => {

        try {
            const response = await login({username:value["username"],password:value["password"]})
            if (response.status ===401){
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
                    <TextField
                        error={error}
                        onClick={handleElementClick}
                        value={value["username"]?value["username"]:""}
                        label="Kullanıcı Adı"
                        focused
                        onChange={e=>onChangeValue(e.target.value)}
                        autoComplete="current-password" id="username"  variant="outlined" size="small"/>
                    <TextField
                        error={error}
                        id="password"
                        label="Şifre"
                        focused
                        value={value["password"]?value["password"]:""}
                        onChange={e=>onChangeValue(e.target.value)}
                        onClick={handleElementClick}
                        type="password"
                        autoComplete="current-password"
                        size="small"
                    />
                    <Button ref={enter} onClick={handleLogin} disabled={!buttonState} color={error?"error":"info"}  variant="contained">Login</Button>
                    <ScreenKeyboard dark={dark} style={{width:"40px",height:"40px",alignSelf:"center"}}/>
                    {error ?
                        <Alert severity="error">
                            <AlertTitle>Hata</AlertTitle>
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