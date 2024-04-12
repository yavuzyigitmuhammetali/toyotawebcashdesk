import {useContext, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import KeyboardContext from '../../../shared/components/ScreenKeyboard/context';
import AppStatusContext from '../../../shared/state/AppStatus/context';
import {useTranslation} from 'react-i18next';

export const useLoginPageRightArea = () => {
    const [error, setError] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [loginData, setLoginData] = useState({username: "", password: ""});
    const [buttonState, setButtonState] = useState(false);
    const navigate = useNavigate();
    const {handleElementFocus, value, onChangeValue, enterRef, clearValues} = useContext(KeyboardContext);
    const {loginFunction, lang, dark} = useContext(AppStatusContext);
    const {t} = useTranslation();
    const [loading, setLoading] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    useEffect(() => {
        setLoginData(() => {
            return {username: value.username ?? "", password: value.password ?? ""};
        });

        if (loginData.username && loginData.password) {
            if (loginData.username.length >= 5 && loginData.password.length >= 5) {
                setButtonState(true);
            } else {
                setButtonState(false);
            }
        } else {
            setButtonState(false);
        }
        setError(false);
    }, [value]);

    const handleLogin = async () => {
        setLoading(true);
        setButtonState(false);
        try {
            const result = await loginFunction(loginData);
            if (result) {
                setError(false);
                clearValues();
                navigate("/", {replace: true, state: {successMessage: t("loginSuccessMessage")}});
            } else {
                setError(true);
            }
        } catch (error) {
            console.error(t("errorTitle"), error);
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    return {
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
    };
};