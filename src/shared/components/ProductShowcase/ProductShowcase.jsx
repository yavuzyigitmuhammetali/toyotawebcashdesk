import React from 'react';
import PropTypes from 'prop-types';
import {useProductShowcase} from './useProductShowcase';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import {Button} from '@mui/material';
import {FixedSizeGrid as Grid} from 'react-window';
import './productShowcase.css';

function ProductShowcase({
                             dark = false,
                             data = [],
                             onClick,
                             keyboardContext = null,
                             ScreenKeyboardComponent = null,
                             language = 'en',
                             performanceMode = false,
                             keyboardColor = null,
                             buttonColor = "secondary",
                             cardColor = "#097ff5"
                         }) {
    const {
        inputValue,
        handleElementFocus,
        onChangeValue,
        t,
        map,
        setMap,
        columnCount,
        rowCount,
        Cell,
    } = useProductShowcase({
        data,
        onClick,
        dark,
        keyboardContext,
        ScreenKeyboardComponent,
        language,
        performanceMode,
        cardColor
    });

    return (
        <ThemeProvider theme={createTheme({palette: {mode: dark ? 'dark' : 'light'}, typography: {fontSize: 10}})}>
            <div className="product-showcase-container">
                <div
                    className={`product-showcase-active-area ${dark ? 'dark' : ''} ${performanceMode ? 'performance-mode' : ''}`}>
                    <div className="product-showcase-search-area">
                        <TextField
                            onFocus={handleElementFocus}
                            onChange={onChangeValue}
                            value={inputValue}
                            onClick={() => setMap(0)}
                            fullWidth
                            color={buttonColor}
                            label={t.searchLabel}
                            id="productSearch"
                        />
                        {ScreenKeyboardComponent && (
                            <ScreenKeyboardComponent
                                color={keyboardColor ?? buttonColor}
                                performanceMode={performanceMode}
                                fullWidth
                                language={language}
                                dark={dark}
                            />
                        )}
                    </div>
                    <FilterButtons map={map} setMap={setMap} t={t} performanceMode={performanceMode}
                                   buttonColor={buttonColor}/>
                    <div className="product-showcase-products-scroll-area">
                        <Grid
                            columnCount={columnCount}
                            columnWidth={performanceMode ? 140 : 110}
                            height={window.innerHeight - 180}
                            rowCount={rowCount}
                            rowHeight={performanceMode ? 140 : 120}
                            width={(columnCount * (performanceMode ? 140 : 110)) + 5}
                        >
                            {Cell}
                        </Grid>
                    </div>
                </div>
            </div>
        </ThemeProvider>
    );
}

const FilterButtons = ({map, setMap, t, performanceMode, buttonColor}) => (
    <div className="product-showcase-filter-area">
        {[
            {label: t.all, value: 1},
            {label: t.favorites, value: 2},
            {label: 'A - Ç', value: 3},
            {label: 'D - G', value: 4},
            {label: 'Ğ - L', value: 5},
            {label: 'J - N', value: 6},
            {label: 'O - S', value: 7},
            {label: 'Ş - Y', value: 8},
            {label: 'T - Z', value: 9},
            {label: 'W - X', value: 10},
            {label: t.productsWithoutBarcode, value: 11},
        ].map(({label, value}) => (
            <Button
                key={value}
                disableElevation={performanceMode}
                onClick={() => setMap(value)}
                color={buttonColor}
                variant={map === value ? 'contained' : 'outlined'}
            >
                {label}
            </Button>
        ))}
    </div>
);

ProductShowcase.propTypes = {
    dark: PropTypes.bool,
    data: PropTypes.arrayOf(PropTypes.object),
    onClick: PropTypes.func.isRequired,
    keyboardContext: PropTypes.shape({
        handleElementFocus: PropTypes.func,
        value: PropTypes.object,
        onChangeValue: PropTypes.func,
    }),
    ScreenKeyboardComponent: PropTypes.elementType,
    language: PropTypes.string,
    performanceMode: PropTypes.bool,
    buttonColor: PropTypes.oneOf([
        'default',
        'inherit',
        'primary',
        'secondary',
        'error',
        'info',
        'success',
        'warning',
    ]),
    cardColor: PropTypes.string,
};

export default ProductShowcase;
