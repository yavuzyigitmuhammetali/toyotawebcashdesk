import React from 'react';
import "./productCard.css"
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';

function ProductCard({
                         name = "MARUL",
                         category = false,
                         stock = 1,
                         price = 12000,
                         barcode = 120340344,
                         dark = false,
                         discount = 0,
                         discountText = "", //onSale
                         src = "",
                         favorite = false,
                         style,
                         onClick
                     }) {
    stock = stock.toString()
    return (<button onClick={onClick} style={{
        cursor: !stock ? "default" : "pointer",
        transform: !stock && "scale(1)",
        width: category ? "140px" : "102px",
        fontSize: category ? "0.8em" : "0.6em",
        backgroundColor: dark && "#1E1E1E",
        borderColor: favorite ? "gold" : dark && "white",
            ...style
    }}
                    className={stock !== "0" ? "product-card-container product-card-click" : "product-card-container product-card-click product-card-disabled"}>
        {src ? <img className="product-card-img" style={{filter: (!stock && !category) && "grayscale(100%)"}} src={src}
                    alt="Görsel"
                    loading={"lazy"}/> : <ImageNotSupportedIcon className="product-card-img"/>}

        <div style={{backgroundColor: dark && "rgba(0, 0, 0, 0.7)", borderColor: favorite && "gold"}}
             className="product-card-text">
            <span style={{color: dark && "white"}}>{name}</span>
            {(barcode && !category) ? <span style={{color: dark ? "#1976d2" : "#BBBBBB"}}>#{barcode}</span> : null}
        </div>
        {(price && !category) ? <>
            <div style={{color: dark && "white", textDecoration: discount && "line-through"}}
                 className="product-card-price">{price}₺
            </div>
            {discount ? <span className="product-card-discount">{discount}₺</span> : null}
        </> : null}

        {(stock && !category) ? <div style={{color: stock < 10 ? "red" : dark ? "white" : "#111418"}}
                                     className="product-card-stock">{stock}pcs.</div> : null}
        {discount || discountText ? <div className="product-card-on-sale">{discountText.toUpperCase()}</div> : null}
    </button>);
}

export default ProductCard;