import React from "react";
import {getIp, getStatus, testLogin} from "./api";
import { setupTimer, updateOnlineStatus} from "../../functions/checkOnline";
import {login} from "./api"
const AppStatusContext = React.createContext(undefined);

const AppStatusProvider = ({children}) => {
    const [status, setStatus] = React.useState(JSON.parse(localStorage.getItem('status')));
    const [isOnline, setIsOnline] = React.useState(JSON.parse(localStorage.getItem('online')));
    const [isLoggedIn, setIsLoggedIn] = React.useState(JSON.parse(localStorage.getItem('loggedIn')));
    const [dark, setDark] = React.useState(false);
    //const [lang, setLang] = React.useState("tr");


    React.useEffect(() => {
        getStatus()
            .then(response => {
                const statusData = response.data;
                return getIp().then(ipResponse => {
                    const combinedData = {
                        ...statusData,
                        userIp: ipResponse.data.ip,
                    };
                    setStatus(combinedData);
                    localStorage.setItem('status', JSON.stringify(combinedData));
                }).catch(reason => console.log(reason));
            })
            .catch(err => console.log(err));
        testLogin()
            .then(response =>{
                setIsLoggedIn(response.status === 200)
                localStorage.setItem('loggedIn', JSON.stringify(response.status === 200));
            } )
            .catch(reason => {
                setIsLoggedIn(false)
                localStorage.setItem('loggedIn', JSON.stringify(false));
                console.log(reason)
            });
    }, []);

    React.useEffect(() => {
        if (status){
            updateOnlineStatus(setIsOnline,status.schedule);
            const timer = setupTimer(setIsOnline,status.schedule??null);
            localStorage.setItem('online', JSON.stringify(isOnline));
            return () => timer && clearTimeout(timer);
        }
    }, [status]);


    React.useEffect(() => {
         if (!isOnline){
            // logOut();
         }
     }, [isOnline,isLoggedIn]);


    const logOut = React.useCallback(() => {
        document.cookie = "auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/api/v1;";
        setIsLoggedIn(false);
    }, [setIsLoggedIn]);

    const loginFunction = async (body) => {
        try {
            await login(body)
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
                dark,
                status,
                isOnline,
                isLoggedIn,
                loginFunction,
                logOut
            }}
        >
            {children}
        </AppStatusContext.Provider>
    );
};
export default AppStatusContext;
export {AppStatusProvider};