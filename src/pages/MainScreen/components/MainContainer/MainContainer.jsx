import React, { useContext, useEffect, useState } from "react";
import "./mainContainer.css";
import { IconButton } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import OnlineOfflineIndicator from "../../../../shared/components/OnlineOfflineIndicator";
import AppStatusContext from "../../../../shared/state/AppStatus/context";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import SettingsDashboard from "../SettingsDashboard/SettingsDashboard";
import { useTranslation } from "react-i18next";
import {createTheme, ThemeProvider} from "@mui/material/styles";

function MainContainer() {
    const { status, isOnline, lang, dark } = useContext(AppStatusContext);
    const today = new Date();
    const formattedDate = lang === "tr" ? `${today.getDate().toString().padStart(2, "0")}/${(today.getMonth() + 1).toString().padStart(2, "0")}/${today.getFullYear()}` : `${(today.getMonth() + 1).toString().padStart(2, "0")}/${today.getDate().toString().padStart(2, "0")}/${today.getFullYear()}`;
    const [pathHistory, setPathHistory] = useState(["/"]);
    const location = useLocation();
    const { productId, receiptNumber } = useParams();
    const { t } = useTranslation();

    useEffect(() => {
        setPathHistory((prevState) => [...prevState, location.pathname]);
    }, [location.pathname]);

    let pageTitle;
    let prevLink;
    switch (location.pathname) {
        case "/":
            pageTitle = t("homepage");
            prevLink = "/";
            break;
        case "/order/create":
            pageTitle = t("orderCreationScreen");
            prevLink = "/";
            break;
        case "/order/payment":
            pageTitle = t("paymentScreen");
            prevLink = "/order/create";
            break;
        case "/purchase/list":
            pageTitle = t("receipts");
            prevLink = "/";
            break;
        case "/refund/create":
            pageTitle = t("returnScreen");
            prevLink = "/";
            break;
        case "/products/list":
        case "/products/list/":
            pageTitle = t("productListingScreen");
            prevLink = "/";
            break;
        case "/product/add":
            pageTitle = t("productAddScreen");
            prevLink = "/";
            break;
        case "/summary/calculate":
            pageTitle = t("reports");
            prevLink = "/";
            break;
        default:
            if (location.pathname.startsWith("/products/list/")) {
                pageTitle = t("viewingProduct")+ ": " + productId;
                prevLink = pathHistory[pathHistory.length - 2] === "/summary/calculate" ? "/summary/calculate" : "/products/list";
            } else if (location.pathname.startsWith("/receipt/")) {
                pageTitle = t("receiptNumber")+ ": "  + receiptNumber;
                prevLink = pathHistory[pathHistory.length - 2] === "/purchase/list" ? "/purchase/list" : "/";
            } else {
                pageTitle = t("title");
                prevLink = "/";
            }
    }
    return (
        <ThemeProvider theme={createTheme({palette: {mode: dark ? "dark" : "light"}})}>
            <div style={{color:dark?"white":"black",backgroundColor:dark?"rgb(17, 20, 24)":"white"}} className="main-container-body">
                <header style={{backgroundColor:dark&&"rgb(28, 31, 37)"}} className="main-container-header">
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
                <main style={{backgroundColor:dark&&"#131922"}} className="main-container-main">
                    <Outlet/>
                </main>
                <footer style={{backgroundColor:dark&&"rgb(28, 31, 37)"}} className="main-container-footer">
                    <div>
                        <OnlineOfflineIndicator dark={dark} language={lang} online={isOnline}/>
                    </div>
                    <div>{formattedDate}</div>
                    <div style={{display: "flex", flexDirection: "column"}}>
                        <span>{t("cashRegister")}: {status.case}</span>
                        <span>{t("store")}: {status.storeNumber}</span>
                    </div>
                </footer>
            </div>
        </ThemeProvider>
    );
}

export default MainContainer;
