import React, {useCallback, useMemo, useState} from 'react';
import styles from './ShoppingCartItem.module.css';
import {createTheme, IconButton, TextField, ThemeProvider} from '@mui/material';
import RemoveIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Remove';
import PropTypes from 'prop-types';

const ShoppingCartItem = React.memo(({
                                         disabled = false,
                                         onDelete = () => {
                                         },
                                         onRemove = () => {
                                         },
                                         onAdd = () => {
                                         },
                                         campaign = '',
                                         index = 1,
                                         discountedPrice = 0,
                                         dark = false,
                                         price = 1,
                                         tax = 8,
                                         quantity = 1,
                                         barcode = 120340344,
                                         productName = 'EKMEK',
                                         fraction = false,
                                         onChangeDecimal = () => {
                                         },
                                         onFocus = () => {
                                         },
                                         decimalValue = '',
                                         id = '',
                                         lang = 'tr',
                                         performanceMode = false,
                                         color = 'orange',
                                     }) => {
    const [isEditorVisible, setEditorVisibility] = useState(false);
    const [firstLoad, setFirstLoad] = useState(false);

    const toggleEditorVisibility = useCallback(() => {
        if (!firstLoad) {
            setFirstLoad(true);
        }
        setEditorVisibility(!isEditorVisible);
    }, [firstLoad, isEditorVisible]);

    const taxFreePrice = useMemo(() => {
        return ((discountedPrice || price) / (1 + tax / 100)).toFixed(2);
    }, [discountedPrice, price, tax]);

    const finalPrice = useMemo(() => {
        return (quantity * price).toFixed(2);
    }, [quantity, price]);

    const finalDiscountedPrice = useMemo(() => {
        return discountedPrice ? (discountedPrice * quantity).toFixed(2) : '0.00';
    }, [discountedPrice, quantity]);

    const backgroundColor = dark ? '#12161B' : color;
    const textColor = dark ? 'white' : 'black';
    const borderColor = dark ? 'white' : 'black';

    return (
        <article
            style={{backgroundColor, color: textColor, borderColor}}
            className={`${styles.shoppingCartItemContainer} ${disabled ? styles.disabled : ''} ${
                performanceMode ? styles.performanceMode : ''
            }`}
        >
            <ThemeProvider theme={createTheme({palette: {mode: dark ? 'dark' : 'light'}})}>
                <div onClick={toggleEditorVisibility} className={styles.contentContainer}>
                    <div className={styles.content}>
                        <span>#{barcode}</span>
                        <span>
                            {taxFreePrice}$ + KDV %{tax}
                        </span>
                        <span>
                            {quantity} {fraction ? (lang === 'tr' ? 'Kilo' : 'Kilo') : lang === 'tr' ? 'Adet' : 'Piece'}
                        </span>
                    </div>
                    <div className={styles.content}>
                        <span className={styles.productName}>
                            {index}.{productName}
                        </span>
                        <div>{discountedPrice ? campaign : ''}</div>
                        <span className={styles.price}>
                            <span className={`${styles.originalPrice} ${discountedPrice ? styles.discounted : ''}`}>
                                {finalPrice}$
                            </span>
                            {discountedPrice > 0 &&
                                <span className={styles.discountedPrice}> {finalDiscountedPrice}$</span>}
                        </span>
                    </div>
                </div>
                {firstLoad && (
                    <div
                        className={`${styles.editor} ${isEditorVisible && !performanceMode ? styles.jellIn : styles.jellOut} ${
                            dark ? styles.darkBg : ''
                        }`}
                        style={performanceMode ? {left: isEditorVisible ? '0' : '-50%'} : {}}
                    >
                        {fraction ? (
                            <TextField
                                id={id.toString()}
                                variant="standard"
                                type="number"
                                onFocus={onFocus}
                                value={decimalValue}
                                onChange={onChangeDecimal}
                            />
                        ) : (
                            <>
                                <IconButton onClick={onAdd} color="success" size="small" aria-label="add">
                                    <AddIcon/>
                                </IconButton>
                                <IconButton onClick={onDelete} color="warning" size="small" aria-label="delete">
                                    <DeleteIcon/>
                                </IconButton>
                            </>
                        )}
                        <IconButton onClick={onRemove} color="error" size="small" aria-label="remove">
                            <RemoveIcon/>
                        </IconButton>
                    </div>
                )}
            </ThemeProvider>
        </article>
    );
});

ShoppingCartItem.propTypes = {
    disabled: PropTypes.bool,
    onDelete: PropTypes.func,
    onRemove: PropTypes.func,
    onAdd: PropTypes.func,
    campaign: PropTypes.string,
    index: PropTypes.number,
    discountedPrice: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    dark: PropTypes.bool,
    price: PropTypes.number,
    tax: PropTypes.number,
    quantity: PropTypes.number,
    barcode: PropTypes.number,
    productName: PropTypes.string,
    fraction: PropTypes.bool,
    onChangeDecimal: PropTypes.func,
    onFocus: PropTypes.func,
    decimalValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    lang: PropTypes.string,
    performanceMode: PropTypes.bool,
    color: PropTypes.string,
};

export default ShoppingCartItem;