import React from "react";
import {getCategories, getProducts, getReceipts, getSubCategories} from "./api";
import {defaultCategory, defaultProduct, defaultReceipt, defaultSubCategory} from "./defaultData";
import AppStatusContext from "../AppStatus/context";
import useSessionStorageState from "./useSessionStorageState";

const AppDataContext = React.createContext(undefined);

const AppDataProvider = ({children}) => {
    const {isLoggedIn} = React.useContext(AppStatusContext);

    const [products, setProducts, clearProducts] = useSessionStorageState('products', [defaultProduct]);
    const [categories, setCategories, clearCategories] = useSessionStorageState('categories', [defaultCategory]);
    const [subCategories, setSubCategories, clearSubCategories] = useSessionStorageState('subCategories', [defaultSubCategory]);
    const [receipts, setReceipts, clearReceipts] = useSessionStorageState('receipts', [defaultReceipt]);

    const fetchData = async (fetchFunction, setStateFunction, key, query = "") => {
        try {
            const res = await fetchFunction(query);
            const data = res.data;

            if (!query || JSON.stringify(data) !== JSON.stringify(sessionStorage.getItem(key))) {
                setStateFunction(data);
            }
            return data;
        } catch (error) {
            console.error(`Error fetching ${key}:`, error);
            return null;
        }
    };

    const fetchCategories = (query = "") => fetchData(getCategories, setCategories, 'categories', query);
    const fetchSubCategories = (query = "") => fetchData(getSubCategories, setSubCategories, 'subCategories', query);
    const fetchProducts = (query = "") => fetchData(getProducts, setProducts, 'products', query);
    const fetchReceipts = (query = "") => fetchData(getReceipts, setReceipts, 'receipts', query);

    React.useEffect(() => {
        Promise.all([fetchCategories(), fetchSubCategories(), fetchProducts(), fetchReceipts()]).catch(error => {
            console.error('Error fetching initial data:', error);
        });
    }, [isLoggedIn]);

    return (
        <AppDataContext.Provider
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
        </AppDataContext.Provider>
    );
};

export default AppDataContext;
export {AppDataProvider};
