import {useEffect, useMemo, useState} from 'react';
import translations from './lang.json';
import {filterDataByAlphabetGroups} from './dataProcessing';
import ProductCard from "../ProductCard/ProductCard";

export function useProductShowcase({
                                       data = [],
                                       onClick,
                                       dark = false,
                                       keyboardContext = null,
                                       ScreenKeyboardComponent = null,
                                       language = 'en'
                                   }) {
    const [inputValue, setInputValue] = useState('');
    const {handleElementFocus, value, onChangeValue, clearValues} = keyboardContext || {};
    const [map, setMap] = useState(1);
    const favourites = useMemo(() => data.filter((item) => item.isFavourite), [data]);
    const alphabeticalFilteredData = useMemo(() => filterDataByAlphabetGroups(data), [data]);
    const filteredByName = useMemo(
        () => data.filter((item) => item.name.toLowerCase().startsWith(value?.productSearch?.toLowerCase())),
        [data, value?.productSearch]
    );

    useEffect(() => {
        if (clearValues) clearValues();
    }, []);

    useEffect(() => {
        setInputValue(value?.productSearch ?? '');
    }, [value]);

    const t = translations[language] || translations.en;

    const columnCount = Math.floor(window.innerWidth / 110 - 1);
    const currentData = useMemo(() => {
        switch (map) {
            case 0:
                return filteredByName;
            case 2:
                return favourites;
            case 1:
                return data;
            default:
                return alphabeticalFilteredData[map - 3] || [];
        }
    }, [map, data, favourites, filteredByName, alphabeticalFilteredData]);

    const rowCount = Math.ceil(currentData.length / columnCount);

    const Cell = ({columnIndex, rowIndex, style}) => {
        const productIndex = rowIndex * columnCount + columnIndex;
        const product = currentData[productIndex];
        if (!product) {
            return <div style={style}/>;
        }

        return (
            <div style={style}>
                <ProductCard
                    discountText={product.campaign}
                    onClick={() => onClick(product)}
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

    return {
        dark,
        inputValue,
        handleElementFocus,
        onChangeValue,
        t,
        map,
        setMap,
        columnCount,
        rowCount,
        currentData,
        Cell,
        ScreenKeyboardComponent,
        language,
    };
}