import React from 'react';
import {IconButton} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import {Link} from "react-router-dom";
import SettingsDashboard from "../../SettingsDashboard";

const Header = ({dark, pageTitle, prevLink}) => (
    <header className={`main-container-header ${dark ? 'dark' : ''}`}>
        <div>
            <IconButton color="error" component={Link} to={prevLink}>
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

