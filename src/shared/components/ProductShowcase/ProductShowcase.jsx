import React, { useEffect, useMemo, useState } from "react";
import "./productShowcase.css";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import ProductCard from "../ProductCard/ProductCard";
import { filterDataByAlphabetGroups } from "./dataProcessing";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import translations from './lang.json';

const darkTheme = createTheme({
    palette: {
        mode: "dark",
    },
});

const lightTheme = createTheme({
    palette: {
        mode: "light",
    },
});

function ProductShowcase({
    data = [],
    onClick,
    dark = false,
    keyboardContext = null,
    ScreenKeyboardComponent = null,
    language = "en",
}) {
    const [inputValue, setInputValue] = useState("");
    const { handleElementFocus, value, onChangeValue, clearValues } = keyboardContext || {};
    const [map, setMap] = useState(1);
    const favourites = useMemo(() => data.filter((item) => item.isFavourite), [data]);
    const alphabeticalFilteredData = useMemo(() => filterDataByAlphabetGroups(data), [data]);
    const filteredByName = useMemo(
        () => data.filter((item) => item.name.toLowerCase().startsWith(value?.prodcutSearch?.toLowerCase())),
        [data, value?.prodcutSearch]
    );

    useEffect(() => {
        setInputValue(value?.prodcutSearch ?? "");
        if (inputValue) {
            setMap(0);
        } else {
            setMap(1);
        }
    }, [value, inputValue]);

    useEffect(() => {
        if (clearValues) clearValues();
    }, [clearValues]);

    const t = translations[language] || translations.en;

    return (
        <ThemeProvider theme={dark ? darkTheme : lightTheme}>
            <div className="product-showcase-container">
                <div
                    style={{
                        backgroundColor: dark ? "rgba(19, 25, 34,0.85)" : "",
                        borderColor: dark ? "white" : "",
                    }}
                    className="product-showcase-active-area"
                >
                    <div className="product-showcase-search-area">
                        <TextField
                            onFocus={handleElementFocus}
                            onChange={onChangeValue}
                            value={inputValue}
                            fullWidth
                            color="secondary"
                            label={t.searchLabel}
                            id="prodcutSearch"
                        />
                        {ScreenKeyboardComponent ? <ScreenKeyboardComponent dark={dark} /> : null}
                    </div>
                    <div className="product-showcase-filter-area">
                        <Button
                            onClick={() => setMap(1)}
                            color="secondary"
                            variant={map === 1 ? "contained" : "outlined"}
                        >
                            {t.all}
                        </Button>
                        <Button
                            onClick={() => setMap(2)}
                            color="secondary"
                            variant={map === 2 ? "contained" : "outlined"}
                        >
                            {t.favorites}
                        </Button>
                        <Button
                            onClick={() => setMap(3)}
                            color="secondary"
                            variant={map === 3 ? "contained" : "outlined"}
                        >
                            A - Ç
                        </Button>
                        <Button
                            onClick={() => setMap(4)}
                            color="secondary"
                            variant={map === 4 ? "contained" : "outlined"}
                        >
                            D - G
                        </Button>
                        <Button
                            onClick={() => setMap(5)}
                            color="secondary"
                            variant={map === 5 ? "contained" : "outlined"}
                        >
                            Ğ - L
                        </Button>
                        <Button
                            onClick={() => setMap(6)}
                            color="secondary"
                            variant={map === 6 ? "contained" : "outlined"}
                        >
                            J - N
                        </Button>
                        <Button
                            onClick={() => setMap(7)}
                            color="secondary"
                            variant={map === 7 ? "contained" : "outlined"}
                        >
                            O - S
                        </Button>
                        <Button
                            onClick={() => setMap(8)}
                            color="secondary"
                            variant={map === 8 ? "contained" : "outlined"}
                        >
                            Ş - Y
                        </Button>
                        <Button
                            onClick={() => setMap(9)}
                            color="secondary"
                            variant={map === 9 ? "contained" : "outlined"}
                        >
                            T - Z
                        </Button>
                        <Button
                            onClick={() => setMap(10)}
                            color="secondary"
                            variant={map === 10 ? "contained" : "outlined"}
                        >
                            W - X
                        </Button>

                        <Button
                            onClick={() => setMap(11)}
                            color="secondary"
                            variant={map === 11 ? "contained" : "outlined"}
                        >
                            {t.productsWithoutBarcode}
                        </Button>
                    </div>
                    <div className="product-showcase-products-scroll-area">
                        <div className="product-showcase-products-area">
                            {map === 0
                                ? filteredByName.map((product, key) => (
                                      <ProductCard
                                          discountText={product.campaign}
                                          onClick={() => onClick(product)}
                                          key={key}
                                          dark={dark}
                                          name={product.name}
                                          src={product.image}
                                          barcode={product.barcode}
                                          favorite={product.isFavourite}
                                          price={product.price}
                                          stock={product.stock}
                                      />
                                  ))
                                : map === 11
                                ? data
                                      .filter((product) => !product.barcode)
                                      .map((product, key) => (
                                          <ProductCard
                                              discountText={product.campaign}
                                              onClick={() => onClick(product)}
                                              key={key}
                                              dark={dark}
                                              name={product.name}
                                              src={product.image}
                                              barcode={product.barcode}
                                              favorite={product.isFavourite}
                                              price={product.price}
                                              stock={product.stock}
                                          />
                                      ))
                                : map === 1
                                ? data.map((product, key) => (
                                      <ProductCard
                                          discountText={product.campaign}
                                          onClick={() => onClick(product)}
                                          key={key}
                                          dark={dark}
                                          name={product.name}
                                          src={product.image}
                                          barcode={product.barcode}
                                          fraction={product.fraction}
                                          favorite={product.isFavourite}
                                          price={product.price}
                                          stock={product.stock}
                                      />
                                  ))
                                : map === 2
                                ? favourites.map((product, key) => (
                                      <ProductCard
                                          discountText={product.campaign}
                                          onClick={() => onClick(product)}
                                          key={key}
                                          dark={dark}
                                          name={product.name}
                                          src={product.image}
                                          barcode={product.barcode}
                                          favorite={product.isFavourite}
                                          price={product.price}
                                          stock={product.stock}
                                      />
                                  ))
                                : alphabeticalFilteredData[map - 3].map((product, key) => (
                                      <ProductCard
                                          discountText={product.campaign}
                                          onClick={() => onClick(product)}
                                          key={key}
                                          dark={dark}
                                          name={product.name}
                                          src={product.image}
                                          barcode={product.barcode}
                                          favorite={product.isFavourite}
                                          price={product.price}
                                          stock={product.stock}
                                      />
                                  ))}
                        </div>
                    </div>
                </div>
            </div>
        </ThemeProvider>
    );
}

export default ProductShowcase;

