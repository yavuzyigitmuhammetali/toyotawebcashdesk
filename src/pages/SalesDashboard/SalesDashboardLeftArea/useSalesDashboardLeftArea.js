import {useCallback, useContext, useEffect, useMemo, useState} from 'react';
import {filterProducts, filterProductsByBarcode, filterSubcategories} from "../functions/productProcessing";
import CartContext from "../context";
import NumericKeyboardContext from "../../../shared/components/NumericKeyboard/context";
import KeyboardContext from "../../../shared/components/ScreenKeyboard/context";

export const useSalesDashboardLeftArea = () => {
    const {
        categories, subCategories: _subCategories, products: _products, addToCart
    } = useContext(CartContext);
    const {data} = useContext(NumericKeyboardContext);
    const {
        handleElementFocus, value: keyboardValue, onChangeValue, setChangedValue, clearValues
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
        if (barcode > 0 && products.length === 1 && (data === products[0].barcode || barcode === products[0].barcode.toString())) {
            addToCart(products[0]);
            clearValues();
            setValue('');
            setMap("categories");
        } else {
            return setProducts(products);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [_products]);

    const filteredSubCategories = useMemo(() => {
        if (!_subCategories) return [];
        if (selectedMap.category) {
            return filterSubcategories(_subCategories, selectedMap.category);
        }
        return _subCategories;
    }, [_subCategories, selectedMap.category]);

    const filteredProducts = useMemo(() => {
        if (!_products) return [];
        return filterProducts(_products, selectedMap.category, selectedMap.subcategory);
    }, [_products, selectedMap.category, selectedMap.subcategory]);

    useEffect(() => {
        setSubCategories(filteredSubCategories);
        setProducts(filteredProducts);
    }, [filteredSubCategories, filteredProducts]);

    useEffect(() => {
        if (data) {
            setValue(data.toString());
        }
    }, [data]);

    useEffect(() => {
        const inputValue = keyboardValue.barcodeArea?.replace(/[^0-9]/g, '') ?? '';
        setValue(inputValue);
        setChangedValue(inputValue);
    }, [keyboardValue.barcodeArea, setChangedValue]);

    useEffect(() => {
        if (!keyboardValue.barcodeArea) {
            setMap("categories");
            setProducts(_products);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [keyboardValue.barcodeArea, data]);

    useEffect(() => {
        if (value.length) {
            setMap("products");
            getProductsByBarcode(value);
        }
    }, [value, getProductsByBarcode]);

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
        columnWidth: 112,
        rowHeight: 120,
        maxProductCount: 40
    };
};

