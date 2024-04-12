import React from 'react';
import PropTypes from 'prop-types';
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';
import "./productCard.css";

const ProductCard = React.memo((props) => {
    const {
        name = "MARUL",
        category = false,
        stock = 1,
        price = 12000,
        barcode = 120340344,
        dark = false,
        discount = 0,
        discountText = "",
        src = "",
        fraction = false,
        favorite = false,
        style,
        onClick
    } = props;

    const isDisabled = stock === 0;
    const isCategory = category;
    const isDark = dark;
    const isFavorite = favorite;
    const isOutOfStock = !stock;

    return (
        <button
            type="button"
            onClick={onClick}
            className={`
        product-card-container
        product-card-click
        ${isDisabled ? "product-card-disabled" : ""}
        ${isCategory ? "product-card-category" : "product-card-regular"}
        ${isDark ? "product-card-dark" : "product-card-light"}
        ${isFavorite ? "product-card-favorite" : ""}
        ${isOutOfStock ? "product-card-out-of-stock" : ""}
      `}
            style={style}
        >
            {src ? (
                <img
                    className={`product-card-img ${(!stock && !category) ? "grayscale" : ""}`}
                    src={src}
                    alt={name}
                    loading="lazy"
                />
            ) : (
                <ImageNotSupportedIcon className="product-card-img"/>
            )}
            <div className={`product-card-text ${dark ? "dark" : ""} ${favorite ? "favorite" : ""}`}>
                <span className={dark ? "text-white" : ""}>{name}</span>
                {(barcode && !category) && <span className={dark ? "text-blue" : "text-gray"}>#{barcode}</span>}
            </div>
            {(price && !category) && (
                <>
                    <div
                        className={`product-card-price ${dark ? "text-white" : ""} ${discount ? "line-through" : ""}`}>{price}$
                    </div>
                    {discount && <span className="product-card-discount">{discount}$</span>}
                </>
            )}
            {(stock >= 0 && !category) && (
                <div className={`product-card-stock ${stock < 10 ? "text-red" : dark ? "text-white" : "text-dark"}`}>
                    {fraction ? parseFloat(stock).toFixed(2) : stock}{fraction ? "lbs." : "pcs."}
                </div>
            )}
            {(discount || discountText) && <div className="product-card-on-sale">{discountText.toUpperCase()}</div>}
        </button>
    );
});

ProductCard.propTypes = {
    name: PropTypes.string,
    stock: PropTypes.number,
    price: PropTypes.number,
    barcode: PropTypes.number,
    dark: PropTypes.bool,
    discount: PropTypes.number,
    discountText: PropTypes.string,
    src: PropTypes.string,
    fraction: PropTypes.bool,
    favorite: PropTypes.bool,
    style: PropTypes.object,
    onClick: PropTypes.func
};

export default ProductCard;
