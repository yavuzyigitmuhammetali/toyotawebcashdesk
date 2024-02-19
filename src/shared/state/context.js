import React from "react";
import {getStatus} from "../functions/api";
import {checkOnline} from "../functions/checkOnline";
import FullScreenAlert from "../components/FullScreenAlert";
import OnlineOfflineIndicator from "../components/OnlineOfflineIndicator";

const StatusContext = React.createContext(undefined);

const StatusProvider = ({children}) => {
    const [status, setStatus] = React.useState({})
    const [online,setOnline] = React.useState(true)
    const [dark, setDark] =React.useState(false)

    React.useEffect(() => {
        console.log("deneme")
        getStatus().then(response =>setStatus(response.data)).catch(err=>console.log(err))
       // checkOnline().then(res=>setOnline(res))
    }, []);

    if (online){
        return (
            <StatusContext.Provider
                value={{
                    dark,
                    status,
                    online
                }}
            >
                {children}
            </StatusContext.Provider>
        );
    } else {
        return (
            <div>
                <div style={{position: "fixed", right: 10, bottom: 0}}>
                <OnlineOfflineIndicator/>
                </div>
                <FullScreenAlert dark={dark}>

                    <div>Erişim Engellendi</div>
                    <div>Aktif saatler dışında giriş yapmayı denediniz</div>
                </FullScreenAlert>
            </div>
            );
    }

};
export default StatusContext;
export {StatusProvider};