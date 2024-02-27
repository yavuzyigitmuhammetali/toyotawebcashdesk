import React from "react";
import {getIp, getStatus, setupAxiosInterceptors, testLogin} from "./api";
import {checkOnline} from "../functions/checkOnline";
import {login} from "./api"
const DataFetchingContext = React.createContext(undefined);

const DataFetchingProvider = ({children}) => {
    const [status, setStatus] = React.useState(JSON.parse(localStorage.getItem('status')));
    const [online, setOnline] = React.useState(JSON.parse(localStorage.getItem('online')));
    const [dark, setDark] = React.useState(false);
    //const [lang, setLang] = React.useState("tr");
    const [loggedIn, setLoggedIn] = React.useState(JSON.parse(localStorage.getItem('loggedIn')));

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
        checkOnline().then(res=> {
            if (!res){
                setOnline(false)
                localStorage.setItem('online', JSON.stringify(false));
                document.cookie = "auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/api/v1;";
            }else {
                setOnline(true)
                localStorage.setItem('online', JSON.stringify(true));
            }
        })
        testLogin()
            .then(response =>{
                setLoggedIn(response.status === 200)
                localStorage.setItem('loggedIn', JSON.stringify(response.status === 200));
            } )
            .catch(reason => {
                setLoggedIn(false)
                localStorage.setItem('loggedIn', JSON.stringify(false));
                console.log(reason)
            });
    }, []);


    // React.useEffect(() => {
    //     setupAxiosInterceptors(online,setLoggedIn)
    // }, [online]);

    const loginFunction = async (body) => {
        try {
            await login(body)
            setLoggedIn(true);
            localStorage.setItem('loggedIn', JSON.stringify(true));
            return true;
        } catch (error) {
            console.error(error);
            setLoggedIn(false);
            localStorage.setItem('loggedIn', JSON.stringify(false));
            return false;
        }
    };

    return (
        <DataFetchingContext.Provider
            value={{
                dark,
                status,
                online,
                loggedIn,
                loginFunction
            }}
        >
            {children}
        </DataFetchingContext.Provider>
    );
};
export default DataFetchingContext;
export {DataFetchingProvider};