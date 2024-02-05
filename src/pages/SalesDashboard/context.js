import React from "react";
import {filterProducts, filterSubcategories} from "./functions/productProcessing";
import {getCategories, getProducts, getSubCategories} from "./api";


const CartContext = React.createContext();

const CartProvider = ({children}) => {
    const [categories, setCategories] = React.useState([])
    const [subCategories, setSubCategories] = React.useState([])
    const [products, setProducts] = React.useState([])
    const [selectedMap, setSelectedMap] = React.useState({category: 0, subcategory: 0})

    const updateSelectedMap = (value, field) => {
        setSelectedMap((prevSelectedMap) => ({
            ...prevSelectedMap,
            [field]: value,
        }));
    };


    React.useEffect(() => {
        getCategories()
            .then(response => setCategories(response.data))
            .catch(error => console.log(error));
    }, []);


    React.useEffect(() => {
        if (selectedMap.category && !selectedMap.subcategory) {
            getSubCategories()
                .then(response => setSubCategories(filterSubcategories(response.data, selectedMap.category)))
                .catch(error => console.log(error));
            getProducts()
                .then(response => setProducts(filterProducts(response.data, selectedMap.category)))
                .catch(error => console.log(error));
        } else if (selectedMap.category && selectedMap.subcategory) {
            getProducts()
                .then(response => setProducts(filterProducts(response.data, selectedMap.category, selectedMap.subcategory)))
                .catch(error => console.log(error));
        } else if (!selectedMap.category && selectedMap.subcategory) {
            getSubCategories()
                .then(response => setSubCategories(response.data))
                .catch(error => console.log(error));
            getProducts()
                .then(response => setProducts(filterProducts(response.data, null, selectedMap.subcategory)))
                .catch(error => console.log(error));
        } else {
            getSubCategories()
                .then(response => setSubCategories(response.data))
                .catch(error => console.log(error));

            getProducts()
                .then(response => setProducts(response.data))
                .catch(error => console.log(error));
        }
    }, [selectedMap]);


    return (
        <CartContext.Provider
            value={{
                categories,
                subCategories,
                products,
                updateSelectedMap
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export default CartContext;
export {CartProvider};
