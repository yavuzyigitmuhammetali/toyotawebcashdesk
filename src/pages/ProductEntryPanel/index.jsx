import React, {useContext, useMemo} from 'react';
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

    const memoizedProductDisplayArea = useMemo(() => (
        <ProductDisplayArea
            cardColor={colorOptions.productCard.productEntryPanel ?? colorOptions.productCard.default}
            keyboardColor={colorOptions.screenKeyboard.productEntryPanel ?? colorOptions.screenKeyboard.default}
            t={t} lang={lang} dark={dark} formData={formData}
            handleCheckboxChange={handleCheckboxChange} performanceMode={performanceMode}
        />
    ), [t, lang, dark, formData, handleCheckboxChange, performanceMode, colorOptions.screenKeyboard.productEntryPanel, colorOptions.screenKeyboard.default, colorOptions.productCard.productEntryPanel, colorOptions.productCard.default]);

    const memoizedProductFormArea = useMemo(() => (
        <ProductFormArea
            color={colorOptions.buttons.productEntryPanel ?? colorOptions.buttons.default}
            onChangeValue={onChangeValue} handleElementFocus={handleElementFocus} t={t}
            formData={formData} handleInputChange={handleInputChange}
            categories={categories} subCategories={subCategories} performanceMode={performanceMode}
        />
    ), [onChangeValue, handleElementFocus, t, formData, handleInputChange, categories, subCategories, performanceMode, colorOptions.buttons.productEntryPanel, colorOptions.buttons.default]);

    return (
        <div className="product-entry-panel-container">
            {memoizedProductDisplayArea}
            {memoizedProductFormArea}
            <ProductDialog
                lang={lang} t={t} valid={valid} isLoading={isLoading}
                handleSendData={handleSendData} enterRef={enterRef} performanceMode={performanceMode}
            />
        </div>
    );
}

export default React.memo(ProductEntryPanel);