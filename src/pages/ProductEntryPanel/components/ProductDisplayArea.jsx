import React from 'react';
import {Checkbox} from "@mui/material";
import {Favorite, FavoriteBorder} from "@mui/icons-material";
import ProductCard from "../../../shared/components/ProductCard/ProductCard";
import ScreenKeyboard from "../../../shared/components/ScreenKeyboard/ScreenKeyboard";
import QrCodeIcon from '@mui/icons-material/QrCode';
import DialpadIcon from '@mui/icons-material/Dialpad';

function ProductDisplayArea({formData, handleCheckboxChange, lang, dark, t, performanceMode}) {
    return (
        <div className={`product-entry-panel-left-area ${performanceMode ? 'performance' : ''}`}>
            <ProductCard className={`product-card ${performanceMode ? 'performance' : ''}`}
                         performanceMode={performanceMode}
                         name={formData.name}
                         stock={formData.stock}
                         discountText={formData.campaign}
                         dark={dark}
                         price={formData.price}
                         fraction={formData.fraction}
                         src={formData.image} barcode={formData.barcode} favorite={formData.isFavourite}/>
            <div>
                <span>{t('addToFavorites')}</span>
                <Checkbox className="checkbox" color="success" checked={formData.isFavourite}
                          icon={<FavoriteBorder color="error"/>}
                          checkedIcon={<Favorite color="success"/>} onChange={handleCheckboxChange}
                          name="isFavourite"/>
            </div>
            <div>
                <span>{t('productWithoutBarcode')}</span>
                <Checkbox className="checkbox" color="success" checked={!formData.barcode}
                          icon={<QrCodeIcon color="error"/>}
                          checkedIcon={<QrCodeIcon color="success"/>} onChange={handleCheckboxChange}
                          name="barcode"/>
            </div>
            <div>
                <span>{t('sellByWeight')}</span>
                <Checkbox className="checkbox" color="success" checked={formData.fraction}
                          icon={<DialpadIcon color="error"/>}
                          checkedIcon={<DialpadIcon color="success"/>} onChange={handleCheckboxChange}
                          name="fraction"/>
            </div>
            <div><ScreenKeyboard color="primary" performanceMode={performanceMode} language={lang} dark={dark}/></div>
        </div>
    );
}

export default ProductDisplayArea;
