import React, {useContext, useEffect, useState} from 'react';
import {createTheme, ThemeProvider} from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import {Button, IconButton, InputAdornment} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import "./salesDashboardLeftArea.css"
import ProductCard from "../../../shared/components/ProductCard/ProductCard";
import NumericKeyboardContext from "../../../shared/components/NumericKeyboard/context";
import CartContext from "../context";
import {filterProducts, filterProductsByBarcode, filterSubcategories} from "../functions/productProcessing";
import ScreenKeyboard from "../../../shared/components/ScreenKeyboard/ScreenKeyboard";
import KeyboardContext from "../../../shared/components/ScreenKeyboard/context";
import {useTranslation} from "react-i18next";
import AppStatusContext from "../../../shared/state/AppStatus/context";


function SalesDashboardLeftArea() {

    const {t} = useTranslation();

    const {
        categories, subCategories: _subCategories, products: _products, addToCart
    } = useContext(CartContext);

    const {lang,dark} = useContext(AppStatusContext)

    const [map, setMap] = useState("categories");
    const {data} = useContext(NumericKeyboardContext);
    const {
        handleElementFocus, value: keyboardValue, onChangeValue, clearValues, setChangedValue
    } = useContext(KeyboardContext);
    const [selectedMap, setSelectedMap] = useState({category: 0, subcategory: 0})
    const [subCategories, setSubCategories] = useState([])
    const [products, setProducts] = useState([])

    const updateSelectedMap = (value, field) => {
        setSelectedMap((prevSelectedMap) => ({
            ...prevSelectedMap, [field]: value,
        }));
    };
    const getProductsByBarcode = (barcode) => {
        const item = _products.filter(item => item.barcode.toString() === barcode)
        if (item.length === 1) {
            addToCart(item[0]);
        } else {
            return setProducts(filterProductsByBarcode(_products, barcode));
        }
    };

    useEffect(() => {
        setProducts(_products);
        return ()=>clearValues();
    }, [_products]);

    useEffect(() => {
        setSubCategories(_subCategories);
        return ()=>clearValues();
    }, [_subCategories]);

    useEffect(() => {
        if (selectedMap.category && !selectedMap.subcategory) {
            setSubCategories(filterSubcategories(_subCategories, selectedMap.category))
            setProducts(filterProducts(_products, selectedMap.category))
        } else if (selectedMap.category && selectedMap.subcategory) {
            setProducts(filterProducts(_products, selectedMap.category, selectedMap.subcategory))
        } else if (!selectedMap.category && selectedMap.subcategory) {
            setSubCategories(_subCategories)
            setProducts(filterProducts(_products, null, selectedMap.subcategory))
        } else {
            setSubCategories(_subCategories);
            setProducts(_products);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedMap]);


    const [value, setValue] = useState('');

    useEffect(() => {
        if (data) {
            setValue(data)
            getProductsByBarcode(data);
            setMap("products");
        } else {
            setValue('')
            setMap("categories");
        }

    }, [data]);

    useEffect(() => {
        const inputValue = keyboardValue.barcodeArea?.replace(/[^0-9]/g, '')??'';
        if (inputValue) {
            getProductsByBarcode(inputValue);
            setMap("products");
        } else {
            setMap("categories");
        }
        setValue(inputValue)
        setChangedValue(inputValue)
    }, [keyboardValue.barcodeArea]);

    return (<div style={{
        backgroundColor: dark ? "#111418" : "", borderColor: dark ? "white" : ""
    }} className="left-container">
        <ThemeProvider theme={createTheme({ palette: { mode: dark ? "dark" : "light" } })}>
            <div className="left-one">
                <TextField
                    id="barcodeArea"
                    label={t('barcodeEntry')}
                    onFocus={handleElementFocus}
                    value={value}
                    onChange={onChangeValue}
                    InputProps={{
                        startAdornment: (<InputAdornment position="start">
                            #
                        </InputAdornment>), endAdornment: (<IconButton aria-label="fingerprint">
                            <SearchIcon/>
                        </IconButton>),
                    }}
                />
                <ScreenKeyboard dark={dark} language={lang}/>
            </div>
            <div className="left-two">
                <Button onClick={() => {
                    setMap("categories");
                    updateSelectedMap(0, "category");
                    updateSelectedMap(0, "subcategory");
                }} size="small" variant="contained">{t('categories')}</Button>
                <Button onClick={() => {
                    setMap("subcategories");
                    updateSelectedMap(0, "subcategory");
                }} size="small"
                        variant={map === "subcategories" || map === "products" ? "contained" : "outlined"}>
                    {t('subCategories')}</Button>
                <Button onClick={() => setMap("products")} size="small"
                        variant={map === "products" ? "contained" : "outlined"}>{t('products')}</Button>
            </div>
            <div className="left-three-scroll">
                <div className="left-three">
                    {map === "categories" ? (categories.map((category, key) => <ProductCard key={key}
                                                                                            onClick={() => {
                                                                                                updateSelectedMap(category.id, "category");
                                                                                                setMap("subcategories")
                                                                                            }} dark={dark} category
                                                                                            name={category.name}
                                                                                            src={category.image}/>)) : map === "subcategories" ? (subCategories.map((subcategory, key) =>
                        <ProductCard key={key} onClick={() => {
                            updateSelectedMap(subcategory.id, "subcategory");
                            setMap("products")
                        }} dark={dark} category name={subcategory.name}
                                     src={subcategory.image}/>)) : map === "products" ? (products.map((product, key) =>
                        <ProductCard discountText={product.campaign} onClick={() => addToCart(product)}
                                     key={key} dark={dark} name={product.name} src={product.image}
                                     barcode={product.barcode} favorite={product.isFavourite}
                                     fraction={product.fraction}
                                     price={product.price} stock={product.stock}/>)) : (<div></div>)}
                </div>
            </div>
        </ThemeProvider>
    </div>);
}

export default SalesDashboardLeftArea;