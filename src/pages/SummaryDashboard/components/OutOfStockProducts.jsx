import React from 'react';
import ProductCard from '../../../shared/components/ProductCard/ProductCard';

const OutOfStockProducts = ({products, dark, navigate, performanceMode}) => {
    return products
        .filter((product) => !product.stock)
        .map((product, key) => (
            <ProductCard
                performanceMode={performanceMode}
                key={key}
                price={parseFloat(product.price.toFixed(2))}
                barcode={product.barcode}
                favorite={product.isFavourite}
                stock={product.stock}
                dark={dark}
                fraction={product.fraction}
                name={product.name}
                src={product.image}
                discountText={product.campaign}
                onClick={() => navigate(`/products/list/${product.id}`)}
            />
        ));
};

export default OutOfStockProducts;
