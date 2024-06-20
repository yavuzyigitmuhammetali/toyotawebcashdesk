import React from 'react';
import PropTypes from 'prop-types';
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';
import styles from "./ProductCard.module.css";

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
        onClick,
        className = "",
        performanceMode = false,
        color = "#097ff5"
    } = props;

    const isDisabled = stock === 0;
    const isCategory = category;
    const isDark = dark;
    const isFavorite = favorite;
    const isOutOfStock = !stock;

    const cardStyle = {
        ...style,
        '--text-color': color,
        '--active-border-color': color,
        '--sub-text-color': color
    };

    return (
        <button
            type="button"
            onClick={onClick}
            className={`
                ${styles.productCardContainer}
                ${performanceMode ? styles.simplifiedHover : styles.hoverScale}
                ${isDisabled ? styles.productCardDisabled : ""}
                ${isCategory ? styles.productCardCategory : styles.productCardRegular}
                ${isDark ? styles.productCardDark : styles.productCardLight}
                ${isFavorite ? styles.productCardFavorite : ""}
                ${isOutOfStock ? styles.productCardOutOfStock : ""}
                ${performanceMode ? styles.simplifiedClick : styles.productCardClick}
                ${className}
            `}
            style={cardStyle}
            disabled={isDisabled}
        >
            {src ? (
                <img
                    className={`${styles.productCardImg} ${(!stock && !category) ? styles.grayscale : ""} ${performanceMode ? styles.lowQuality : ""}`}
                    src={src}
                    alt={name}
                    loading="lazy"
                />
            ) : (
                <ImageNotSupportedIcon className={styles.productCardImg}/>
            )}
            <div className={`${styles.productCardText} ${dark ? styles.dark : ""} ${favorite ? styles.favorite : ""}`}>
                <span className={dark ? styles.textWhite : ""}>{name}</span>
                {(barcode && !category) && <span className={dark ? styles.subText : styles.textGray}>#{barcode}</span>}
            </div>
            {(price && !category) && (
                <>
                    <div
                        className={`${styles.productCardPrice} ${dark ? styles.textWhite : ""} ${discount ? styles.lineThrough : ""}`}>{price}$
                    </div>
                    {discount && <span className={styles.productCardDiscount}>{discount}$</span>}
                </>
            )}
            {(stock >= 0 && !category) && (
                <div
                    className={`${styles.productCardStock} ${stock < 10 ? styles.textRed : dark ? styles.textWhite : styles.textDark}`}>
                    {fraction ? parseFloat(stock).toFixed(2) : stock}{fraction ? "lbs." : "pcs."}
                </div>
            )}
            {(discount || discountText) && <div className={styles.productCardOnSale}>{discountText.toUpperCase()}</div>}
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
    onClick: PropTypes.func,
    performanceMode: PropTypes.bool,
    color: PropTypes.string
};

export default ProductCard;