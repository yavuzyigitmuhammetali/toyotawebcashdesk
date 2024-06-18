import React, {useContext} from 'react';
import "./index.css";
import {useProductEntryPanel} from "./useProductEntryPanel";
import {useTranslation} from "react-i18next";
import ProductDisplayArea from './components/ProductDisplayArea';
import ProductFormArea from './components/ProductFormArea';
import ProductDialog from './components/ProductDialog';
import KeyboardContext from "../../shared/components/ScreenKeyboard/context";
import AppStatusContext from "../../shared/states/AppStatus/context";

function ProductEntryPanel() {
    const {lang, dark, performanceMode, colorOptions} = useContext(AppStatusContext);
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
        <div className={`product-entry-panel-container`}>
            <ProductDisplayArea
                cartColor={colorOptions.cartItem.productEntryPanel ?? colorOptions.cartItem.default}
                keyboardColor={colorOptions.screenKeyboard.productEntryPanel ?? colorOptions.screenKeyboard.default}
                t={t} lang={lang} dark={dark} formData={formData}
                handleCheckboxChange={handleCheckboxChange} performanceMode={performanceMode}/>
            <ProductFormArea color={colorOptions.buttons.productEntryPanel ?? colorOptions.buttons.default}
                             onChangeValue={onChangeValue} handleElementFocus={handleElementFocus} t={t}
                             formData={formData} handleInputChange={handleInputChange}
                             categories={categories} subCategories={subCategories} performanceMode={performanceMode}/>
            <ProductDialog lang={lang} t={t} valid={valid} isLoading={isLoading} handleSendData={handleSendData}
                           enterRef={enterRef} performanceMode={performanceMode}/>
        </div>
    );
}

export default ProductEntryPanel;
