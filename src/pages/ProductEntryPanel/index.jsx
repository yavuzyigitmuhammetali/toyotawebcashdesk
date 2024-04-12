import React, {useContext} from 'react';
import "./productEntryPanel.css"
import TextField from "@mui/material/TextField";
import {Button, Checkbox, CircularProgress, InputAdornment, InputLabel, MenuItem, Select} from "@mui/material";
import ProductCard from "../../shared/components/ProductCard/ProductCard";
import {Favorite, FavoriteBorder} from "@mui/icons-material";
import ScreenKeyboard from "../../shared/components/ScreenKeyboard/ScreenKeyboard";
import ResponsiveDialog from "../../shared/components/ResponsiveDialog";
import QrCodeIcon from '@mui/icons-material/QrCode';
import DialpadIcon from '@mui/icons-material/Dialpad';
import {useProductEntryPanel} from "./useProductEntryPanel";
import AppStatusContext from "../../shared/state/AppStatus/context";
import {useTranslation} from "react-i18next";
import KeyboardContext from "../../shared/components/ScreenKeyboard/context";


function ProductEntryPanel() {
    const {lang, dark} = useContext(AppStatusContext);
    const {t} = useTranslation();
    const {handleElementFocus, value, onChangeValue, enterRef, clearValues} = useContext(KeyboardContext);
    const {
        categories,
        formData,
        subCategories,
        valid,
        isLoading,
        handleInputChange,
        handleCheckboxChange,
        handleSendData
    } = useProductEntryPanel(t, value, clearValues);

    return (
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
                    <span>{t('addToFavorites')}</span>
                    <Checkbox style={{alignSelf: "flex-start"}} color="success" checked={formData.isFavourite}
                              icon={<FavoriteBorder color="error"/>}
                              checkedIcon={<Favorite color="success"/>} onChange={handleCheckboxChange}
                              name="isFavourite"/>
                </div>
                <div>
                    <span>{t('productWithoutBarcode')}</span>
                    <Checkbox style={{alignSelf: "flex-start"}} color="success" checked={!formData.barcode}
                              icon={<QrCodeIcon color="error"/>}
                              checkedIcon={<QrCodeIcon color="success"/>} onChange={handleCheckboxChange}
                              name="barcode"/>
                </div>
                <div>
                    <span>{t('sellByWeight')}</span>
                    <Checkbox style={{alignSelf: "flex-start"}} color="success" checked={formData.fraction}
                              icon={<DialpadIcon color="error"/>}
                              checkedIcon={<DialpadIcon color="success"/>} onChange={handleCheckboxChange}
                              name="fraction"/>
                </div>
                <div><ScreenKeyboard language={lang} dark={dark}/></div>

            </div>

            <div className="product-entry-panel-right-area">
                <TextField onFocus={handleElementFocus} id="name" required label={t('productName')}
                           variant="outlined"
                           name="name"
                           value={formData.name} onChange={onChangeValue}/>
                <TextField onFocus={handleElementFocus} id="stock" label={t('stockQuantity')} variant="outlined"
                           type="number"
                           name="stock" value={formData.stock} onChange={onChangeValue}/>
                <TextField onFocus={handleElementFocus} id="price" required label={t('productPrice')}
                           variant="outlined"
                           type="number"
                           name="price" value={formData.price} onChange={onChangeValue}/>
                <TextField onFocus={handleElementFocus} id="tax" InputProps={{
                    startAdornment: <InputAdornment position="start">%</InputAdornment>,
                }} label={t('taxPercentage')} variant="outlined" type="number" name="tax"
                           value={formData.tax} onChange={onChangeValue}/>
                <TextField onFocus={handleElementFocus} id="image" label={t('productImageURL')} variant="outlined"
                           type="url"
                           name="image"
                           value={formData.image} onChange={onChangeValue}/>
                <div>
                    <InputLabel id="demo-simple-select-label">{t('campaigns')}</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={formData.campaign}
                        onChange={handleInputChange}
                        name="campaign"
                    >
                        <MenuItem value="">-</MenuItem>
                        <MenuItem value="buy3pay2">buy3pay2</MenuItem>
                        <MenuItem value="-20%">-20%</MenuItem>
                        <MenuItem value="studentTaxFree">studentTaxFree</MenuItem>
                    </Select>
                </div>
                <div>
                    <InputLabel required id="demo-simple-select-label">{t('category')}</InputLabel>
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
                    <InputLabel required id="demo-simple-select-label">{t('subCategory')}</InputLabel>
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
                <ResponsiveDialog language={lang} disabled={!valid || isLoading} onConfirm={handleSendData}
                                  title={t('saveProduct')} text={t('saveProductConfirmation')}>
                    <Button disabled={!valid || isLoading} color={valid ? "success" : "error"} ref={enterRef}
                            variant="outlined">
                        {isLoading ? <CircularProgress size={24}/> : t('saveProduct')}
                    </Button>
                </ResponsiveDialog>

            </div>
        </div>
    );
}


export default ProductEntryPanel;