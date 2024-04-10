import {useCallback, useContext, useEffect, useMemo, useState} from 'react';
import {filterProducts, filterProductsByBarcode, filterSubcategories} from "../functions/productProcessing";
import CartContext from "../context";
import NumericKeyboardContext from "../../../shared/components/NumericKeyboard/context";
import KeyboardContext from "../../../shared/components/ScreenKeyboard/context";

export const useSalesDashboard = () => {
    const {
        categories, subCategories: _subCategories, products: _products, addToCart
    } = useContext(CartContext);
    const {data} = useContext(NumericKeyboardContext);
    const {
        handleElementFocus, value: keyboardValue, onChangeValue, clearValues, setChangedValue
    } = useContext(KeyboardContext);

    const [map, setMap] = useState("categories");
    const [selectedMap, setSelectedMap] = useState({category: 0, subcategory: 0});
    const [subCategories, setSubCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [value, setValue] = useState('');

    const updateSelectedMap = useCallback((value, field) => {
        setSelectedMap((prevSelectedMap) => ({
            ...prevSelectedMap, [field]: value,
        }));
    }, []);

    const getProductsByBarcode = useCallback((barcode) => {
        const products = filterProductsByBarcode(_products, barcode);
        if (products.length === 1 && (data === products[0].barcode || barcode === products[0].barcode.toString())) {
            addToCart(products[0]);
        } else {
            return setProducts(products);
        }
    }, []);

    const filteredSubCategories = useMemo(() => {
        if (selectedMap.category) {
            return filterSubcategories(_subCategories, selectedMap.category);
        }
        return _subCategories;
    }, [_subCategories, selectedMap.category]);

    const filteredProducts = useMemo(() => {
        return filterProducts(_products, selectedMap.category, selectedMap.subcategory);
    }, [_products, selectedMap.category, selectedMap.subcategory]);

    useEffect(() => {
        setSubCategories(filteredSubCategories);
        setProducts(filteredProducts);
        return () => clearValues();
    }, [filteredSubCategories, filteredProducts, clearValues]);

    useEffect(() => {
        if (data) {
            setValue(data);
            getProductsByBarcode(data);
            setMap("products");
        } else {
            setValue('');
            setMap("categories");
        }
    }, [data, getProductsByBarcode]);

    useEffect(() => {
        const inputValue = keyboardValue.barcodeArea?.replace(/[^0-9]/g, '') ?? '';
        if (inputValue) {
            getProductsByBarcode(inputValue);
            setMap("products");
        } else {
            setMap("categories");
        }
        setValue(inputValue);
        setChangedValue(inputValue);
    }, [keyboardValue.barcodeArea, getProductsByBarcode, setChangedValue]);

    useEffect(() => {
        if (!products.length) {
            setMap("categories");
        }
    }, [products]);

    return {
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
        columnWidth: 113,
        rowHeight: 127,
        columnCount: Math.floor(window.innerWidth / 113 - 8),
        rowCount: Math.ceil(products.length / Math.floor(window.innerWidth / 113 - 8)),
    };
};