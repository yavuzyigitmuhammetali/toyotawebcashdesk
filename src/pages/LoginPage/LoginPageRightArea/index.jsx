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
import "./index.css";
import ScreenKeyboard from "../../../shared/components/ScreenKeyboard/ScreenKeyboard";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {useLoginPageRightArea} from "./useLoginPageRightArea";
import KeyboardContext from "../../../shared/components/ScreenKeyboard/context";
import AppStatusContext from "../../../shared/states/AppStatus/context";
import {useTranslation} from "react-i18next";

function LoginPageRightArea() {
    const {handleElementFocus, value, onChangeValue, enterRef} = useContext(KeyboardContext);
    const {loginFunction, lang, dark, performanceMode, colorOptions} = useContext(AppStatusContext);
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
    } = useLoginPageRightArea(value, loginFunction, t("loginSuccessMessage"), t("errorTitle"), performanceMode);

    const buttonColor = error ? "error" : colorOptions.buttons.loginRight ?? colorOptions.buttons.default;

    return (
        <div className="login-page-right-area-container">
            <div className="login-page-right-area-info">
                <h2 className="login-page-right-area-title">{t("loginAccount")}</h2>
                <p className="login-page-right-area-subtitle">{t("enterUsernamePassword")}</p>
            </div>
            <form className="login-page-right-area-inputs" onSubmit={(e) => {
                e.preventDefault();
                handleLogin();
            }}>
                <TextField
                    color={buttonColor}
                    error={error}
                    onFocus={handleElementFocus}
                    value={loginData.username}
                    label={t("username")}
                    onChange={onChangeValue}
                    autoComplete="username"
                    id="username"
                    variant="outlined"
                />
                <FormControl color={buttonColor} variant="outlined">
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
                    color={buttonColor}
                    variant="contained"
                    type="submit"
                >
                    {loading ? <CircularProgress size={24} color="inherit"/> : t("login")}
                </Button>
                <ScreenKeyboard
                    color={colorOptions.screenKeyboard.loginRight ?? colorOptions.screenKeyboard.default}
                    performanceMode={performanceMode}
                    language={lang}
                    dark={dark}
                    style={{width: "40px", height: "40px", alignSelf: "center"}}
                />
            </form>
            {error && (
                <Alert severity="error">
                    <AlertTitle>{t("errorTitle")}</AlertTitle>
                    {t("loginErrorMessage")}
                </Alert>
            )}
        </div>
    );
}

export default LoginPageRightArea;