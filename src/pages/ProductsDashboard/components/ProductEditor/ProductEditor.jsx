import React, {useCallback, useContext, useEffect, useRef, useState} from 'react';
import ProductCard from "../../../../shared/components/ProductCard/ProductCard";
import EditableText from "../EditableText";
import "./productEditor.css";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { Button, Checkbox, MenuItem, Select } from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import axios from "axios";
import ResponsiveDialog from "../../../../shared/components/ResponsiveDialog";
import ScreenKeyboard from "../../../../shared/components/ScreenKeyboard/ScreenKeyboard";
import KeyboardContext from "../../../../shared/components/ScreenKeyboard/context";
import {useNavigate, useParams} from "react-router-dom";

function ProductEditor({ dark = false, id: productI = 5 }) {
    const { productId:_productId } = useParams();
    const navigate = useNavigate();
    const productId = parseInt(_productId);
    const [selectState, setSelectState] = useState(false);
    const [tempProduct, setTempProduct] = useState({});
    const [changeData, setChangeData] = useState(false);
    const { handleElementClick, value, onChangeValue, enter } = useContext(KeyboardContext);
    const [product, setProduct] = useState({
        id: 0,
        barcode: 0,
        name: "",
        stock: 0,
        price: 0,
        tax: 0,
        campaign: "",
        isfavourites: false,
        image: "",
        categoryId: 0,
        subCategoryId: 0
    });

    useEffect(() => {
        axios.get("/api/v1/products")
            .then(response => {
                const product = response.data.find(item => item.id === productId);
                setProduct(product);
                setTempProduct(product);
            })
            .catch(error => console.log(error));
    }, [productId]);




    const handleTextChange = (value, key) => {
        setProduct(prevProduct => {
            if (['price', 'stock', 'tax'].includes(key)) {
                const isNumeric = /^-?\d+(\.\d+)?$/.test(value);
                if (isNumeric) {
                    const updatedValue = parseFloat(value);
                    return { ...prevProduct, [key]: updatedValue };
                } else {
                    console.log(`${key} should be a numeric value, received: ${value}`);
                    return prevProduct;
                }
            } else {
                onChangeValue(value)
                return { ...prevProduct, [key]: value };
            }
        });
    };
    const prevValueRef = useRef();

    useEffect(() => {
        const prevValue = prevValueRef.current;
        if (prevValue && value) {
            Object.keys(value).forEach(key => {
                if (value[key] !== prevValue[key]) {
                    handleTextChange(value[key], key);
                    value[key] = product[key]
                }
            });
        }
        prevValueRef.current = value;
    }, [value]);

    useEffect(() => {
        setChangeData(JSON.stringify(product) !== JSON.stringify(tempProduct));
        Object.keys(value).forEach(key => {
            value[key] = product[key]
        });
        console.log(product)
    }, [product, tempProduct]);

    const onButtonClick = useCallback(() => {
        navigate('/products/list');
    }, [navigate]);


    const changeFavorite = () => {
        setProduct(prevProduct => ({
            ...prevProduct,
            isfavourites: !prevProduct.isfavourites
        }));
    };

    const updateData = () => {
        if (JSON.stringify(product) !== JSON.stringify(tempProduct)) {
            axios.patch(`/api/v1/products/${productId}`, product).catch(reason => console.log(reason));
        }
    };

    return (
        <div style={{ color: dark ? "white" : "black" }} className="product-editor-container">
            <div className="product-editor-data">
                <ProductCard dark={dark} favorite={product.isfavourites} src={product.image} category name={""} style={{ width: "30vw", borderWidth: "3px" }} />
                <EditableText id="name" onFocus={handleElementClick} className="product-editor-name" style={{ color: dark ? "#C595D4" : "#9031AA" }} text={product.name.toString()} name="name" onTextChange={handleTextChange} />
                <div className="product-editor-barcode">#{product.barcode}</div>
                <EditableText id="price" onFocus={handleElementClick} className="product-editor-price" style={{ color: dark ? "#C595D4" : "#9031AA" }} text={product.price.toString()} name="price" onTextChange={handleTextChange} />
                <div className="product-editor-price-label">$</div>
                <EditableText id="tax" onFocus={handleElementClick} className="product-editor-tax" style={{ color: dark ? "#C595D4" : "#9031AA" }} text={product.tax.toString()} name="tax" onTextChange={handleTextChange} />
                <div className="product-editor-tax-label">%</div>
                <EditableText id="stock" onFocus={handleElementClick} className="product-editor-stock" style={{ color: dark ? "#C595D4" : "#9031AA" }} text={product.stock.toString()} name="stock" onTextChange={handleTextChange} />
                <div className="product-editor-stock-label">pcs.</div>
                <EditableText id="photo" onFocus={handleElementClick} className="product-editor-image-placeholder" defaultText={"Photo"} text={product.image.toString()} name="image" onTextChange={handleTextChange} />
                <AddPhotoAlternateIcon className="product-editor-photo-icon" style={{ color: dark ? "#C595D4" : "#9031AA" }} />
                <Checkbox onClick={changeFavorite} checked={product.isfavourites} style={{ right: "3%", top: "30%", fontSize: "1.5vw", position: "absolute", color: dark ? "#C595D4" : "#9031AA" }} color="error" icon={<FavoriteBorder style={{ width: "2vw" }} />} checkedIcon={<Favorite style={{ width: "2vw" }} />} />
                <div className="product-editor-campaign-section">
                    <div className="product-editor-campaign-text" onClick={() => setSelectState(!selectState)} style={{ backgroundColor: dark ? "#C595D4" : "#9031AA" }}>
                        {product.campaign}
                    </div>
                    <Select
                        style={{ visibility: "hidden", width: "100%" }}
                        color="error"
                        onClick={() => setSelectState(false)}
                        fullWidth
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        open={selectState}
                        value={product.campaign}
                        onChange={(event) => { handleTextChange(event.target.value, "campaign"); setSelectState(!selectState); }}
                    >
                        <MenuItem value=""><em>None</em></MenuItem>
                        <MenuItem value="buy3pay2">3 Al 2 Öde</MenuItem>
                        <MenuItem value="-20%">Net %20 İndirim</MenuItem>
                        <MenuItem value="studentTaxFree">Öğrenciye Vergisiz!!!</MenuItem>
                    </Select>
                </div>
            </div>
            <div><ScreenKeyboard dark={dark} /></div>
            <div className="product-editor-actions">
                <Button style={{ flex: 1 }} size="small" onClick={onButtonClick} color="error" variant="contained">İptal Et</Button>
                <ResponsiveDialog onConfirm={updateData} title="Ürün Güncelleme" text="Onaylamanız durumunda ürün girilen değerler ile güncellenecektir, kategori ve alt kategori gibi temel detaylar güncellenemez!" disabled={!changeData} style={{ flex: 1 }}>
                    <Button disabled={!changeData} style={{ width: "100%" }} size="small" color="success" variant="contained">Kaydet</Button>
                </ResponsiveDialog>
            </div>
        </div>
    );
}

export default ProductEditor;
