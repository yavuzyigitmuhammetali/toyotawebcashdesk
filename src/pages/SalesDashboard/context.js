import React from "react";
import {filterProducts, filterProductsByBarcode, filterSubcategories} from "./functions/productProcessing";
import {getCategories, getProducts, getSubCategories} from "./api";


const CartContext = React.createContext(undefined);

const CartProvider = ({children}) => {
    const [_subCategories, _setSubCategories] = React.useState([])
    const [_products, _setProducts] = React.useState([])

    const [categories, setCategories] = React.useState([])
    const [subCategories, setSubCategories] = React.useState([])
    const [products, setProducts] = React.useState([])
    const [selectedMap, setSelectedMap] = React.useState({category: 0, subcategory: 0})

    const updateSelectedMap = (value, field) => {
        setSelectedMap((prevSelectedMap) => ({
            ...prevSelectedMap, [field]: value,
        }));
    };

    const getProductsByBarcode = (barcode) =>{
        return  setProducts(filterProductsByBarcode(_products,barcode));
    };


    React.useEffect(() => {
        getCategories()
            .then(response => setCategories(response.data))
            .catch(error => console.log(error));
        getSubCategories()
            .then(response =>{ _setSubCategories(response.data);setSubCategories(response.data)})
            .catch(error => console.log(error));
        getProducts()
            .then(response =>{_setProducts(response.data);setProducts(response.data)})
            .catch(error => console.log(error));
    }, []);


    React.useEffect(() => {
        if (selectedMap.category && !selectedMap.subcategory) {
            setSubCategories(filterSubcategories(_subCategories, selectedMap.category))
            setProducts(filterProducts(_products, selectedMap.category))
        } else if (selectedMap.category && selectedMap.subcategory) {
            setProducts(filterProducts(_products, selectedMap.category, selectedMap.subcategory))
        } else if (!selectedMap.category && selectedMap.subcategory) {
            setSubCategories(_subCategories)
            setProducts(filterProducts(_products, null, selectedMap.subcategory))
        } else {
            setSubCategories(_subCategories);
            setProducts(_products);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedMap]);


    return (<CartContext.Provider
            value={{
                categories, subCategories, products, updateSelectedMap, getProductsByBarcode
            }}
        >
            {children}
        </CartContext.Provider>);
};

export default CartContext;
export {CartProvider};
