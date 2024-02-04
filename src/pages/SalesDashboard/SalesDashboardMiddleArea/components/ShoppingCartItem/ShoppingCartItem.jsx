import React, {useState} from 'react';
import "./shoppingCartItem.css"
import {IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import {createTheme, ThemeProvider} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});
const lightTheme = createTheme({
    palette: {
        mode: 'light',
    },
});


function ShoppingCartItem({ index = 1,discountedPrice = 0,dark = false ,price = 1, tax = 8, quantity = 1, barcode = 120340344, productName = "EKMEK" }) {
    const taxFreePrice = (price/(1+(tax/100))).toFixed(2);
    const finalPrice = quantity * price;
    const [isElementVisible, setElementVisibility] = useState(false);
    const [firstLoad,setFirstLoad] = useState(false);
    const toggleElementVisibility = () => {
        if (!firstLoad){
            setFirstLoad(true);
        }
        return setElementVisibility(!isElementVisible)
    }

    return (
        <div style={{backgroundColor:dark&&"#12161B", color:dark&&"white",borderColor:dark&&"white"}} className="shopping-cart-item-container">
            <ThemeProvider theme={dark?darkTheme:lightTheme}>
                <CssBaseline/>
                <div onClick={toggleElementVisibility} className="shopping-cart-item-content-container">
                    <div className="shopping-cart-item-content">
                        <span>#{barcode}</span>
                        <span>{taxFreePrice}₺ + KDV %{tax}</span>
                        <span>{quantity} adet</span>
                    </div>
                    <div className="shopping-cart-item-content">
                        <span style={{fontSize: "1.5em", fontWeight: "700"}}>{index}.{productName}</span>
                        <span>3 al 2 öde</span>
                        <span style={{color: "red", fontWeight: "700"}}>
                            <span style={discountedPrice ? { textDecoration: "line-through", color: dark ? "white" : "black",fontSize:"0.8em" } : {}}>{finalPrice}₺</span>
                            {discountedPrice ? <span> {discountedPrice}₺</span>:null}
                            </span>
                    </div>
                </div>
                {firstLoad &&
                    <div
                        style={{animation: isElementVisible ? "jell-in 0.5s ease-in-out forwards" : "jell-out 0.5s ease-in-out forwards",backgroundColor:dark&&"rgba(0,0,0,0.9)"}}
                        className="shopping-cart-item-editor">
                        <IconButton color="success" aria-label="delete">
                            <AddIcon/>
                        </IconButton>
                        <IconButton color="warning" aria-label="delete">
                            <RemoveIcon/>
                        </IconButton>
                        <IconButton color="error" aria-label="delete">
                            <DeleteIcon/>
                        </IconButton>
                    </div>
                }
            </ThemeProvider>

        </div>
    );
}

export default ShoppingCartItem;