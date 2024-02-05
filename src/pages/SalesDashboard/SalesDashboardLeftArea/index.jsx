import React, {useContext, useState} from 'react';
import {createTheme, ThemeProvider} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import {Button, IconButton, InputAdornment} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import "./salesDashboardLeftArea.css"
import ProductCard from "../../../shared/components/ProductCard/ProductCard";
import NumericKeyboardContext from "../components/NumericKeyboard/context";
import CartContext from "../context";

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});
const lightTheme = createTheme({
    palette: {
        mode: 'light',
    },
});


function SalesDashboardLeftArea({dark = false}) {
    const [map,setMap] = useState("categories");
    const {data} = useContext(NumericKeyboardContext);
    const {
        categories,
        subCategories,
        products,
        updateSelectedMap} = useContext(CartContext);

    const [value, setValue] = useState('');

    const handleInputChange = (event) => {
        const inputValue = event.target.value.replace(/[^0-9]/g, '');
        setValue(inputValue);
    };

    return (
        <div style={{
            backgroundColor: dark ? "#111418" : "",
            borderColor: dark ? "white" : ""
        }} className="left-container">
            <ThemeProvider theme={dark ? darkTheme : lightTheme}>
                <CssBaseline/>
                <div className="left-one">
                    <TextField
                    fullWidth
                    id="standard-name"
                    label="Klavyede Barkod Girişi"
                    value={data||value}
                    onChange={handleInputChange}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                #
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <IconButton aria-label="fingerprint">
                                <SearchIcon/>
                            </IconButton>
                        ),
                    }}
                /></div>
                <div className="left-two">
                    <Button onClick={()=>{setMap("categories");updateSelectedMap(0,"category");updateSelectedMap(0,"subcategory");}} size="small" variant="contained">Kategoriler</Button>
                    <Button onClick={()=>{setMap("subcategories");updateSelectedMap(0,"subcategory");}}  size="small"
                            variant={map==="subcategories"||map==="products"?"contained":"outlined"}>
                        Alt Kategoriler</Button>
                    <Button onClick={()=>setMap("products")} size="small" variant={map==="products"?"contained":"outlined"}>Ürünler</Button>
                </div>
                <div className="left-three-scroll">
                    <div className="left-three">
                        {map === "categories" ? (
                            categories.map((category,key)=><ProductCard key={key} onClick={()=>{updateSelectedMap(category.id,"category");setMap("subcategories")}} dark={dark} category name={category.name} src={category.image}/>)
                        ) : map === "subcategories" ? (
                            subCategories.map((subcategory,key)=><ProductCard key={key} onClick={()=>{updateSelectedMap(subcategory.id,"subcategory");setMap("products")}} dark={dark} category name={subcategory.name} src={subcategory.image}/>)
                        ) : map === "products" ? (
                            products.map((product,key)=>
                                <ProductCard key={key} dark={dark} name={product.name} src={product.image} barcode={product.barcode} favorite={product.isfavourites} price={product.price} stock={product.stock} />)
                        ) : (
                            <div></div>
                        )}
                    </div>
                </div>
            </ThemeProvider>
        </div>
    );
}

export default SalesDashboardLeftArea;