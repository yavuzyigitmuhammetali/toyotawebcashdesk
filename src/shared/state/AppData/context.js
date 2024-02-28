import React from "react";
import {getCategories, getProducts, getReceipts, getSubCategories} from "./api";
import {defaultCategory, defaultProduct, defaultReceipt, defaultSubCategory} from "./defaultData";

const AppDataContext = React.createContext(undefined);

const AppDataProvider = ({children}) => {
    const initialProducts = JSON.parse(sessionStorage.getItem('products')) || [defaultProduct];
    const initialCategories = JSON.parse(sessionStorage.getItem('categories')) || [defaultCategory];
    const initialSubCategories = JSON.parse(sessionStorage.getItem('subCategories')) || [defaultSubCategory];
    const initialReceipts = JSON.parse(sessionStorage.getItem('receipts')) || [defaultReceipt];

    const [products, setProducts] = React.useState(initialProducts);
    const [categories, setCategories] = React.useState(initialCategories);
    const [subCategories, setSubCategories] = React.useState(initialSubCategories);
    const [receipts, setReceipts] = React.useState(initialReceipts);

    const fetchCategories = (query="") => {
        getCategories(query)
            .then((res) => {
                setCategories(res.data);
                sessionStorage.setItem('categories', JSON.stringify(res.data));
            })
            .catch((error) => console.error('Error fetching categories:', error));
    };

    const fetchSubCategories = (query="") => {
        getSubCategories(query)
            .then((res) => {
                setSubCategories(res.data);
                sessionStorage.setItem('subCategories', JSON.stringify(res.data));
            })
            .catch((error) => console.error('Error fetching sub-categories:', error));
    };

    const fetchProducts = (query="") => {
        getProducts(query)
            .then((res) => {
                setProducts(res.data);
                sessionStorage.setItem('products', JSON.stringify(res.data));
            })
            .catch((error) => console.error('Error fetching products:', error));
    };

    const fetchReceipts = (query="") => {
        getReceipts(query)
            .then((res) => {
                setReceipts(res.data);
                sessionStorage.setItem('receipts', JSON.stringify(res.data));
            })
            .catch((error) => console.error('Error fetching receipts:', error));
    };

    const clearCategories = (hardRes = false) => {
        setCategories([defaultCategory]);
        hardRes && sessionStorage.removeItem('categories');
    };

    const clearSubCategories = (hardRes = false) => {
        setSubCategories([defaultSubCategory]);
        hardRes && sessionStorage.removeItem('subCategories');
    };

    const clearProducts = (hardRes = false) => {
        setProducts([defaultProduct]);
        hardRes && sessionStorage.removeItem('products');
    };

    const clearReceipts = (hardRes = false) => {
        setReceipts([defaultReceipt]);
        hardRes && sessionStorage.removeItem('receipts');

    };

    React.useEffect(() => {
        fetchCategories();
        fetchReceipts();
        fetchSubCategories();
        fetchProducts();
    }, []);

    return (<AppDataContext.Provider
            value={{
                products,
                categories,
                subCategories,
                receipts,
                fetchCategories,
                fetchSubCategories,
                fetchProducts,
                fetchReceipts,
                clearCategories,
                clearSubCategories,
                clearProducts,
                clearReceipts,
            }}
        >
            {children}
        </AppDataContext.Provider>);
};

export default AppDataContext;
export {AppDataProvider};
