import React, { useEffect, useMemo, useState} from 'react';
import "./productShowcase.css"
import TextField from "@mui/material/TextField";
import {Button} from "@mui/material";
import KeyboardContext from "../ScreenKeyboard/context";
import ScreenKeyboard from "../ScreenKeyboard/ScreenKeyboard";
import ProductCard from "../ProductCard/ProductCard";
import {filterDataByAlphabetGroups} from "./dataProcessing";


const useKeyboard = () => {
    const context = React.useContext(KeyboardContext);

    if (!context) {
        return {
            handleElementClick: () => {},
            value: "",
            onChangeValue: () => {},
        };
    }

    return context;
};
function ProductShowcase({data=[],onClick,dark=false,screenKeyboard = true}) {

    const { handleElementClick, value, onChangeValue } = useKeyboard();
    const [map, setMap] = useState(1)
    const favourites = useMemo(() => data.filter(item => item.isfavourites), [data]);
    const alphabeticalFilteredData = useMemo(()=>filterDataByAlphabetGroups(data),[data])
    const filteredByName = useMemo(()=>data.filter(item => item.name.toLowerCase().startsWith(value["prodcutSearch"]?.toLowerCase())),[data,value])

    useEffect(() => {
        if (value["prodcutSearch"]){
            setMap(0);
        }else{
            setMap(1)
        }
    }, [value]);

    // const products = Array(1000).fill(<ProductCard />);

    return (
        <div className="product-showcase-container">
            <div style={{backgroundColor:dark?"rgba(19, 25, 34,0.85)":"",borderColor:dark?"white":""}} className="product-showcase-active-area">
                <div className="product-showcase-search-area">
                    <TextField onClick={handleElementClick} onChange={event => onChangeValue(event.target.value)} value={value["prodcutSearch"]} focused fullWidth color="secondary" label="Ürün İsmi" id="prodcutSearch" />
                    {screenKeyboard&&<ScreenKeyboard dark={dark} />}
                </div>
                <div className="product-showcase-filter-area">
                    <Button onClick={()=>setMap(1)} color="secondary" variant={map===1?"contained":"outlined"}>Tümü</Button>
                    <Button onClick={()=>setMap(2)} color="secondary" variant={map===2?"contained":"outlined"}>Favoriler</Button>
                    <Button onClick={()=>setMap(3)} color="secondary" variant={map===3?"contained":"outlined"}>A - Ç</Button>
                    <Button onClick={()=>setMap(4)} color="secondary" variant={map===4?"contained":"outlined"}>D - G</Button>
                    <Button onClick={()=>setMap(5)} color="secondary" variant={map===5?"contained":"outlined"}>Ğ - L</Button>
                    <Button onClick={()=>setMap(6)} color="secondary" variant={map===6?"contained":"outlined"}>J - N</Button>
                    <Button onClick={()=>setMap(7)} color="secondary" variant={map===7?"contained":"outlined"}>O - S</Button>
                    <Button onClick={()=>setMap(8)} color="secondary" variant={map===8?"contained":"outlined"}>Ş - Y</Button>
                    <Button onClick={()=>setMap(9)} color="secondary" variant={map===9?"contained":"outlined"}>T - Z</Button>
                    <Button onClick={()=>setMap(10)} color="secondary" variant={map===10?"contained":"outlined"}>W - X</Button>
                </div>
                <div className="product-showcase-products-scroll-area">
                    <div className="product-showcase-products-area">
                        {map===0?filteredByName.map((product,key)=><ProductCard discountText={product.campaign} onClick={()=>onClick(product)} key={key} dark={dark} name={product.name} src={product.image} barcode={product.barcode} favorite={product.isfavourites} price={product.price} stock={product.stock} />)
                            :map===1?data.map((product,key)=><ProductCard discountText={product.campaign} onClick={()=>onClick(product)} key={key} dark={dark} name={product.name} src={product.image} barcode={product.barcode} favorite={product.isfavourites} price={product.price} stock={product.stock} />)
                        :map===2?favourites.map((product,key)=><ProductCard discountText={product.campaign} onClick={()=>onClick(product)} key={key} dark={dark} name={product.name} src={product.image} barcode={product.barcode} favorite={product.isfavourites} price={product.price} stock={product.stock} />)
                                :alphabeticalFilteredData[map-3].map((product,key)=><ProductCard discountText={product.campaign} onClick={()=>onClick(product)} key={key} dark={dark} name={product.name} src={product.image} barcode={product.barcode} favorite={product.isfavourites} price={product.price} stock={product.stock} />)}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductShowcase;