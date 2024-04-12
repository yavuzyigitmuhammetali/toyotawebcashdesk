import React from "react";
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

function LoginPageRightArea() {
    const {
        error,
        showPassword,
        loginData,
        buttonState,
        loading,
        handleElementFocus,
        onChangeValue,
        enterRef,
        handleClickShowPassword,
        handleMouseDownPassword,
        handleLogin,
        t,
        lang,
        dark
    } = useLoginPageRightArea();

    return (
        <div
            style={{backgroundColor: dark ? "#1C1F25" : "white", border: "2px solid #1A2027"}}
            className="login-page-right-area-container"
        >
            <div className="login-page-right-area-info">
                <div style={{color: dark ? "white" : "#5492F0"}} className="login-page-right-area-title">
                    {t("loginAccount")}
                </div>
                <div style={{color: dark ? "#5492F0" : "#E1E2E3"}}>{t("enterUsernamePassword")}</div>
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
                    <InputLabel htmlFor="password">Password</InputLabel>
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
