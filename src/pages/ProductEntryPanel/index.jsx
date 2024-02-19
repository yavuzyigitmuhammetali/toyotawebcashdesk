import React, {useContext, useEffect, useState} from 'react';
import "./productEntryPanel.css"
import TextField from "@mui/material/TextField";
import {Button, Checkbox, InputAdornment, InputLabel, MenuItem, Select} from "@mui/material";
import ProductCard from "../../shared/components/ProductCard/ProductCard";
import {Favorite, FavoriteBorder} from "@mui/icons-material";
import KeyboardContext from "../../shared/components/ScreenKeyboard/context";
import ScreenKeyboard from "../../shared/components/ScreenKeyboard/ScreenKeyboard";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {getCategories, getProducts, getSubCategories, sendProduct} from "./api";

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
    const { handleElementClick, value,onChangeValue,enter } = useContext(KeyboardContext);
    const [formData, setFormData] = useState({
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
    });
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [valid, setValid] = useState(false);

    useEffect(() => {
        const isValid = formData.barcode !== '' && formData.name !== '' && formData.price !== 0 && formData.categoryId !== 0 && formData.subCategoryId !== 0;

        setValid(isValid);
    }, [formData]);

    useEffect(() => {
        getCategories()
            .then((res) => setCategories(res.data))
            .catch((error) => console.error('Error fetching categories:', error));
    }, []);

    useEffect(() => {
        if (formData.categoryId !== 0) {
            getSubCategories()
                .then((res) => {
                    setSubCategories(res.data.filter((r) => r.categoryId === formData.categoryId));
                })
                .catch((error) => console.error('Error fetching subcategories:', error));
        }
    }, [formData.categoryId]);

    useEffect(() => {
        getProducts().then((response) => {
            const newId = response.data.length + 1;
            setFormData((prevFormData) => ({
                ...prevFormData,
                id: newId,
                barcode: generateBarcode(prevFormData.categoryId, prevFormData.subCategoryId, newId)
            }));
        }).catch((error) => {
            console.error('Error fetching product count:', error);
        });
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


    const generateBarcode = (categoryId, subCategoryId, id) => {
        const categoryPart = `${categoryId}`.length === 1 ? `${categoryId}0` : `${categoryId}`;

        let subCategoryPart;
        if (`${subCategoryId}`.length === 1) {
            subCategoryPart = `${subCategoryId}00`;
        } else if (`${subCategoryId}`.length === 2) {
            subCategoryPart = `${subCategoryId}0`;
        } else {
            subCategoryPart = `${subCategoryId}`;
        }

        let idPart;
        switch (`${id}`.length) {
            case 1:
                idPart = `${id}0000`;
                break;
            case 2:
                idPart = `${id}000`;
                break;
            case 3:
                idPart = `${id}00`;
                break;
            case 4:
                idPart = `${id}0`;
                break;
            default:
                idPart = `${id}`;
        }

        const barcode = `${categoryPart}${subCategoryPart}${idPart}`;
        return parseInt(barcode, 10);
    };

    const handleInputChange = (event) => {
        const {name, value} = event.target;

        setFormData((prevFormData) => {
            const updatedFormData = {
                ...prevFormData,
                [name]: value
            };
            if (name === 'categoryId' || name === 'subCategoryId') {
                updatedFormData.barcode = generateBarcode(updatedFormData.categoryId, updatedFormData.subCategoryId, updatedFormData.id);
            }
            return updatedFormData;
        });
    };

    const handleCheckboxChange = (event) => {
        const {name, checked} = event.target;
        setFormData({
            ...formData,
            [name]: checked
        });
    };

    const handleSendData = () =>{
        if(valid){
            sendProduct(formData);
        }
    }

    return (
        <ThemeProvider theme={dark?darkTheme:lightTheme}>
            <div style={{backgroundColor:dark?"#131922":" #F8FAFB",color:dark?"white":"black"}} className="product-entry-panel-container">
                <div className="product-entry-panel-left-area">
                    <ProductCard style={{width: "50%", fontSize: "20px",borderWidth:"3px"}}
                                 name={formData.name}
                                 stock={formData.stock}
                                 discountText={formData.campaign}
                                 dark={dark}
                                 price={formData.price}
                                 src={formData.image} barcode={formData.barcode} favorite={formData.isFavourite}/>
                    <div>
                        <span>Favorilere Ekle</span>
                        <Checkbox style={{alignSelf: "flex-start"}} color="error" checked={formData.isFavourite}
                                  icon={<FavoriteBorder/>}
                                  checkedIcon={<Favorite/>} onChange={handleCheckboxChange} name="isFavourite"/>
                    </div>
                    <div><ScreenKeyboard dark={dark}/></div>

                </div>

                <div className="product-entry-panel-right-area">
                    <TextField onClick={handleElementClick} id="name" required  label="Ürün İsmi" variant="outlined" name="name"
                               value={formData.name} onChange={(event)=>onChangeValue(event.target.value)}/>
                    <TextField onClick={handleElementClick}  id="stock" label="Stok Adedi" variant="outlined" type="number"
                               name="stock" value={formData.stock} onChange={(event)=>onChangeValue(event.target.value)}/>
                    <TextField onClick={handleElementClick} id="price" required label="Ürün Tutarı" variant="outlined" type="number"
                               name="price" value={formData.price} onChange={(event)=>onChangeValue(event.target.value)}/>
                    <TextField onClick={handleElementClick} id="tax" InputProps={{
                        startAdornment: <InputAdornment position="start">%</InputAdornment>,
                    }}  label="Vergi Yüzdesi" variant="outlined" type="number" name="tax"
                               value={formData.tax} onChange={(event)=>onChangeValue(event.target.value)}/>
                    <TextField onClick={handleElementClick} id="image" label="Ürün Resim URL" variant="outlined" type="url"
                               name="image"
                               value={formData.image} onChange={(event)=>onChangeValue(event.target.value)}/>
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

                    <Button onClick={handleSendData} disabled={!valid} color={valid?"success":"error"} ref={enter} variant="outlined">Kaydet</Button>
                </div>
            </div>
        </ThemeProvider>
    );
}


export default ProductEntryPanel;