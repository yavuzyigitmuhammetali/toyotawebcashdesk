import React from 'react';
import {InputAdornment, InputLabel, MenuItem, Select, TextField} from "@mui/material";

function ProductFormArea({
                             formData,
                             handleInputChange,
                             categories,
                             subCategories,
                             t,
                             handleElementFocus,
                             onChangeValue,
                             performanceMode,
                             color = "primary"
                         }) {
    return (
        <div className={`product-entry-panel-right-area ${performanceMode ? 'performance' : ''}`}>
            <TextField color={color} onFocus={handleElementFocus} id="name" required label={t('productName')}
                       variant="outlined"
                       name="name"
                       value={formData.name} onChange={onChangeValue}/>
            <TextField color={color} onFocus={handleElementFocus} id="stock" label={t('stockQuantity')}
                       variant="outlined"
                       type="number"
                       name="stock" value={formData.stock} onChange={onChangeValue}/>
            <TextField color={color} onFocus={handleElementFocus} id="price" required label={t('productPrice')}
                       variant="outlined"
                       type="number"
                       name="price" value={formData.price} onChange={onChangeValue}/>
            <TextField color={color} onFocus={handleElementFocus} id="tax" InputProps={{
                startAdornment: <InputAdornment color={color} position="start">%</InputAdornment>,
            }} label={t('taxPercentage')} variant="outlined" type="number" name="tax"
                       value={formData.tax} onChange={onChangeValue}/>
            <TextField color={color} onFocus={handleElementFocus} id="image" label={t('productImageURL')}
                       variant="outlined"
                       type="url"
                       name="image"
                       value={formData.image} onChange={onChangeValue}/>
            <div>
                <InputLabel color={color} id="demo-simple-select-label">{t('campaigns')}</InputLabel>
                <Select
                    color={color}
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
                <InputLabel color={color} required id="demo-simple-select-label">{t('category')}</InputLabel>
                <Select
                    color={color}
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
                <InputLabel color={color} required id="demo-simple-select-label">{t('subCategory')}</InputLabel>
                <Select
                    color={color}
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
        </div>
    );
}

export default React.memo(ProductFormArea);
