import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';

export const useLoginPageRightArea = (value, loginFunction, loginSuccessMessage, errorTitle) => {
    const [error, setError] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [loginData, setLoginData] = useState({username: "", password: ""});
    const [buttonState, setButtonState] = useState(false);
    const navigate = useNavigate();
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    const handleLogin = async () => {
        setLoading(true);
        setButtonState(false);
        try {
            const result = await loginFunction(loginData);
            if (result) {
                setError(false);
                navigate("/", {replace: true, state: {successMessage: loginSuccessMessage}});
            } else {
                setError(true);
            }
        } catch (error) {
            console.error(errorTitle, error);
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
        handleClickShowPassword,
        handleMouseDownPassword,
        handleLogin
    };
};