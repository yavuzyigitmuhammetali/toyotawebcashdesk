import React, {useContext, useEffect, useState} from 'react';
import TextField from '@mui/material/TextField';
import {ThemeProvider, createTheme} from '@mui/material/styles';
import {
    Alert,
    AlertTitle,
    Button,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput
} from "@mui/material";
import "./loginPageRightArea.css";
import KeyboardContext from "../../../shared/components/ScreenKeyboard/context";
import ScreenKeyboard from "../../../shared/components/ScreenKeyboard/ScreenKeyboard";
import {useNavigate} from "react-router-dom";
import AppStatusContext from "../../../shared/state/AppStatus/context";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {useTranslation} from "react-i18next";

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
    const [showPassword, setShowPassword] = useState(false);
    const [loginData,setLoginData] = useState({username:"",password:""})
    const [buttonState, setButtonState] = useState(false)
    const navigate = useNavigate();
    const { handleElementFocus, value,onChangeValue,enterRef,clearValues } = useContext(KeyboardContext);
    const {loginFunction} = useContext(AppStatusContext);
    const {t} = useTranslation();

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    useEffect(() => {
        setLoginData(() => {
            return {username: value.username??"",password: value.password??""}
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
                navigate('/', { replace: true, state: { successMessage: t('loginSuccessMessage') }});
            } else {
                setError(true);
            }
        } catch (error) {
            console.error(t('errorTitle'), error);
            setError(true);
        } finally {
            //setLoading(false);
        }
    };

    return (
        <ThemeProvider theme={dark ? darkTheme : lightTheme}>
        <div style={{ backgroundColor: dark ? "#1C1F25" : "white", border: "2px solid #1A2027"}}
             className="login-page-right-area-container">
            <div className="login-page-right-area-info">
                <div style={{color: dark ? "white" : "#5492F0"}} className="login-page-right-area-title">{t('loginAccount')}</div>
                <div style={{color: dark ? "#5492F0" : "#E1E2E3"}}>
                    {t('enterUsernamePassword')}
                </div>
            </div>
            <form className="login-page-right-area-inputs">

                    <TextField
                        error={error}
                        onFocus={handleElementFocus}
                        value={loginData.username}
                        label={t('username')}
                        onChange={onChangeValue}
                        autoComplete="current-password" id="username"  variant="outlined"/>
                    <FormControl variant="outlined">
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <OutlinedInput
                            error={error}
                            id="password"
                            label={t('password')}
                            onFocus={handleElementFocus}
                            value={loginData.password}
                            onChange={onChangeValue}
                            type={showPassword ? 'text' : 'password'}

                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            autoComplete="current-password"
                        />
                    </FormControl>

                    <Button ref={enterRef} onClick={handleLogin} disabled={!buttonState} color={error?"error":"info"}  variant="contained">{t('login')}</Button>
                    <ScreenKeyboard dark={dark} style={{width:"40px",height:"40px",alignSelf:"center"}}/>

            </form>
            {error ?
                <Alert severity="error">
                    <AlertTitle>{t('errorTitle')}</AlertTitle>
                    {t('loginErrorMessage')}
                </Alert>
                :
                null
            }
        </div>
</ThemeProvider>
    );
}

export default LoginPageRightArea;