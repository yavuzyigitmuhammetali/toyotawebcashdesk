import React from 'react';
import {IconButton} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import {Link} from "react-router-dom";
import SettingsDashboard from "../../SettingsDashboard";

const Header = ({dark, pageTitle, prevLink, performanceMode}) => (
    <header className="main-container__header">
        <IconButton
            color="error"
            component={Link}
            to={prevLink}
            className={performanceMode ? 'performance' : ''}
        >
            <ArrowBackIosIcon/>
        </IconButton>
        <h1 className="main-container__title">{pageTitle.toUpperCase()}</h1>
        <div>
            <SettingsDashboard/>
        </div>
    </header>
);

export default React.memo(Header);