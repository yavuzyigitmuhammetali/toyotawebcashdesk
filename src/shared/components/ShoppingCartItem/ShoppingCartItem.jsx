import React, {useState} from 'react';
import "./shoppingCartItem.css"
import {IconButton} from "@mui/material";
import RemoveIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Remove';
import {createTheme, ThemeProvider} from "@mui/material/styles";


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


function ShoppingCartItem({ disabled=false, onDelete,onRemove,onAdd,campaign="",index = 1,discountedPrice = 0,dark = false ,price = 1, tax = 8, quantity = 1, barcode = 120340344, productName = "EKMEK" }) {
    const taxFreePrice = ((discountedPrice?discountedPrice:price)/(1+(tax/100))).toFixed(2);
    const finalPrice = (quantity * price).toFixed(2);
    const finalDiscountedPrice = discountedPrice?(discountedPrice*quantity).toFixed(2):0;
    const [isElementVisible, setElementVisibility] = useState(false);
    const [firstLoad,setFirstLoad] = useState(false);
    const toggleElementVisibility = () => {
        if (!firstLoad){
            setFirstLoad(true);
        }
        return setElementVisibility(!isElementVisible)
    }
    return (
        <div style={{backgroundColor:dark&&"#12161B", color:dark&&"white",borderColor:dark&&"white"}} className={disabled?"shopping-cart-item-container shopping-cart-item-disabled":"shopping-cart-item-container"}>
            <ThemeProvider theme={dark?darkTheme:lightTheme}>
                <div onClick={toggleElementVisibility} className="shopping-cart-item-content-container">
                    <div className="shopping-cart-item-content">
                        <span>#{barcode}</span>
                        <span>{taxFreePrice}$ + KDV %{tax}</span>
                        <span>{quantity} adet</span>
                    </div>
                    <div className="shopping-cart-item-content">
                        <span style={{fontSize: "1.5em", fontWeight: "700"}}>{index}.{productName}</span>
                        <div>{discountedPrice?campaign:""}</div>
                        <span style={{color: "red", fontWeight: "700"}}>
                            <span style={discountedPrice ? { textDecoration: "line-through", color: dark ? "white" : "black",fontSize:"0.8em" } : {}}>{finalPrice}$</span>
                            {discountedPrice ? <span> {finalDiscountedPrice}$</span>:null}
                            </span>
                    </div>
                </div>
                {firstLoad &&
                    <div
                        style={{animation: isElementVisible ? "jell-in 0.5s ease-in-out forwards" : "jell-out 0.5s ease-in-out forwards",backgroundColor:dark&&"rgba(0,0,0,0.9)"}}
                        className="shopping-cart-item-editor">
                        <IconButton onClick={onAdd} color="success" size="small" aria-label="delete">
                            <AddIcon/>
                        </IconButton>
                        <IconButton onClick={onDelete} color="warning" size="small" aria-label="delete">
                            <DeleteIcon/>
                        </IconButton>
                        <IconButton onClick={onRemove} color="error" size="small" aria-label="delete">
                            <RemoveIcon/>
                        </IconButton>
                    </div>
                }
            </ThemeProvider>

        </div>
    );
}

export default ShoppingCartItem;