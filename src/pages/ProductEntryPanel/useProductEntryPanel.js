import {useContext, useEffect, useState} from "react";
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
            setSubCategories(_subCategories.filter((r) => r.categoryId === formData.categoryId))
        }
    }, [_subCategories, formData.categoryId]);

    useEffect(() => {
        const newId = products.length + 1;
        setFormData((prevFormData) => ({
            ...prevFormData,
            id: newId,
            barcode: generateBarcode(prevFormData.categoryId, prevFormData.subCategoryId, newId)
        }));

        return () => {
            clearValues();
        }
    }, [clearValues, products.length]);


    useEffect(() => {
        setFormData((prevFormData) => {
            return {
                ...prevFormData,
                name: value.name ? value.name : "",
                stock: value.stock && value.stock >= 0 ? parseInt(value.stock) : 0,
                price: value.price && value.price > 0 ? parseFloat(value.price) : 0,
                tax: value.tax && value.tax >= 0 && value.tax <= 100 ? parseInt(value.tax) : 0,
                image: value.image ? value.image : "",
            };
        });
    }, [value]);


    const handleInputChange = (event) => {
        const {name, value} = event.target;

        setFormData((prevFormData) => {
            const updatedFormData = {
                ...prevFormData, [name]: value
            };
            if (name === 'categoryId' || name === 'subCategoryId') {
                updatedFormData.barcode = formData.barcode && generateBarcode(updatedFormData.categoryId, updatedFormData.subCategoryId, updatedFormData.id);
            }
            return updatedFormData;
        });
    };

    const handleCheckboxChange = (event) => {
        const {name, checked} = event.target;
        if (name === "barcode") {
            setFormData({
                ...formData, [name]: checked ? 0 : 16000
            });
        } else {
            setFormData({
                ...formData, [name]: checked
            });
        }

    };

    const handleSendData = () => {
        if (valid) {
            setIsLoading(true);
            fetchProducts().then((products) => {
                const newId = products.length + 1;
                setFormData((prevFormData) => ({
                    ...prevFormData,
                    id: newId,
                    barcode: generateBarcode(prevFormData.categoryId, prevFormData.subCategoryId, newId),
                    fraction: prevFormData.fraction
                }));
                sendProduct(formData).then(value1 => {
                    navigate('/', {
                        replace: true,
                        state: {successMessage: t('productEntrySuccessMessage') + " ID: " + value1.data.id}
                    });
                    setIsLoading(false);
                }).catch(() => {
                    setIsLoading(false);
                });
            })
            clearValues();
            setFormData({
                id: null,
                barcode: '',
                name: '',
                stock: 0,
                price: 0,
                tax: 0,
                campaign: '',
                isFavourite: false,
                image: '',
                categoryId: 0,
                subCategoryId: 0,
                fraction: false
            })
        }
    }

    return {
        categories,
        formData,
        subCategories,
        valid,
        isLoading,
        handleInputChange,
        handleCheckboxChange,
        handleSendData
    }
}