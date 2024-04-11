import React from 'react';
import {useProductShowcase} from './useProductShowcase';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import {Button} from '@mui/material';
import {FixedSizeGrid as Grid} from 'react-window';
import './productShowcase.css';

function ProductShowcase(props) {
    const {
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
    } = useProductShowcase(props);

    return (
        <ThemeProvider theme={createTheme({palette: {mode: dark ? 'dark' : 'light'}})}>
            <div className="product-showcase-container">
                <div className={`product-showcase-active-area ${dark ? 'dark' : ''}`}>
                    <div className="product-showcase-search-area">
                        <TextField
                            onFocus={handleElementFocus}
                            onChange={onChangeValue}
                            value={inputValue}
                            onClick={() => setMap(0)}
                            fullWidth
                            color="secondary"
                            label={t.searchLabel}
                            id="productSearch"
                        />
                        {ScreenKeyboardComponent ? <ScreenKeyboardComponent language={language} dark={dark}/> : null}
                    </div>
                    <FilterButtons map={map} setMap={setMap} t={t}/>
                    <div className="product-showcase-products-scroll-area">
                        <Grid
                            columnCount={columnCount}
                            columnWidth={110}
                            height={window.innerHeight - 200}
                            rowCount={rowCount}
                            rowHeight={120}
                            width={(columnCount * 110)+5}
                        >
                            {Cell}
                        </Grid>
                    </div>
                </div>
            </div>
        </ThemeProvider>
    );
}

const FilterButtons = ({map, setMap, t}) => (
    <div className="product-showcase-filter-area">
        <Button onClick={() => setMap(1)} color="secondary" variant={map === 1 ? 'contained' : 'outlined'}>
            {t.all}
        </Button>
        <Button onClick={() => setMap(2)} color="secondary" variant={map === 2 ? 'contained' : 'outlined'}>
            {t.favorites}
        </Button>
        <Button onClick={() => setMap(3)} color="secondary" variant={map === 3 ? 'contained' : 'outlined'}>
            A - Ç
        </Button>
        <Button onClick={() => setMap(4)} color="secondary" variant={map === 4 ? 'contained' : 'outlined'}>
            D - G
        </Button>
        <Button onClick={() => setMap(5)} color="secondary" variant={map === 5 ? 'contained' : 'outlined'}>
            Ğ - L
        </Button>
        <Button onClick={() => setMap(6)} color="secondary" variant={map === 6 ? 'contained' : 'outlined'}>
            J - N
        </Button>
        <Button onClick={() => setMap(7)} color="secondary" variant={map === 7 ? 'contained' : 'outlined'}>
            O - S
        </Button>
        <Button onClick={() => setMap(8)} color="secondary" variant={map === 8 ? 'contained' : 'outlined'}>
            Ş - Y
        </Button>
        <Button onClick={() => setMap(9)} color="secondary" variant={map === 9 ? 'contained' : 'outlined'}>
            T - Z
        </Button>
        <Button onClick={() => setMap(10)} color="secondary" variant={map === 10 ? 'contained' : 'outlined'}>
            W - X
        </Button>
        <Button onClick={() => setMap(11)} color="secondary" variant={map === 11 ? 'contained' : 'outlined'}>
            {t.productsWithoutBarcode}
        </Button>
    </div>
);

export default ProductShowcase;
