import React, {useCallback, useContext, useMemo} from 'react';
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

const SalesDashboardLeftArea = (() => {
    const {t} = useTranslation();
    const {lang, dark, performanceMode, colorOptions} = useContext(AppStatusContext);
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

    const columnCount = useMemo(() => Math.max(1, Math.floor(window.innerWidth / (columnWidth * 3))), [columnWidth]);
    const rowCount = useMemo(() => Math.ceil(products.length / columnCount), [products.length, columnCount]);

    const Cell = useCallback(({columnIndex, rowIndex, style}) => {
        const productIndex = rowIndex * columnCount + columnIndex;
        const product = products[productIndex];
        if (!product) {
            return <div style={style}/>;
        }

        return (
            <div style={{...style, margin: 2}}>
                <ProductCard
                    color={colorOptions.productCard.salesDashboardLeft ?? colorOptions.productCard.default}
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
        // eslint-disable-next-line
    }, [colorOptions, performanceMode, dark, products]);

    const renderContent = useCallback(() => {
        switch (map) {
            case "categories":
                return categories.map((category) => (
                    <ProductCard
                        key={category.id}
                        color={colorOptions.productCard.salesDashboardLeft ?? colorOptions.productCard.default}
                        performanceMode={performanceMode}
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
                return subCategories.map((subcategory) => (
                    <ProductCard
                        key={subcategory.id}
                        color={colorOptions.productCard.salesDashboardLeft ?? colorOptions.productCard.default}
                        performanceMode={performanceMode}
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
                            key={product.id}
                            color={colorOptions.productCard.salesDashboardLeft ?? colorOptions.productCard.default}
                            performanceMode={performanceMode}
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
        // eslint-disable-next-line
    }, performanceMode ? [map, colorOptions, performanceMode, dark] : [map, products, colorOptions, performanceMode, dark]);

    return (
        <div className={`left-container ${performanceMode ? "performance-mode" : ""}`}>
            <div className="left-one">
                <TextField
                    color={colorOptions.buttons.salesDashboardLeft ?? colorOptions.buttons.default}
                    id="barcodeArea"
                    label={t('barcodeEntry')}
                    onFocus={handleElementFocus}
                    value={value}
                    onChange={onChangeValue}
                    InputProps={{
                        startAdornment: (<InputAdornment position="start">#</InputAdornment>),
                        endAdornment: (
                            <IconButton aria-label="fingerprint">
                                <SearchIcon/>
                            </IconButton>
                        ),
                    }}
                />
                <ScreenKeyboard
                    color={colorOptions.screenKeyboard.salesDashboardLeft ?? colorOptions.screenKeyboard.default}
                    performanceMode={performanceMode}
                    dark={dark}
                    language={lang}
                />
            </div>
            <div className="left-two">
                <Button
                    color={colorOptions.buttons.salesDashboardLeft ?? colorOptions.buttons.default}
                    disableElevation={performanceMode}
                    onClick={() => {
                        setMap("categories");
                        updateSelectedMap(0, "category");
                        updateSelectedMap(0, "subcategory");
                    }}
                    size="small"
                    variant="contained"
                >
                    {t('categories')}
                </Button>
                <Button
                    color={colorOptions.buttons.salesDashboardLeft ?? colorOptions.buttons.default}
                    disableElevation={performanceMode}
                    onClick={() => {
                        setMap("subcategories");
                        updateSelectedMap(0, "subcategory");
                    }}
                    size="small"
                    variant={map === "subcategories" || map === "products" ? "contained" : "outlined"}
                >
                    {t('subCategories')}
                </Button>
                <Button
                    color={colorOptions.buttons.salesDashboardLeft ?? colorOptions.buttons.default}
                    disableElevation={performanceMode}
                    onClick={() => setMap("products")}
                    size="small"
                    variant={map === "products" ? "contained" : "outlined"}
                >
                    {t('products')}
                </Button>
            </div>
            <div className="left-three-scroll">
                <div className={`left-three ${performanceMode ? "performance-mode" : ""}`}>
                    {renderContent()}
                </div>
            </div>
        </div>
    );
});

SalesDashboardLeftArea.displayName = 'SalesDashboardLeftArea';

export default SalesDashboardLeftArea;