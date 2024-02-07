import React, {useContext} from 'react';
import "./salesDashboardRightArea.css"
import {Button} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import NumericKeyboard from "../components/NumericKeyboard/NumericKeyboard";
import CartContext from "../context";
import {createTheme, ThemeProvider} from "@mui/material/styles";
const darkTheme = createTheme({
    typography: {
        button: {
            fontSize: "10px",
        },
    },
    palette: {
        mode: 'dark',
    },
});
const lightTheme = createTheme({
    typography: {
        button: {
            fontSize: "10px",
        },
    },
    palette: {
        mode: 'light',
    },
});


function SalesDashboardRightArea({dark = false}) {
    const {discounts, toggleDiscounts} = useContext(CartContext);

    return (
        <div style={{backgroundColor:dark?"#121418":"",borderColor:dark?"white":""}} className="sales-dashboard-right-area-container">
            <div className="sales-dashboard-right-area-control">
                <ThemeProvider theme={dark?darkTheme:lightTheme}>
                    <Button color="error" variant="contained">İşlem İptal Et</Button>
                    <Button color="info" variant="contained">İsimden Ara</Button>
                    <Button onClick={()=>toggleDiscounts("buy3pay2")} color="secondary" variant="contained">Kampanyalar</Button>
                    <Button color="success" variant="contained" endIcon={<SendIcon />}>Ödeme Ekranı</Button>

                </ThemeProvider>
            </div>
            <div className="sales-dashboard-right-area-keyboard">
                <NumericKeyboard dark={dark}/>
            </div>
        </div>
    );
}

export default SalesDashboardRightArea;