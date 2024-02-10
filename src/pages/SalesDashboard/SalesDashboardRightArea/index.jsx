import React, {useContext, useState} from 'react';
import "./salesDashboardRightArea.css"
import {Button, IconButton} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import NumericKeyboard from "../components/NumericKeyboard/NumericKeyboard";
import CartContext from "../context";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import FormDialog from "../../../shared/components/FormDialog";
import {KeyboardProvider} from "../../../shared/components/ScreenKeyboard/context";
import {checkIdentityNumber} from "../functions/studentValidate";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ProductShowcase from "../../../shared/components/ProductShowcase/ProductShowcase";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

const darkTheme = createTheme({
    typography: {
        button: {
            fontSize: "10px",
        },
    }, palette: {
        mode: 'dark',
    },
});
const lightTheme = createTheme({
    typography: {
        button: {
            fontSize: "10px",
        },
    }, palette: {
        mode: 'light',
    },
});


function SalesDashboardRightArea({dark = false}) {
    const {discounts, toggleDiscounts, products, addToCart,cancelTransaction,cart} = useContext(CartContext);
    const [campaignsWindow, setCampaignsWindow] = useState({first: false, other: true});
    const [productShowcaseWindow, setProductShowcaseWindow] = useState(false);

    const handleStudentTaxFree = (val) => {
        if (checkIdentityNumber(val)) {
            toggleDiscounts("studentTaxFree")
            return true;
        } else {
            return false
        }
    }

    return (<ThemeProvider theme={dark ? darkTheme : lightTheme}>
            <div style={{backgroundColor: dark ? "#121418" : "", borderColor: dark ? "white" : ""}}
                 className="sales-dashboard-right-area-container">
                <div className="sales-dashboard-right-area-control">

                    <Button onClick={cancelTransaction} disabled={!cart.length} color="error" variant="contained">İşlem İptal Et</Button>
                    <Button onClick={()=>setProductShowcaseWindow(!productShowcaseWindow)} color="info" variant="contained">İsimden Ara</Button>
                    <Button onClick={() => setCampaignsWindow({first: true, other: true})} color="secondary"
                            variant="contained">Kampanyalar</Button>
                    <Button color="success" variant="contained" endIcon={<SendIcon/>}>Ödeme Ekranı</Button>


                </div>
                <div className="sales-dashboard-right-area-keyboard">
                    <NumericKeyboard dark={dark}/>
                </div>
                {campaignsWindow.first && <div style={{
                    borderColor: dark ? "white" : "",
                    animation: campaignsWindow.other ? "jell-in-top 0.5s ease-in-out forwards" : "jell-out-top 0.5s ease-in-out forwards",
                    backgroundColor: dark ? "#131922" : ""
                }} className="sales-dashboard-right-area-campaigns">

                    <IconButton onClick={() => setCampaignsWindow({first: true, other: false})}>
                        <ArrowUpwardIcon/>
                    </IconButton>
                    <Button onClick={() => toggleDiscounts("buy3pay2")} style={{fontSize: 14}}
                            color={discounts.buy3pay2 ? "success" : "error"} variant="contained">3 AL 2 ÖDE</Button>
                    <KeyboardProvider>
                        <FormDialog
                            dialog="Öğrenciler seçili ürünlerde 1 tane almak ve bir kez yararlanma şartıyla vergisiz ürün!"
                            dark={dark}
                            errorText={"Kimlik numarası hatalı veya bir öğrenciye ait değil!"}
                            label={"Öğrenci Kimlik Numarası"}
                            disabled={discounts.studentTaxFree}
                            onOff={discounts.studentTaxFree}
                            buttonName="ÖĞERNCİYE VERGİSİZ"
                            func={handleStudentTaxFree}/>
                    </KeyboardProvider>
                    <Button onClick={() => toggleDiscounts("percentageDiscounts")} style={{fontSize: 14}}
                            color={discounts.percentageDiscounts ? "success" : "error"} variant="contained">YÜZDELİK
                        İNDİRİMLER</Button>
                </div>}
                {productShowcaseWindow?
                    <>
                    <div style={{position:"fixed",left:0,top:0,zIndex:12}}>
                        <IconButton onClick={()=>setProductShowcaseWindow(false)}  color="error">
                            <CloseOutlinedIcon/>
                        </IconButton>
                    </div>
                    <KeyboardProvider>
                        <ProductShowcase dark={dark} addToCart={addToCart} data={products}/>
                    </KeyboardProvider>
                </>
                    :
                    <></>}

            </div>
        </ThemeProvider>);
}

export default SalesDashboardRightArea;