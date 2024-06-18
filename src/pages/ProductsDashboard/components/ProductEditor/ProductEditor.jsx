import React, {useContext, useState} from 'react';
import ProductCard from "../../../../shared/components/ProductCard/ProductCard";
import EditableText from "../EditableText";
import "./productEditor.css";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import {Button, Checkbox, CircularProgress, MenuItem, Select} from "@mui/material";
import {Favorite, FavoriteBorder} from "@mui/icons-material";
import ResponsiveDialog from "../../../../shared/components/ResponsiveDialog";
import ScreenKeyboard from "../../../../shared/components/ScreenKeyboard/ScreenKeyboard";
import {useProductEditor} from "./useProductEditor";
import KeyboardContext from "../../../../shared/components/ScreenKeyboard/context";
import AppStatusContext from "../../../../shared/states/AppStatus/context";
import {useTranslation} from "react-i18next";

function ProductEditor({performanceMode = false}) {
    const [selectState, setSelectState] = useState(false);
    const {handleElementFocus, value: screenKeyboardValue, clearValues, enterRef} = useContext(KeyboardContext);
    const {lang, dark, colorOptions} = useContext(AppStatusContext);
    const {t} = useTranslation();
    const {
        changeData,
        product,
        isLoading,
        handleTextChange,
        cancelChange,
        changeFavorite,
        updateData
    } = useProductEditor(screenKeyboardValue, clearValues);

    return (
        <div style={{color: dark ? "white" : "black"}}
             className={`product-editor-container ${performanceMode ? 'performance-mode' : ''}`}>
            <div className={`product-editor-data ${performanceMode ? 'performance-mode' : ''}`}>
                <ProductCard performanceMode={performanceMode} dark={dark} favorite={product.isFavourite}
                             src={product.image} category name={""}
                             style={{width: "30vw", borderWidth: "3px"}}/>

                <div className="product-editor-name"
                     style={{color: dark ? colorOptions.productEditor.dark : colorOptions.productEditor.light}}>{product.name}</div>
                <div className="product-editor-barcode">#{product.barcode}</div>
                <EditableText id="price" onFocus={handleElementFocus} className="product-editor-price"
                              style={{color: dark ? colorOptions.productEditor.dark : colorOptions.productEditor.light}}
                              text={product.price.toString()} name="price"
                              onTextChange={handleTextChange} performanceMode={performanceMode}/>
                <div className="product-editor-price-label">$</div>
                <EditableText id="tax" onFocus={handleElementFocus} className="product-editor-tax"
                              style={{color: dark ? colorOptions.productEditor.dark : colorOptions.productEditor.light}}
                              text={product.tax.toString()} name="tax"
                              onTextChange={handleTextChange} performanceMode={performanceMode}/>
                <div className="product-editor-tax-label">%</div>
                <EditableText id="stock" onFocus={handleElementFocus} className="product-editor-stock"
                              style={{color: dark ? colorOptions.productEditor.dark : colorOptions.productEditor.light}}
                              text={product.stock.toString()} name="stock"
                              onTextChange={handleTextChange} performanceMode={performanceMode}/>
                <div className="product-editor-stock-label">{product.fraction ? t('lbs') : t('pcs')}</div>
                <EditableText id="photo" onFocus={handleElementFocus} className="product-editor-image-placeholder"
                              defaultText={"Photo"} text={product.image.toString()} name="image"
                              onTextChange={handleTextChange} performanceMode={performanceMode}/>
                <AddPhotoAlternateIcon
                    className={`product-editor-photo-icon ${performanceMode ? 'performance-mode' : ''}`}
                    style={{color: dark ? colorOptions.productEditor.dark : colorOptions.productEditor.light}}/>
                <Checkbox onClick={changeFavorite} checked={product.isFavourite} style={{
                    right: "3%",
                    top: "30%",
                    fontSize: "1.5vw",
                    position: "absolute",
                    color: dark ? colorOptions.productEditor.dark : colorOptions.productEditor.light
                }} color="error" icon={<FavoriteBorder style={{width: "2vw"}}/>}
                          checkedIcon={<Favorite style={{width: "2vw"}}/>}/>
                <div className="product-editor-campaign-section">
                    <div className="product-editor-campaign-text" onClick={() => setSelectState(!selectState)}
                         style={{backgroundColor: dark ? colorOptions.productEditor.dark : colorOptions.productEditor.light}}>
                        {product.campaign}
                    </div>
                    <Select
                        style={{visibility: "hidden", width: "100%"}}
                        color="error"
                        onClick={() => setSelectState(false)}
                        fullWidth
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        open={selectState}
                        value={product.campaign}
                        onChange={(event) => {
                            handleTextChange(event.target.value, "campaign");
                            setSelectState(!selectState);
                        }}
                    >
                        <MenuItem value=""><em>{t('none')}</em></MenuItem>
                        <MenuItem value="buy3pay2">{t('buy3pay2')}</MenuItem>
                        <MenuItem value="-20%">{t('discount20')}</MenuItem>
                        <MenuItem value="studentTaxFree">{t('studentTaxFree')}</MenuItem>
                    </Select>
                </div>
            </div>
            <div><ScreenKeyboard color="primary" performanceMode={performanceMode} language={lang} dark={dark}/></div>
            <div className="product-editor-actions">
                <Button style={{flex: 1}} size="small" onClick={cancelChange} color="error"
                        variant="contained">{t('cancel')}
                </Button>
                <ResponsiveDialog language={lang} onConfirm={updateData} title={t('updateProduct')}
                                  text={t('updateConfirmation')}
                                  disabled={!changeData || isLoading} style={{flex: 1}}>
                    <Button ref={enterRef} disabled={!changeData || isLoading} style={{width: "100%"}} size="small"
                            color="success"
                            variant="contained" startIcon={isLoading ? <CircularProgress size={24}/> : null}>
                        {t('save')}
                    </Button>
                </ResponsiveDialog>
            </div>
        </div>
    );
}

export default ProductEditor;
