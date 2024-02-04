import React, {useEffect, useState} from 'react';
import axios from "axios";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import {Button, IconButton, InputAdornment} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import "./salesDashboardLeftArea.css"
import ProductCard from "../../../shared/components/ProductCard/ProductCard";

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


function SalesDashboardLeftArea({dark = true}) {
    const [categories, setCategories] = useState([]);
    const [map,setMap] = useState("categories");

    const [value, setValue] = useState('');

    const handleInputChange = (event) => {
        const inputValue = event.target.value.replace(/[^0-9]/g, '');
        setValue(inputValue);
    };

    return (
        <div style={{backgroundColor:dark&&"#111418",borderColor:dark&&"white"}} className="left-container">
            <ThemeProvider theme={dark ? darkTheme : lightTheme}>
                <CssBaseline/>
                <div className="left-one"><TextField
                    fullWidth
                    id="standard-name"
                    label="Klavyede Barkod Girişi"
                    value={value}
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
                    <Button onClick={()=>setMap("categories")} size="small" variant="contained">Kategoriler</Button>
                    <Button onClick={()=>setMap("subcategories")} size="small"
                            variant={map==="subcategories"||map==="products"?"contained":"outlined"}>
                        Alt Kategoriler</Button>
                    <Button onClick={()=>setMap("products")} size="small" variant={map==="products"?"contained":"outlined"}>Ürünler</Button>
                </div>
                <div className="left-three-scroll">
                    <div className="left-three">
                        <ProductCard dark={dark} />
                    </div>
                </div>
            </ThemeProvider>
        </div>
    );
}

export default SalesDashboardLeftArea;