import React, {useContext, useEffect, useState} from 'react';
import TextField from '@mui/material/TextField';
import {ThemeProvider, createTheme} from '@mui/material/styles';
import {Alert, AlertTitle, Button} from "@mui/material";
import "./loginPageRightArea.css";
import KeyboardContext from "../../../shared/components/ScreenKeyboard/context";
import ScreenKeyboard from "../../../shared/components/ScreenKeyboard/ScreenKeyboard";
import {useNavigate} from "react-router-dom";
import DataFetchingContext from "../../../shared/state/context";

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
    const [loginData,setLoginData] = useState({username:"",password:""})
    const [buttonState, setButtonState] = useState(false)
    const navigate = useNavigate();
    const { handleElementFocus, value,onChangeValue,enterRef,clearValues } = useContext(KeyboardContext);
    const {loginFunction} = useContext(DataFetchingContext);

    useEffect(() => {
        setLoginData(() => {
            return {username: value.username,password: value.password}
        })

        if (loginData.username&&loginData.password){
            if ((loginData.username.length>=5)&&(loginData.password.length>=5)){
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
        //setLoading(true);
        try {
            const result = await loginFunction(loginData);
            if (result) {
                setError(false);
                clearValues();
                navigate('/', { replace: true, state: { successMessage: "Oturum Açma İşlemi Başarılı, Hoşgeldiniz." }});
            } else {
                setError(true);
            }
        } catch (error) {
            console.error("Giriş işlemi sırasında bir hata oluştu:", error);
            setError(true);
        } finally {
            //setLoading(false);
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
                        onFocus={handleElementFocus}
                        value={loginData.username}
                        label="Kullanıcı Adı"
                        onChange={onChangeValue}
                        autoComplete="current-password" id="username"  variant="outlined" size="small"/>
                    <TextField
                        error={error}
                        id="password"
                        label="Şifre"
                        onFocus={handleElementFocus}
                        value={loginData.password}
                        onChange={onChangeValue}
                        type="password"
                        autoComplete="current-password"
                        size="small"
                    />
                    <Button ref={enterRef} onClick={handleLogin} disabled={!buttonState} color={error?"error":"info"}  variant="contained">Login</Button>
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