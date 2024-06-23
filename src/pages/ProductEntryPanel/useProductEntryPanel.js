import {useCallback, useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import AppDataContext from "../../shared/states/AppData/context";
import {defaultProduct} from "../../shared/states/AppData/defaultData";
import {generateBarcode} from "./functions";
import {sendProduct} from "./api";

export const useProductEntryPanel = (t, value, clearValues) => {
    const navigate = useNavigate();
    const {categories, subCategories: _subCategories, products, fetchProducts} = useContext(AppDataContext);
    const [formData, setFormData] = useState(defaultProduct);
    const [subCategories, setSubCategories] = useState([]);
    const [valid, setValid] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const isValid = formData.barcode >= 0 && formData.name !== '' && formData.price !== 0 && formData.categoryId !== 0 && formData.subCategoryId !== 0;
        setValid(isValid);
    }, [formData]);

    useEffect(() => {
        if (formData.categoryId !== 0) {
            setSubCategories(_subCategories.filter((r) => r.categoryId === formData.categoryId));
        }
    }, [_subCategories, formData.categoryId]);

    useEffect(() => {
        const newId = products.length + 1;
        setFormData((prevFormData) => ({
            ...prevFormData,
            id: newId,
            barcode: generateBarcode(prevFormData.categoryId, prevFormData.subCategoryId, newId)
        }));

        return clearValues;
    }, [clearValues, products.length]);

    useEffect(() => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            name: value.name || "",
            stock: value.stock && value.stock >= 0 ? parseInt(value.stock) : 0,
            price: value.price && value.price > 0 ? parseFloat(value.price) : 0,
            tax: value.tax && value.tax >= 0 && value.tax <= 100 ? parseInt(value.tax) : 0,
            image: value.image || "",
        }));
    }, [value]);

    const handleInputChange = useCallback((event) => {
        const {name, value} = event.target;

        setFormData((prevFormData) => {
            const updatedFormData = {...prevFormData, [name]: value};
            if (name === 'categoryId' || name === 'subCategoryId') {
                updatedFormData.barcode = generateBarcode(updatedFormData.categoryId, updatedFormData.subCategoryId, updatedFormData.id);
            }
            return updatedFormData;
        });
    }, []);

    const handleCheckboxChange = useCallback((event) => {
        const {name, checked} = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: name === "barcode" ? (checked ? 0 : 16000) : checked
        }));
    }, []);

    const handleSendData = useCallback(async () => {
        if (valid) {
            setIsLoading(true);
            try {
                const updatedProducts = await fetchProducts();
                const newId = updatedProducts.length + 1;
                const updatedFormData = {
                    ...formData,
                    id: newId,
                    barcode: generateBarcode(formData.categoryId, formData.subCategoryId, newId)
                };
                const response = await sendProduct(updatedFormData);
                navigate('/', {
                    replace: true,
                    state: {successMessage: `${t('productEntrySuccessMessage')} ID: ${response.id}`}
                });
            } catch (error) {
                console.error('Error sending product:', error);
                // Handle error (e.g., show error message to user)
            } finally {
                setIsLoading(false);
                clearValues();
                setFormData(defaultProduct);
            }
        }
    }, [valid, formData, fetchProducts, navigate, t, clearValues]);

    return {
        categories,
        formData,
        subCategories,
        valid,
        isLoading,
        handleInputChange,
        handleCheckboxChange,
        handleSendData
    };
};