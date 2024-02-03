import React, {useEffect, useState} from 'react';
import "./mainScreen.css"
import OnlineOfflineIndicator from "../../shared/components/OnlineOfflineIndicator";
import {getIp, getStatus} from "./api";
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import {IconButton} from "@mui/material";
import MainScreenItem from "./components/MainScreenItem";

function MainScreen() {
    const [userIP, setUserIP] = useState('');
    const [status, setStatus] = useState({})


    useEffect(() => {
        getIp()
            .then(response => {
                setUserIP(response.data.ip);
            })
            .catch(error => {
                console.error(error);
            });
        getStatus()
            .then(response => {
                setStatus(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    return (
        <>
            <div className="main-screen-container">
                <div className="main-screen-active-area">
                    <div className="main-screen-sides">
                        <MainScreenItem>DENEME</MainScreenItem>
                        <MainScreenItem>DENEME</MainScreenItem>
                        <MainScreenItem>DENEME</MainScreenItem>
                    </div>
                    <div className="main-screen-sides">
                        <MainScreenItem>DENEME</MainScreenItem>
                        <MainScreenItem>DENEME</MainScreenItem>
                        <MainScreenItem>DENEME</MainScreenItem>
                    </div>
                </div>
            </div>
            <div className="main-screen-lower-left" >
                <OnlineOfflineIndicator/>
            </div>
            <div className="main-screen-upper-left">
                <div>Mağaza No: {status.store_number}</div>
                <div>Kasa No: {status.case} (KASA {status.case})</div>
                <div>İp No: {userIP}</div>
                <div>Versiyon: {status.version}</div>
            </div>
            <div className="main-screen-upper-right">
                <IconButton color="info" aria-label="delete">
                    <SettingsIcon/>
                </IconButton>
            </div>
            <div className="main-screen-lower-right">
                <IconButton color="error" aria-label="delete">
                    <LogoutIcon/>
                </IconButton>
            </div>
        </>

    );
}

export default MainScreen;