import {useNavigate, useParams} from "react-router-dom";
import {useCallback, useContext, useEffect, useState} from "react";
import AppDataContext from "../../../../shared/states/AppData/context";
import {defaultProduct} from "../../../../shared/states/AppData/defaultData";
import {updateProduct} from "../../api";

export const useProductEditor = (screenKeyboardValue, clearValues) => {
    const {productId: _productId} = useParams();
    const productId = parseInt(_productId);
    const navigate = useNavigate();
    const [changeData, setChangeData] = useState(false);
    const {products, fetchProducts} = useContext(AppDataContext);
    const tempProduct = products.find(value => value.id === productId);
    const [product, setProduct] = useState(tempProduct ?? defaultProduct);
    const [isLoading, setIsLoading] = useState(false);

    const handleTextChange = (value, key) => {
        setProduct(prevProduct => {
            let updatedValue;
            if (['price', 'stock', 'tax'].includes(key)) {
                value = value.replace(/[^\d.]/g, '');

                if (key === 'stock') {
                    updatedValue = parseInt(value);
                    if (isNaN(updatedValue) || updatedValue > 999) {
                        updatedValue = 999;
                    }
                } else {
                    updatedValue = parseFloat(value);
                    if (isNaN(updatedValue) || updatedValue > 999999) {
                        updatedValue = 999999;
                    }
                }

                if (key === 'tax') {
                    if (isNaN(updatedValue) || updatedValue > 100) {
                        updatedValue = 100;
                    } else if (updatedValue < 0) {
                        updatedValue = 0;
                    }
                } else {
                    if (updatedValue < 0) {
                        updatedValue = 0;
                    }
                }
            } else {
                updatedValue = value;
            }

            return {...prevProduct, [key]: updatedValue};
        });
    };


    useEffect(() => {
        if (product.id) {
            setChangeData(JSON.stringify(product) !== JSON.stringify(tempProduct));
        }
    }, [product, tempProduct, navigate]);


    const cancelChange = useCallback(() => {
        navigate('/products/list');
        clearValues();
    }, [navigate, clearValues]);


    const changeFavorite = () => {
        setProduct(prevProduct => ({
            ...prevProduct, isFavourite: !prevProduct.isFavourite
        }));
    };

    const updateData = () => {
        if (JSON.stringify(product) !== JSON.stringify(tempProduct)) {
            setIsLoading(true);
            updateProduct(productId, product).then(() => {
                fetchProducts().then(() => {
                    navigate('/products/list');
                    clearValues();
                    setIsLoading(false);
                });
            }).catch(reason => {
                console.log(reason);
            });
        }
    };


    useEffect(() => {
        const keys = ['name', 'price', 'tax', 'stock', 'photo'];

        keys.forEach((key) => {
            if (screenKeyboardValue.hasOwnProperty(key) && screenKeyboardValue[key] !== undefined && screenKeyboardValue[key] !== product[key]) {
                handleTextChange(screenKeyboardValue[key], key);
            }
        });
    }, [screenKeyboardValue]);


    return {
        changeData,
        product,
        isLoading,
        handleTextChange,
        cancelChange,
        changeFavorite,
        updateData
    }
}