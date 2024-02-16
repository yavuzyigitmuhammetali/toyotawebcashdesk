import React, {useContext} from 'react';
import "./mainContainer.css"
import {IconButton} from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import SettingsIcon from '@mui/icons-material/Settings';
import OnlineOfflineIndicator from "../OnlineOfflineIndicator";
import StatusContext from "../../state/context";

function MainContainer({children}) {
    const {status,online} = useContext(StatusContext)
    const today = new Date();
    const formattedDate = `${(today.getMonth() + 1).toString().padStart(2, '0')}/${today.getDate().toString().padStart(2, '0')}/${today.getFullYear()}`;

    return (
        <div className="main-container-body">
            <header className="main-container-header">
                <div>
                    <IconButton>
                        <ArrowBackIosIcon/>
                    </IconButton>
                </div>
                <div>
                    DENEME
                </div>
                <div>
                    <IconButton>
                        <SettingsIcon/>
                    </IconButton>
                </div>
            </header>
            <main className="main-container-main">
                {children}
            </main>
            <footer className="main-container-footer">
                <div><OnlineOfflineIndicator/></div>
                <div>{formattedDate}</div>
                <div style={{display:"flex",flexDirection:"column"}}>
                    <span>Kasa: {status.case}</span>
                    <span>Mağza: {status.storeNumber}</span>
                </div>
            </footer>
        </div>
    );
}

export default MainContainer;