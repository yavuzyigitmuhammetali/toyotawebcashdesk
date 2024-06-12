import React, {useContext} from 'react';
import TextField from "@mui/material/TextField";
import {Button, IconButton, InputAdornment} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import ProductCard from "../../../shared/components/ProductCard/ProductCard";
import ScreenKeyboard from "../../../shared/components/ScreenKeyboard/ScreenKeyboard";
import {useTranslation} from "react-i18next";
import AppStatusContext from "../../../shared/states/AppStatus/context";
import {FixedSizeGrid as Grid} from 'react-window';
import {useSalesDashboardLeftArea} from './useSalesDashboardLeftArea';
import "./index.css";

function SalesDashboardLeftArea({performanceMode = false}) {
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
    } = useSalesDashboardLeftArea(performanceMode);

    const columnCount = Math.max(1, Math.floor(window.innerWidth / (columnWidth * 3)));
    const rowCount = Math.ceil(products.length / Math.max(1, Math.floor(window.innerWidth / (columnWidth * 3))));

    const Cell = ({columnIndex, rowIndex, style}) => {
        const productIndex = rowIndex * columnCount + columnIndex;
        const product = products[productIndex];
        if (!product) {
            return <div style={style}/>;
        }

        return (
            <div style={{...style, margin: 2}}>
                <ProductCard
                    performanceMode={performanceMode}
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
                        performanceMode={performanceMode}
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
                        performanceMode={performanceMode}
                        key={key}
                        category
                        onClick={() => {
                            updateSelectedMap(subcategory.id, "subcategory");
                            setMap("products");
                        }}
                        dark={dark}
                        name={subcategory.name}
                        src={subcategory.image}
                    />
                ));
            case "products":
                if (products.length > maxProductCount) {
                    return (
                        <Grid
                            columnCount={columnCount}
                            columnWidth={columnWidth}
                            height={rowHeight * 5}
                            rowCount={rowCount}
                            rowHeight={rowHeight}
                            width={(columnWidth * columnCount) + 5}
                        >
                            {Cell}
                        </Grid>
                    );
                } else {
                    return products.map((product) => (
                        <ProductCard
                            performanceMode={performanceMode}
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
        <div className={`left-container ${dark ? "dark-theme" : ""} ${performanceMode ? "performance-mode" : ""}`}>
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
                <ScreenKeyboard performanceMode={performanceMode} dark={dark} language={lang}/>
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
                <div className={`left-three ${performanceMode ? "performance-mode" : ""}`}>
                    {renderContent()}
                </div>
            </div>
        </div>
    );
}

export default SalesDashboardLeftArea;
