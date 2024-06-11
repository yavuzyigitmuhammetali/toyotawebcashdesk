import React, {useState} from 'react';
import "./shoppingCartItem.css";
import {IconButton} from "@mui/material";
import RemoveIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Remove';
import {createTheme, ThemeProvider} from "@mui/material/styles";
import TextField from "@mui/material/TextField";

const ShoppingCartItem = React.memo(({
                                         disabled = false,
                                         onDelete,
                                         onRemove,
                                         onAdd,
                                         campaign = "",
                                         index = 1,
                                         discountedPrice = 0,
                                         dark = false,
                                         price = 1,
                                         tax = 8,
                                         quantity = 1,
                                         barcode = 120340344,
                                         productName = "EKMEK",
                                         fraction = false,
                                         onChangeDecimal,
                                         onFocus,
                                         decimalValue,
                                         id,
                                         lang = "tr",
                                         performanceMode = false
                                     }) => {
    const taxFreePrice = ((discountedPrice ? discountedPrice : price) / (1 + (tax / 100))).toFixed(2);
    const finalPrice = (quantity * price).toFixed(2);
    const finalDiscountedPrice = discountedPrice ? (discountedPrice * quantity).toFixed(2) : 0;
    const [isElementVisible, setElementVisibility] = useState(false);
    const [firstLoad, setFirstLoad] = useState(false);
    const toggleElementVisibility = () => {
        if (!firstLoad) {
            setFirstLoad(true);
        }
        return setElementVisibility(!isElementVisible)
    }
    return (
        <div
            style={{backgroundColor: dark && "#12161B", color: dark && "white", borderColor: dark && "white"}}
            className={`${disabled ? "shopping-cart-item-container shopping-cart-item-disabled" : "shopping-cart-item-container"} ${performanceMode ? "performance-mode" : ""}`}
        >
            <ThemeProvider theme={createTheme({palette: {mode: dark ? "dark" : "light"}})}>
                <div onClick={toggleElementVisibility} className="shopping-cart-item-content-container">
                    <div className="shopping-cart-item-content">
                        <span>#{barcode}</span>
                        <span>{taxFreePrice}$ + KDV %{tax}</span>
                        <span>{quantity} {fraction ? (lang === "tr" ? "Kilo" : "Kilo") : (lang === "tr" ? "Adet" : "Piece")}</span>
                    </div>
                    <div className="shopping-cart-item-content">
                        <span className="product-name">{index}.{productName}</span>
                        <div>{discountedPrice ? campaign : ""}</div>
                        <span className="price">
                            <span className={`original-price ${discountedPrice ? 'discounted' : ''}`}>
                                {finalPrice}$
                            </span>
                            {discountedPrice ?
                                <span className="discounted-price"> {finalDiscountedPrice}$</span> : null}
                        </span>
                    </div>
                </div>
                {firstLoad && (
                    <div
                        className={`shopping-cart-item-editor ${isElementVisible && !performanceMode ? 'jell-in' : 'jell-out'} ${dark ? 'dark-bg' : ''}`}
                        style={performanceMode ? {left: isElementVisible ? '0' : '-50%'} : {}}
                    >
                        {fraction ? (
                            <TextField
                                id={id}
                                variant="standard"
                                type="number"
                                onFocus={onFocus}
                                value={decimalValue}
                                onChange={onChangeDecimal}
                            />
                        ) : (
                            <>
                                <IconButton onClick={onAdd} color="success" size="small" aria-label="delete">
                                    <AddIcon/>
                                </IconButton>
                                <IconButton onClick={onDelete} color="warning" size="small" aria-label="delete">
                                    <DeleteIcon/>
                                </IconButton>
                            </>
                        )}

                        <IconButton onClick={onRemove} color="error" size="small" aria-label="delete">
                            <RemoveIcon/>
                        </IconButton>
                    </div>
                )}
            </ThemeProvider>
        </div>
    );
});

export default ShoppingCartItem;
