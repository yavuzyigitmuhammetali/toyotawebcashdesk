import React from 'react';
import {IconButton} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import {Link} from "react-router-dom";
import SettingsDashboard from "../../SettingsDashboard";

const Header = ({dark, pageTitle, prevLink, performanceMode}) => (
    <header className={`main-container-header ${dark ? 'dark' : ''} ${performanceMode ? 'performance' : ''}`}>
        <div>
            <IconButton color="error" component={Link} to={prevLink} style={performanceMode ? {animation: 'none'} : {}}>
                <ArrowBackIosIcon/>
            </IconButton>
        </div>
        <div>{pageTitle.toUpperCase()}</div>
        <div>
            <SettingsDashboard/>
        </div>
    </header>
);

export default Header;
