import React, {useCallback, useEffect, useState} from 'react';
import "./responsiveReceipt.css"
import AlignHorizontalRightIcon from '@mui/icons-material/AlignHorizontalRight';
import AlignHorizontalCenterIcon from '@mui/icons-material/AlignHorizontalCenter';
import AlignHorizontalLeftIcon from '@mui/icons-material/AlignHorizontalLeft';
import ToggleButton from '@mui/material/ToggleButton';
import PrintIcon from '@mui/icons-material/Print';
import Receipt from "../../shared/components/Receipt/Receipt";
import {ToggleButtonGroup} from "@mui/material";
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import PaperIcon from '@mui/icons-material/Feed';
import {useParams} from "react-router-dom";
import {getReceipt} from "./api";


function ResponsiveReceipt({dark = false}) {
    const [receipt,setReceipt] = useState({})
    const [alignment, setAlignment] = useState('left');
    const [alignment2, setAlignment2] = useState('left');
    const { receiptNumber } = useParams();


    useEffect(() => {
        getReceipt(receiptNumber).then(value => setReceipt(value.data)).catch(reason => console.log(reason))
    }, [receiptNumber]);
    const handlePrint = useCallback(() => {
        if (receipt.active){
            window.print();
        }else{
            alert('İade edilmiş fiş ve faturalar tekrar talep edilemez!');
        }
    }, [receipt.active]);


    const handleAlignment = (event, newAlignment) => {
        if (newAlignment !== null) {
            setAlignment(newAlignment);
        }
    };
    const handleAlignment2 = (event, newAlignment) => {
        if (newAlignment !== null) {
            setAlignment2(newAlignment);
        }
    };
    return (
        <div style={{backgroundColor:dark?"#111418":"transparent"}} className="responsive-receipt-container">
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
            <div style={{left:alignment==="right"?"100%":alignment==="center"?"50%":"0",
                transform:alignment==="right"?"translate(-100%, 0)":alignment==="center"?"translate(-50%, 0)":"translate(0, 0)"}}
                 className={alignment2==="left"?"printable-content responsive-receipt-receipt":"printable-content-full responsive-receipt-receipt"}>
                <Receipt data={receipt}/>
            </div>
        </div>
    );
}

export default ResponsiveReceipt;