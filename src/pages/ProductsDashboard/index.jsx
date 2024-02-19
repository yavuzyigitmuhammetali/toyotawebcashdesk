import React, {useEffect, useState} from 'react';
import ProductShowcase from "../../shared/components/ProductShowcase/ProductShowcase";
import axios from "axios";
import ProductEditor from "./components/ProductEditor/ProductEditor";
import {createTheme, ThemeProvider} from "@mui/material/styles";
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
    const [selectedProduct,setSelectedProduct] = useState({})

    useEffect(() => {
        axios.get("/api/v1/products").then(response => setProducts(response.data)).catch(reason => console.log(reason))
    }, []);

    return (
        <ThemeProvider theme={dark ? darkTheme : lightTheme}>
            <div style={{cursor: "pointer", position: "relative"}}>
                <div style={{zIndex: "-1"}}>
                    <ProductShowcase dark={dark} data={products} onClick={setSelectedProduct}/>
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

            </div>
        </ThemeProvider>
    );
}

export default ProductsDashboard;