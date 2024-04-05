import React, { useContext, useEffect, useState } from "react";
import "./mainContainer.css";
import { IconButton } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import OnlineOfflineIndicator from "../../../../shared/components/OnlineOfflineIndicator";
import AppStatusContext from "../../../../shared/state/AppStatus/context";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import SettingsDashboard from "../SettingsDashboard/SettingsDashboard";
import { useTranslation } from "react-i18next";

function MainContainer() {
    const { status, isOnline } = useContext(AppStatusContext);
    const today = new Date();
    const formattedDate = `${(today.getMonth() + 1).toString().padStart(2, "0")}/${today.getDate().toString().padStart(2, "0")}/${today.getFullYear()}`;
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
                pageTitle = t("viewingProduct") + productId;
                prevLink = pathHistory[pathHistory.length - 2] === "/summary/calculate" ? "/summary/calculate" : "/products/list";
            } else if (location.pathname.startsWith("/receipt/")) {
                pageTitle = t("receiptNumber") + receiptNumber;
                prevLink = pathHistory[pathHistory.length - 2] === "/purchase/list" ? "/purchase/list" : "/";
            } else {
                pageTitle = t("title");
                prevLink = "/";
            }
    }
    return (
        <div className="main-container-body">
            <header className="main-container-header">
                <div>
                    <IconButton color="error" component={Link} to={prevLink}>
                        <ArrowBackIosIcon />
                    </IconButton>
                </div>
                <div>{pageTitle.toUpperCase()}</div>
                <div>
                    <SettingsDashboard/>
                </div>
            </header>
            <main className="main-container-main">
                <Outlet />
            </main>
            <footer className="main-container-footer">
                <div>
                    <OnlineOfflineIndicator online={isOnline} />
                </div>
                <div>{formattedDate}</div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <span>{t("cashRegister")}{status.case}</span>
                    <span>{t("store")}{status.storeNumber}</span>
                </div>
            </footer>
        </div>
    );
}

export default MainContainer;
