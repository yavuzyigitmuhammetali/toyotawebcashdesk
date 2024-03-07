import React from "react";

import {getCategories, getProducts, getReceipts, getSubCategories} from "./api";
import {defaultCategory, defaultProduct, defaultReceipt, defaultSubCategory} from "./defaultData";
import AppStatusContext from "../AppStatus/context";

const AppDataContext = React.createContext(undefined);

const AppDataProvider = ({children}) => {
    const {isLoggedIn} = React.useContext(AppStatusContext);

    const initialProducts = JSON.parse(sessionStorage.getItem('products')) || [defaultProduct];
    const initialCategories = JSON.parse(sessionStorage.getItem('categories')) || [defaultCategory];
    const initialSubCategories = JSON.parse(sessionStorage.getItem('subCategories')) || [defaultSubCategory];
    const initialReceipts = JSON.parse(sessionStorage.getItem('receipts')) || [defaultReceipt];

    const [products, setProducts] = React.useState(initialProducts);
    const [categories, setCategories] = React.useState(initialCategories);
    const [subCategories, setSubCategories] = React.useState(initialSubCategories);
    const [receipts, setReceipts] = React.useState(initialReceipts);

    const fetchCategories = async (query = "") => {
        try {
            const res = await getCategories(query);
            const data = res.data;

            if (query) {
                return data;
            } else if (JSON.stringify(data) !== JSON.stringify(categories)) {
                setCategories(data);
                sessionStorage.setItem('categories', JSON.stringify(data));
                return categories;
            } else {
                return res;
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
            return null;
        }
    }

    const fetchSubCategories = async (query = "") => {
        try {
            const res = await getSubCategories(query);
            const data = res.data;

            if (query) {
                return data;
            } else if (JSON.stringify(data) !== JSON.stringify(subCategories)) {
                setSubCategories(data);
                sessionStorage.setItem('subCategories', JSON.stringify(data));
                return subCategories;
            } else {
                return res;
            }
        } catch (error) {
            console.error('Error fetching sub-categories:', error);
            return null;
        }
    }

    const fetchProducts = async (query = "") => {
        try {
            const res = await getProducts(query);
            const data = res.data;

            if (query) {
                return data;
            } else if (JSON.stringify(data) !== JSON.stringify(products)) {
                setProducts(data);
                sessionStorage.setItem('products', JSON.stringify(data));
                return products;
            } else {
                return res;
            }
        } catch (error) {
            console.error('Error fetching products:', error);
            return null;
        }
    };


    const fetchReceipts = async (query = "") => {
        try {
            const res = await getReceipts(query);
            const data = res.data;

            if (query) {
                return data;
            } else if (JSON.stringify(data) !== JSON.stringify(receipts)) {
                setReceipts(data);
                sessionStorage.setItem('receipts', JSON.stringify(data));
                return receipts;
            } else {
                return res;
            }
        } catch (error) {
            console.error('Error fetching receipts:', error);
            return null;
        }
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
        Promise.all([fetchCategories(), fetchSubCategories(), fetchProducts(), fetchReceipts()]).catch(error => {
            console.error('Error fetching data:', error);
        });
    }, [isLoggedIn]);


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
