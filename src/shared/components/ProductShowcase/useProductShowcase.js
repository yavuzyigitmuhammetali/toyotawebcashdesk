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
                                       language = 'en',
                                       performanceMode = false,
                                       cardColor = "#097ff5"
                                   }) {
    const [inputValue, setInputValue] = useState('');
    const {handleElementFocus, value, onChangeValue} = keyboardContext || {};
    const [map, setMap] = useState(1);
    const withoutBarcode = useMemo(() => data.filter((item) => !item.barcode), [data]);
    const favourites = useMemo(() => data.filter((item) => item.isFavourite), [data]);
    const alphabeticalFilteredData = useMemo(() => filterDataByAlphabetGroups(data), [data]);
    const filteredByName = useMemo(
        () => data.filter((item) => item.name.toLowerCase().startsWith(value?.productSearch?.toLowerCase())),
        [data, value?.productSearch]
    );

    useEffect(() => {
        setInputValue(value?.productSearch ?? '');
    }, [value]);

    const t = translations[language] || translations.en;

    const currentData = useMemo(() => {
        switch (map) {
            case 0:
                return filteredByName;
            case 2:
                return favourites;
            case 1:
                return data;
            case 11:
                return withoutBarcode;
            default:
                return alphabeticalFilteredData[map - 3] || [];
        }
    }, [map, data, favourites, filteredByName, alphabeticalFilteredData, withoutBarcode]);

    const columnCount = performanceMode
        ? 6
        : Math.floor((window.innerWidth / 110) - 1);
    const rowCount = Math.ceil(currentData.length / columnCount);

    const Cell = ({columnIndex, rowIndex, style}) => {
        const productIndex = rowIndex * columnCount + columnIndex;
        const product = currentData[productIndex];
        if (!product) {
            return <div style={style}/>;
        }

        return (
            <div style={{...style, margin: 2}}>
                <ProductCard
                    color={cardColor}
                    performanceMode={performanceMode}
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
        Cell,
        ScreenKeyboardComponent,
        language,
        performanceMode,
    };
}
