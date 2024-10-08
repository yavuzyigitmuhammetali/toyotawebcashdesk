import React, {useCallback, useContext, useEffect, useState} from "react";
import ProductShowcase from "../../shared/components/ProductShowcase/ProductShowcase";
import {Outlet, useNavigate} from "react-router-dom";
import AppDataContext from "../../shared/states/AppData/context";
import ScreenKeyboard from "../../shared/components/ScreenKeyboard/ScreenKeyboard";
import KeyboardContext from "../../shared/components/ScreenKeyboard/context";
import AppStatusContext from "../../shared/states/AppStatus/context";
import "./index.css";
import CircularProgress from "@mui/material/CircularProgress";

function ProductsDashboard() {
    const navigate = useNavigate();
    const {lang, dark, performanceMode, colorOptions} = useContext(AppStatusContext);
    const {products, fetchProducts} = useContext(AppDataContext);
    const keyboardContext = useContext(KeyboardContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProducts().then(() => setLoading(false))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onProductShowcaseClick = useCallback(
        (event) => {
            navigate(`/products/list/${event.id}`, {replace: true});
        },
        [navigate]
    );

    return (

        <div className="main-wrapper">
            {loading ? (
                <div className="loading-container">
                    <CircularProgress color={colorOptions.buttons.circularProgress ?? colorOptions.buttons.default}/>
                </div>
            ) : (
                <>
                    <div className="product-showcase-wrapper">
                        <ProductShowcase
                            cardColor={colorOptions.productCard.productsDashboard ?? colorOptions.productCard.default}
                            buttonColor={colorOptions.buttons.productShowcase ?? colorOptions.buttons.default}
                            keyboardColor={colorOptions.screenKeyboard.productsDashboard ?? colorOptions.screenKeyboard.default}
                            performanceMode={performanceMode}
                            language={lang}
                            ScreenKeyboardComponent={ScreenKeyboard}
                            keyboardContext={keyboardContext}
                            dark={dark}
                            data={products}
                            onClick={onProductShowcaseClick}
                        />
                    </div>
                    <div
                        className="centered-container"
                    ></div>
                    <Outlet/>
                </>
            )}
        </div>

    );
}

export default ProductsDashboard;
