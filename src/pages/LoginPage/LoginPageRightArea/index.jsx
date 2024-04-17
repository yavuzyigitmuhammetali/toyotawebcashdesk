import React, {useContext} from "react";
import TextField from "@mui/material/TextField";
import {
    Alert,
    AlertTitle,
    Button,
    CircularProgress,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
} from "@mui/material";
import "./loginPageRightArea.css";
import ScreenKeyboard from "../../../shared/components/ScreenKeyboard/ScreenKeyboard";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {useLoginPageRightArea} from "./useLoginPageRightArea";
import KeyboardContext from "../../../shared/components/ScreenKeyboard/context";
import AppStatusContext from "../../../shared/states/AppStatus/context";
import {useTranslation} from "react-i18next";

function LoginPageRightArea() {
    const {handleElementFocus, value, onChangeValue, enterRef} = useContext(KeyboardContext);
    const {loginFunction, lang, dark} = useContext(AppStatusContext);
    const {t} = useTranslation();
    const {
        error,
        showPassword,
        loginData,
        buttonState,
        loading,
        handleClickShowPassword,
        handleMouseDownPassword,
        handleLogin
    } = useLoginPageRightArea(value, loginFunction, t("loginSuccessMessage"), t("errorTitle"));

    return (
        <div className={`login-page-right-area-container ${dark ? 'dark' : 'light'}`}>
            <div className="login-page-right-area-info">
                <div className={`login-page-right-area-title ${dark ? 'dark' : 'light'}`}>
                    {t("loginAccount")}
                </div>
                <div className={`login-page-right-area-subtitle ${dark ? 'dark' : 'light'}`}>
                    {t("enterUsernamePassword")}
                </div>
            </div>
            <form className="login-page-right-area-inputs">
                <TextField
                    error={error}
                    onFocus={handleElementFocus}
                    value={loginData.username}
                    label={t("username")}
                    onChange={onChangeValue}
                    autoComplete="current-password"
                    id="username"
                    variant="outlined"
                />
                <FormControl variant="outlined">
                    <InputLabel htmlFor="password">{t("password")}</InputLabel>
                    <OutlinedInput
                        error={error}
                        id="password"
                        label={t("password")}
                        onFocus={handleElementFocus}
                        value={loginData.password}
                        onChange={onChangeValue}
                        type={showPassword ? "text" : "password"}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff/> : <Visibility/>}
                                </IconButton>
                            </InputAdornment>
                        }
                        autoComplete="current-password"
                    />
                </FormControl>

                <Button
                    ref={enterRef}
                    onClick={handleLogin}
                    disabled={!buttonState || loading}
                    color={error ? "error" : "info"}
                    variant="contained"
                >
                    {loading ? <CircularProgress size={24} color="inherit"/> : t("login")}
                </Button>
                <ScreenKeyboard
                    language={lang}
                    dark={dark}
                    style={{width: "40px", height: "40px", alignSelf: "center"}}
                />
            </form>
            {error ? (
                <Alert severity="error">
                    <AlertTitle>{t("errorTitle")}</AlertTitle>
                    {t("loginErrorMessage")}
                </Alert>
            ) : null}
        </div>
    );
}

export default LoginPageRightArea;
