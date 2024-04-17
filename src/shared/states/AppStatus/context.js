import React from "react";
import config from '../../../config.json';
import {getIp, getStatus, login} from "./api";
import {setupTimer, updateOnlineStatus} from "../../functions/checkOnline";
import {useTranslation} from "react-i18next";

const AppStatusContext = React.createContext(undefined);

const AppStatusProvider = ({children}) => {
    const [status, setStatus] = React.useState(JSON.parse(localStorage.getItem('status')));
    const [cashier, setCashier] = React.useState(JSON.parse(localStorage.getItem('cashier'))??{});
    const [isOnline, setIsOnline] = React.useState(JSON.parse(localStorage.getItem('isOnline'))??false);
    const [isLoggedIn, setIsLoggedIn] = React.useState(JSON.parse(localStorage.getItem('isLoggedIn'))??false);
    const [dark, setDark] = React.useState(false);
    const [lang, setLang] = React.useState( 'en');
    const {i18n} = useTranslation();


    React.useEffect(() => {
            changeLang(JSON.parse(localStorage.getItem('lang'))??navigator.language.slice(0,2)); 
            changeDark(JSON.parse(localStorage.getItem('dark'))?? window.matchMedia('(prefers-color-scheme: dark)').matches);
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
            localStorage.setItem('isOnline', JSON.stringify(isOnline));
            return () => timer && clearTimeout(timer);
        }
    }, [status]);

/*    React.useEffect(() => {
        if (!isOnline) {
            logOut();
        }
    }, [isOnline]);*/


    const changeDark = (darkTheme = undefined) => {
        console.log("changeDark",darkTheme);
        const newDark = darkTheme === undefined ? !dark : darkTheme;
        setDark(newDark);
        document.documentElement.classList.toggle('dark', newDark);
        localStorage.setItem('dark', JSON.stringify(newDark));
    }
    const changeLang = (language) => {
        if (language) {
            setLang(language);
            localStorage.setItem('lang', JSON.stringify(language));
            i18n.changeLanguage(language);
        } else {
            const newLang = lang === "tr" ? "en" : "tr";
            setLang(newLang);
            localStorage.setItem('lang', JSON.stringify(newLang));
            i18n.changeLanguage(newLang);
        }
    };

    const logOut = React.useCallback(() => {
        setIsLoggedIn(false);
        document.cookie = "auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/api/v1;";
        localStorage.setItem('isLoggedIn', JSON.stringify(false));
        localStorage.setItem('cashier', JSON.stringify({}));
        setCashier({});
    }, [setIsLoggedIn, setCashier]);

    const loginFunction = async (body) => {
        try {
            const cashierData = await login(body);
            setCashier(cashierData.data);
            localStorage.setItem('cashier', JSON.stringify(cashierData.data));
            setIsLoggedIn(true);
            localStorage.setItem('isLoggedIn', JSON.stringify(true));
            return true;
        } catch (error) {
            console.error(error);
            setIsLoggedIn(false);
            localStorage.setItem('isLoggedIn', JSON.stringify(false));
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
                changeLang,
                setIsOnline
            }}
        >
            {children}
        </AppStatusContext.Provider>
    );
};
export default AppStatusContext;
export {AppStatusProvider};
