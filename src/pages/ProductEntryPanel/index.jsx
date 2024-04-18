import React, {useContext} from 'react';
import "./productEntryPanel.css"
import {useProductEntryPanel} from "./useProductEntryPanel";
import {useTranslation} from "react-i18next";
import ProductDisplayArea from './components/ProductDisplayArea';
import ProductFormArea from './components/ProductFormArea';
import ProductDialog from './components/ProductDialog';
import KeyboardContext from "../../shared/components/ScreenKeyboard/context";
import AppStatusContext from "../../shared/states/AppStatus/context";

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
        <div className={`product-entry-panel-container ${dark ? 'dark' : 'light'}`}>
            <ProductDisplayArea t={t} lang={lang} dark={dark} formData={formData}
                                handleCheckboxChange={handleCheckboxChange}/>
            <ProductFormArea onChangeValue={onChangeValue} handleElementFocus={handleElementFocus} t={t}
                             formData={formData} handleInputChange={handleInputChange}
                             categories={categories} subCategories={subCategories}/>
            <ProductDialog lang={lang} t={t} valid={valid} isLoading={isLoading} handleSendData={handleSendData}
                           enterRef={enterRef}/>
        </div>
    );
}

export default ProductEntryPanel;