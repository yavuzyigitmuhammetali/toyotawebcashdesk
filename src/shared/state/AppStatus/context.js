import React from "react";
import config from '../../../config.json';
import {getIp, getStatus, login, setupAxiosInterceptors} from "./api";
import {setupTimer, updateOnlineStatus} from "../../functions/checkOnline";
import {useTranslation} from "react-i18next";

const AppStatusContext = React.createContext(undefined);

const AppStatusProvider = ({children}) => {
    const [status, setStatus] = React.useState(JSON.parse(localStorage.getItem('status')));
    const [cashier, setCashier] = React.useState(JSON.parse(localStorage.getItem('cashier')) ?? {});
    const [isOnline, setIsOnline] = React.useState(JSON.parse(localStorage.getItem('online')));
    const [isLoggedIn, setIsLoggedIn] = React.useState(JSON.parse(localStorage.getItem('loggedIn')));
    const [dark, setDark] = React.useState(JSON.parse(localStorage.getItem('dark')) ?? false);
    const [lang, setLang] = React.useState(JSON.parse(localStorage.getItem('lang')) ?? 'en');
    const {i18n} = useTranslation();

    React.useEffect(() => {
        setupAxiosInterceptors(setIsLoggedIn);
    }, []);

    React.useEffect(() => {
        if (dark) {
            document.documentElement.classList.toggle('dark', true);
        }
        getStatus()
            .then(response => {
                const statusData = response.data;
                return getIp().then(ipResponse => {
                    const combinedData = {
                        ...statusData,
                        userIp: ipResponse.data.ip,
                        case: config.caseNumber,
                        storeNumber: config.storeNumber
                    };
                    setStatus(combinedData);
                    localStorage.setItem('status', JSON.stringify(combinedData));
                });
            })
            .catch(err => {
                setIsOnline(false);
                console.log(err);
            });
    }, []);

    React.useEffect(() => {
        if (status && JSON.parse(localStorage.getItem('status')) !== status) {
            updateOnlineStatus(setIsOnline, status.schedule);
            const timer = setupTimer(setIsOnline, status.schedule ?? null);
            localStorage.setItem('online', JSON.stringify(isOnline));
            return () => timer && clearTimeout(timer);
        }
    }, [status]);

    React.useEffect(() => {
        if (!isOnline) {
            logOut();
        }
    }, [isOnline, isLoggedIn]);


    const changeDark = () => {
        setDark(!dark);
        document.documentElement.classList.toggle('dark', !dark);
        localStorage.setItem('dark', JSON.stringify(!dark));
    }

    const changeLang = () => {
        setLang(lang === "tr" ? "en" : "tr");
        localStorage.setItem('lang', JSON.stringify(lang === "tr" ? "en" : "tr"));
        i18n.changeLanguage(lang === "tr" ? "en" : "tr");
    }

    const logOut = React.useCallback(() => {
        document.cookie = "auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/api/v1;";
        localStorage.setItem('loggedIn', JSON.stringify(false));
        localStorage.setItem('cashier', JSON.stringify({}));
        setIsLoggedIn(false);
        setCashier({});
    }, [setIsLoggedIn, setCashier]);

    const loginFunction = async (body) => {
        try {
            const cashierData = await login(body);
            setCashier(cashierData.data);
            localStorage.setItem('cashier', JSON.stringify(cashierData.data));
            setIsLoggedIn(true);
            localStorage.setItem('loggedIn', JSON.stringify(true));
            return true;
        } catch (error) {
            console.error(error);
            setIsLoggedIn(false);
            localStorage.setItem('loggedIn', JSON.stringify(false));
            return false;
        }
    };

    return (
        <AppStatusContext.Provider
            value={{
                cashier,
                dark,
                lang,
                status,
                isOnline,
                isLoggedIn,
                loginFunction,
                logOut,
                changeDark,
                changeLang
            }}
        >
            {children}
        </AppStatusContext.Provider>
    );
};
export default AppStatusContext;
export {AppStatusProvider};