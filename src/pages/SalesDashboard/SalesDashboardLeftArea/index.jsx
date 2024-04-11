import React, {useContext} from 'react';
import {createTheme, ThemeProvider} from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import {Button, IconButton, InputAdornment} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import ProductCard from "../../../shared/components/ProductCard/ProductCard";
import ScreenKeyboard from "../../../shared/components/ScreenKeyboard/ScreenKeyboard";
import {useTranslation} from "react-i18next";
import AppStatusContext from "../../../shared/state/AppStatus/context";
import {FixedSizeGrid as Grid} from 'react-window';
import {useSalesDashboard} from './useSalesDashboard';
import "./salesDashboardLeftArea.css";

function SalesDashboardLeftArea() {
    const {t} = useTranslation();
    const {lang, dark} = useContext(AppStatusContext);
    const {
        categories,
        subCategories,
        products,
        map,
        setMap,
        updateSelectedMap,
        addToCart,
        handleElementFocus,
        value,
        onChangeValue,
        columnWidth,
        rowHeight,
        maxProductCount
    } = useSalesDashboard();

    const columnCount = Math.max(1, Math.floor(window.innerWidth / (columnWidth*3)));
    const rowCount = Math.ceil(products.length / Math.max(1, Math.floor(window.innerWidth / (columnWidth*3))));

    const Cell = ({columnIndex, rowIndex, style}) => {
        const productIndex = rowIndex * columnCount + columnIndex;
        const product = products[productIndex];
        if (!product) {
            return <div style={style}/>;
        }

        return (
            <div style={{...style, margin: 2}}>
                <ProductCard
                    discountText={product.campaign}
                    onClick={() => addToCart(product)}
                    dark={dark}
                    name={product.name}
                    src={product.image}
                    barcode={product.barcode}
                    favorite={product.isFavourite}
                    price={product.price}
                    stock={product.stock}
                    fraction={product.fraction}
                />
            </div>
        );
    };

    const renderContent = () => {
        switch (map) {
            case "categories":
                return categories.map((category, key) => (
                    <ProductCard
                        key={key}
                        category
                        onClick={() => {
                            updateSelectedMap(category.id, "category");
                            setMap("subcategories");
                        }}
                        dark={dark}
                        src={category.image}
                        name={category.name}
                    />
                ));
            case "subcategories":
                return subCategories.map((subcategory, key) => (
                    <ProductCard
                        key={key}
                        category
                        onClick={() => {
                            updateSelectedMap(subcategory.id, "subcategory");
                            setMap("products");
                        }}
                        dark={dark}
                        name={subcategory.name}
                    />
                ));
            case "products":
                if (products.length > maxProductCount) {
                    return (
                        <Grid
                            columnCount={columnCount}
                            columnWidth={columnWidth}
                            height={rowHeight*4}
                            rowCount={rowCount}
                            rowHeight={rowHeight}
                            width={(columnWidth*columnCount)+5}
                        >
                            {Cell}
                        </Grid>
                    );
                } else {
                    return products.map((product, key) => (
                        <ProductCard
                            key={product.id}
                            onClick={() => addToCart(product)}
                            dark={dark}
                            name={product.name}
                            discountText={product.campaign}
                            src={product.image}
                            barcode={product.barcode}
                            favorite={product.isFavourite}
                            price={product.price}
                            stock={product.stock}
                            fraction={product.fraction}
                        />
                    ));
                }
            default:
                return null;
        }
    };

    return (
        <div className={`left-container ${dark ? "dark-theme" : ""}`}>
            <ThemeProvider theme={createTheme({palette: {mode: dark ? "dark" : "light"}})}>
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
                        {renderContent()}
                    </div>
                </div>
            </ThemeProvider>
        </div>
    );
}

export default SalesDashboardLeftArea;
