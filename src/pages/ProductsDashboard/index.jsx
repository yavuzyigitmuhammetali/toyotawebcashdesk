import React, {useCallback, useContext, useEffect} from 'react';
import ProductShowcase from "../../shared/components/ProductShowcase/ProductShowcase";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {Outlet, useNavigate} from "react-router-dom";
import AppDataContext from "../../shared/state/AppData/context";

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
    const navigate = useNavigate();
    const {products, fetchProducts} = useContext(AppDataContext);

    useEffect(() => {
        fetchProducts()
    }, [fetchProducts]);

    const onProductShowcaseClick = useCallback((event) => {
        navigate(`/products/list/${event.id}`, {replace: true})
    }, [navigate]);


    return (<ThemeProvider theme={dark ? darkTheme : lightTheme}>
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
        </ThemeProvider>);
}

export default ProductsDashboard;