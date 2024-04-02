import React from "react";
import config from '../../../config.json';
import {getIp, getStatus, testLogin} from "./api";
import { setupTimer, updateOnlineStatus} from "../../functions/checkOnline";
import {login} from "./api"
const AppStatusContext = React.createContext(undefined);


const AppStatusProvider = ({children}) => {
    const [status, setStatus] = React.useState(JSON.parse(localStorage.getItem('status')));
    const [isOnline, setIsOnline] = React.useState(JSON.parse(sessionStorage.getItem('online')));
    const [isLoggedIn, setIsLoggedIn] = React.useState(JSON.parse(sessionStorage.getItem('loggedIn')));
    const [dark, setDark] = React.useState(JSON.parse(localStorage.getItem('dark'))??false);
    const [lang, setLang] = React.useState(JSON.parse(localStorage.getItem('lang'))??'tr');


    React.useEffect(() => {
        getStatus()
            .then(response => {
                const statusData = response.data;
                return getIp().then(ipResponse => {
                    const combinedData = {
                        ...statusData,
                        userIp: ipResponse.data.ip,
                        case:config.caseNumber,
                        storeNumber:config.storeNumber
                    };
                    setStatus(combinedData);
                    localStorage.setItem('status', JSON.stringify(combinedData));
                }).catch(reason => console.log(reason));
            })
            .catch(err => console.log(err));
        testLogin()
            .then(response =>{
                setIsLoggedIn(response.status === 200)
                sessionStorage.setItem('loggedIn', JSON.stringify(response.status === 200));
            } )
            .catch(reason => {
                setIsLoggedIn(false)
                sessionStorage.setItem('loggedIn', JSON.stringify(false));
                console.log(reason)
            });
    }, []);

    React.useEffect(() => {
        if (status){
            updateOnlineStatus(setIsOnline,status.schedule);
            const timer = setupTimer(setIsOnline,status.schedule??null);
            sessionStorage.setItem('online', JSON.stringify(isOnline));
            return () => timer && clearTimeout(timer);
        }
    }, [status]);


    React.useEffect(() => {
         if (!isOnline){
            // logOut();
         }
     }, [isOnline,isLoggedIn]);


     const changeDark = () => {
        setDark(dark?false:true);
        localStorage.setItem('dark', JSON.stringify(dark?false:true));
     }

     const changeLang = () => {
        if (lang === "tr"){
            setLang("en");
            localStorage.setItem('lang', JSON.stringify("en"))
        } else if (lang === "en") {
            setLang("tr");
            localStorage.setItem('lang', JSON.stringify("tr"))
        }else{
            setLang("tr");
            localStorage.setItem('lang', JSON.stringify("tr"))
        }
     }

    const logOut = React.useCallback(() => {
        document.cookie = "auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/api/v1;";
        setIsLoggedIn(false);
    }, [setIsLoggedIn]);

    const loginFunction = async (body) => {
        try {
            await login(body)
            setIsLoggedIn(true);
            sessionStorage.setItem('loggedIn', JSON.stringify(true));
            return true;
        } catch (error) {
            console.error(error);
            setIsLoggedIn(false);
            sessionStorage.setItem('loggedIn', JSON.stringify(false));
            return false;
        }
    };

    return (
        <AppStatusContext.Provider
            value={{
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