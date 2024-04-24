import React, {useContext} from 'react';
import "./index.css"
import AlignHorizontalRightIcon from '@mui/icons-material/AlignHorizontalRight';
import AlignHorizontalCenterIcon from '@mui/icons-material/AlignHorizontalCenter';
import AlignHorizontalLeftIcon from '@mui/icons-material/AlignHorizontalLeft';
import ToggleButton from '@mui/material/ToggleButton';
import PrintIcon from '@mui/icons-material/Print';
import Receipt from "../../shared/components/Receipt/Receipt";
import {ToggleButtonGroup} from "@mui/material";
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import PaperIcon from '@mui/icons-material/Feed';
import AlertComponent from "../../shared/components/AlertComponent";
import {useTranslation} from "react-i18next";
import AppStatusContext from "../../shared/states/AppStatus/context";
import {useResponsiveReceipt} from "./useResponsiveReceipt";
import config from "../../config.json";


function ResponsiveReceipt() {
    const {lang, dark} = useContext(AppStatusContext)
    const {t} = useTranslation();

    const {
        receipt,
        alignment,
        alignment2,
        handlePrint,
        handleAlignment,
        handleAlignment2
    } = useResponsiveReceipt(t('printErrorMessage'));

    return (<div className={`responsive-receipt-container ${dark ? "dark-mode" : ""}`}>
        <AlertComponent/>
        <div className="responsive-receipt-controller">
            <ToggleButtonGroup
                value={alignment}
                exclusive
                onChange={handleAlignment}
                aria-label="text alignment"
            >
                <ToggleButton value="left" aria-label="left aligned">
                    <AlignHorizontalLeftIcon/>
                </ToggleButton>
                <ToggleButton value="center" aria-label="centered">
                    <AlignHorizontalCenterIcon/>
                </ToggleButton>
                <ToggleButton value="right" aria-label="right aligned">
                    <AlignHorizontalRightIcon/>
                </ToggleButton>
            </ToggleButtonGroup>
            <ToggleButtonGroup value={"egg"}>
                <ToggleButton onChange={handlePrint} aria-label="right aligned" value={"egg"}>
                    <PrintIcon/>
                </ToggleButton>
            </ToggleButtonGroup>
            <ToggleButtonGroup
                value={alignment2}
                exclusive
                onChange={handleAlignment2}
                aria-label="text alignment"
            >
                <ToggleButton value="left" aria-label="left aligned">
                    <ReceiptLongIcon/>
                </ToggleButton>
                <ToggleButton value="right" aria-label="centered">
                    <PaperIcon/>
                </ToggleButton>
            </ToggleButtonGroup>
        </div>
        <div style={{
            left: alignment === "right" ? "100%" : alignment === "center" ? "50%" : "0",
            transform: alignment === "right" ? "translate(-100%, 0)" : alignment === "center" ? "translate(-50%, 0)" : "translate(0, 0)"
        }}
             className={alignment2 === "left" ? "printable-content responsive-receipt-receipt" : "printable-content-full responsive-receipt-receipt"}>
            <Receipt storeName={config.storeName} language={lang} data={receipt}/>
        </div>
    </div>);
}

export default ResponsiveReceipt;
