import React, {useContext, useEffect, useState} from 'react';
import "./productEntryPanel.css"
import TextField from "@mui/material/TextField";
import {Button, Checkbox, InputAdornment, InputLabel, MenuItem, Select} from "@mui/material";
import ProductCard from "../../shared/components/ProductCard/ProductCard";
import {Favorite, FavoriteBorder} from "@mui/icons-material";
import KeyboardContext from "../../shared/components/ScreenKeyboard/context";
import ScreenKeyboard from "../../shared/components/ScreenKeyboard/ScreenKeyboard";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {sendProduct} from "./api";
import ResponsiveDialog from "../../shared/components/ResponsiveDialog";
import AppDataContext from "../../shared/state/AppData/context";
import {generateBarcode} from "./functions";
import {defaultProduct} from "../../shared/state/AppData/defaultData";
import {useNavigate} from "react-router-dom";
import QrCodeIcon from '@mui/icons-material/QrCode';
import DialpadIcon from '@mui/icons-material/Dialpad';

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

function ProductEntryPanel({dark = false}) {
    const navigate = useNavigate();
    const {handleElementFocus, value, onChangeValue, enterRef, clearValues} = useContext(KeyboardContext);
    const {categories, subCategories: _subCategories, products, fetchProducts} = useContext(AppDataContext);
    const [formData, setFormData] = useState(defaultProduct);
    const [subCategories, setSubCategories] = useState([]);
    const [valid, setValid] = useState(false);

    useEffect(() => {
        const isValid = formData.barcode !== 0 && formData.name !== '' && formData.price !== 0 && formData.categoryId !== 0 && formData.subCategoryId !== 0;
        setValid(isValid);
    }, [formData]);


    useEffect(() => {
        if (formData.categoryId !== 0) {
            setSubCategories(_subCategories.filter((r) => r.categoryId === formData.categoryId))
        }
    }, [formData.categoryId]);

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
    }, []);


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
                updatedFormData.barcode = formData.barcode&&generateBarcode(updatedFormData.categoryId, updatedFormData.subCategoryId, updatedFormData.id);
            }
            return updatedFormData;
        });
    };

    const handleCheckboxChange = (event) => {
        const {name, checked} = event.target;
        if (name==="barcode"){
            setFormData({
                ...formData, [name]: checked?0:16000
            });
        }else{
            setFormData({
                ...formData, [name]: checked
            });
        }

    };

    const handleSendData = () => {
        if (valid) {
            fetchProducts().then(() => {
                const newId = products.length + 1;
                setFormData((prevFormData) => ({
                    ...prevFormData,
                    id: newId,
                    barcode: prevFormData.fraction?0:generateBarcode(prevFormData.categoryId, prevFormData.subCategoryId, newId)
                }));
                sendProduct(formData).then(value1 => {
                    navigate('/', {replace: true, state: {successMessage: "Ürün Girişi Yapıldı ID: " + value1.data.id}})
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
                subCategoryId: 0
            })
        }
    }

    return (<ThemeProvider theme={dark ? darkTheme : lightTheme}>
        <div style={{backgroundColor: dark ? "#131922" : " #F8FAFB", color: dark ? "white" : "black"}}
             className="product-entry-panel-container">
            <div className="product-entry-panel-left-area">
                <ProductCard style={{width: "50%", fontSize: "20px", borderWidth: "3px"}}
                             name={formData.name}
                             stock={formData.stock}
                             discountText={formData.campaign}
                             dark={dark}
                             price={formData.price}
                             fraction={formData.fraction}
                             src={formData.image} barcode={formData.barcode} favorite={formData.isFavourite}/>
                <div>
                    <span>Favorilere Ekle</span>
                    <Checkbox style={{alignSelf: "flex-start"}} color="success" checked={formData.isFavourite}
                              icon={<FavoriteBorder color="error"/>}
                              checkedIcon={<Favorite color="success"/>} onChange={handleCheckboxChange} name="isFavourite"/>
                </div>
                <div>
                    <span>Barcodesuz Ürün</span>
                    <Checkbox style={{alignSelf: "flex-start"}} color="success" checked={!formData.barcode}
                              icon={<QrCodeIcon color="error"/>}
                              checkedIcon={<QrCodeIcon color="success"/>} onChange={handleCheckboxChange}
                              name="barcode"/>
                </div>
                <div>
                    <span>Kiloya Satış</span>
                    <Checkbox style={{alignSelf: "flex-start"}} color="success" checked={formData.fraction}
                              icon={<DialpadIcon color="error"/>}
                              checkedIcon={<DialpadIcon color="success"/>} onChange={handleCheckboxChange}
                              name="fraction"/>
                </div>
                <div><ScreenKeyboard dark={dark}/></div>

            </div>

            <div className="product-entry-panel-right-area">
                <TextField onFocus={handleElementFocus} id="name" required label="Ürün İsmi" variant="outlined"
                           name="name"
                           value={formData.name} onChange={onChangeValue}/>
                <TextField onFocus={handleElementFocus} id="stock" label="Stok Adedi" variant="outlined"
                           type="number"
                           name="stock" value={formData.stock} onChange={onChangeValue}/>
                <TextField onFocus={handleElementFocus} id="price" required label="Ürün Tutarı" variant="outlined"
                           type="number"
                           name="price" value={formData.price} onChange={onChangeValue}/>
                <TextField onFocus={handleElementFocus} id="tax" InputProps={{
                    startAdornment: <InputAdornment position="start">%</InputAdornment>,
                }} label="Vergi Yüzdesi" variant="outlined" type="number" name="tax"
                           value={formData.tax} onChange={onChangeValue}/>
                <TextField onFocus={handleElementFocus} id="image" label="Ürün Resim URL" variant="outlined"
                           type="url"
                           name="image"
                           value={formData.image} onChange={onChangeValue}/>
                <div>
                    <InputLabel id="demo-simple-select-label">Kampanyalar</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={formData.campaign}
                        onChange={handleInputChange}
                        name="campaign"
                    >
                        <MenuItem value="">-</MenuItem>
                        <MenuItem value="buy3pay2">3 Al 2 Öde</MenuItem>
                        <MenuItem value="-20%">-%20</MenuItem>
                        <MenuItem value="studentTaxFree">Öğrenciye Vergisiz</MenuItem>
                    </Select>
                </div>
                <div>
                    <InputLabel required id="demo-simple-select-label">Kategori</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={formData.categoryId}
                        onChange={handleInputChange}
                        name="categoryId"
                    >
                        {categories.map((item) => <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>)}
                    </Select>
                </div>
                <div>
                    <InputLabel required id="demo-simple-select-label">Alt Kategori</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={formData.subCategoryId}
                        onChange={handleInputChange}
                        name="subCategoryId"
                    >
                        {subCategories.map((item) => <MenuItem value={item.id}
                                                               key={item.id}>{item.name}</MenuItem>)}
                    </Select>
                </div>
                <ResponsiveDialog disabled={!valid} onConfirm={handleSendData} title={"Ürün Girişi"}
                                  text={"Verileri veri tabanınına kaydetmek üzeresiniz"}>
                    <Button disabled={!valid} color={valid ? "success" : "error"} ref={enterRef}
                            variant="outlined">Kaydet</Button>
                </ResponsiveDialog>

            </div>
        </div>
    </ThemeProvider>);
}


export default ProductEntryPanel;