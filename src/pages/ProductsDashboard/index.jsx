import React, {useCallback, useEffect, useState} from 'react';
import ProductShowcase from "../../shared/components/ProductShowcase/ProductShowcase";
import axios from "axios";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {Outlet, useNavigate} from "react-router-dom";
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

function ProductsDashboard({dark = false}) {
    const [products,setProducts] = useState([])
    const navigate = useNavigate();


    useEffect(() => {
        axios.get("/api/v1/products").then(response => setProducts(response.data)).catch(reason => console.log(reason))
    }, []);

    const onProductShowcaseClick = useCallback((event) => {
        navigate(`/products/list/${event.id}`, {replace: true, state: {products:products}})
    }, [navigate,products]);


    return (
        <ThemeProvider theme={dark ? darkTheme : lightTheme}>
            <div style={{cursor: "pointer", position: "relative"}}>
                <div style={{zIndex: "-1"}}>
                    <ProductShowcase dark={dark} data={products} onClick={onProductShowcaseClick}/>
                </div>
                <div style={{
                    width: "100vw",
                    height: "100vh",
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                </div>
                <Outlet/>
            </div>
        </ThemeProvider>
    );
}

export default ProductsDashboard;