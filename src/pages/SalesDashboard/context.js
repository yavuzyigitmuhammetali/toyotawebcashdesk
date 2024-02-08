import React from "react";
import {
    applyBuy3Pay2, applyPerCentDiscount, applyStudentTaxFree, calculateSubtotalAndTotal,
    filterProducts,
    filterProductsByBarcode,
    filterSubcategories,
} from "./functions/productProcessing";
import {getCategories, getProducts, getSubCategories} from "./api";


const CartContext = React.createContext(undefined);

const CartProvider = ({children}) => {
    const [_subCategories, _setSubCategories] = React.useState([]);
    const [_products, _setProducts] = React.useState([])
    const [cart, setCart] = React.useState([])

    const [categories, setCategories] = React.useState([])
    const [subCategories, setSubCategories] = React.useState([])
    const [products, setProducts] = React.useState([])
    const [selectedMap, setSelectedMap] = React.useState({category: 0, subcategory: 0})
    const [total, setTotal] = React.useState(0)
    const [subTotal, setSubTotal] = React.useState(0)
    const [discounts, setDiscounts] = React.useState({buy3pay2:false,studentTaxFree:false,percentageDiscounts:false})

    const updateSelectedMap = (value, field) => {
        setSelectedMap((prevSelectedMap) => ({
            ...prevSelectedMap, [field]: value,
        }));
    };

    const toggleDiscounts=(discountKey)=> {
        setDiscounts(prevDiscounts => ({
            ...prevDiscounts,
            [discountKey]: !prevDiscounts[discountKey]
        }));
    }


    const getProductsByBarcode = (barcode) =>{
        const item = _products.filter(item=>item.barcode.toString() === barcode)
       if(item.length===1){
           addToCart(item[0]);
       } else {
           return  setProducts(filterProductsByBarcode(_products,barcode));
       }
    };

    const addToCart = (product) => {
        setCart(currentCart => {
            const productIndex = currentCart.findIndex(item => item.id === product.id);

            if (productIndex > -1) {
                const updatedCart = [...currentCart];
                updatedCart[productIndex] = {
                    ...updatedCart[productIndex],
                    quantity: updatedCart[productIndex].quantity + 1
                };
                return updatedCart;
            } else {
                return [...currentCart, { ...product, quantity: 1, discountedPrice: 0}];
            }
        });
    };

    const decreaseQuantityById = (id) => {
        setCart(currentCart => currentCart.map(item =>
            item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
        ));
    };

    const increaseQuantityById = (id) => {
        setCart(currentCart => currentCart.map(item =>
            item.id === id && item.quantity < item.stock ? { ...item, quantity: item.quantity + 1 } : item
        ));
    };

    const removeFromCartById = (id) => {
        setCart(currentCart => currentCart.filter(item => item.id !== id));
    };

    const updateDiscountedPrices = () => {
        const updatedCart = cart.map(item => {
            if (item.campaign) {
                switch (item.campaign) {
                    case 'buy3pay2':
                        item.discountedPrice = applyBuy3Pay2(item.price,item.quantity,discounts.buy3pay2);
                        break;
                    case 'studentTaxFree':
                        if (discounts.studentTaxFree){
                            if (!item.discountedPrice ){
                                item.discountedPrice = applyStudentTaxFree(item.price,item.tax,discounts.studentTaxFree);
                                item.tax = 0;
                                item.quantity = 1;
                            }
                            else{
                                item.quantity = 1;
                            }
                        }
                        break;
                    case '-20%':
                        item.discountedPrice = applyPerCentDiscount(item.price,20,discounts.percentageDiscounts);
                        break;
                    default:
                }
            }
            return item;
        });
        setCart(updatedCart);
    };
    const totalCampaignQuantity = cart.filter(item=>item.campaign).map(item=>item.quantity).reduce((acc,quantity)=>acc+quantity,0)
    React.useEffect(() => {
        updateDiscountedPrices();
    }, [totalCampaignQuantity,discounts]);

    const totalQuantity = cart.map(item=>item.quantity).reduce((acc,quantity)=>acc+quantity,0)
    React.useEffect(() => {
        const { subtotal, total } = calculateSubtotalAndTotal(cart);
        setTotal(total);
        setSubTotal(subtotal);
    }, [totalQuantity,discounts]);


    React.useEffect(() => {
        getCategories()
            .then(response => setCategories(response.data))
            .catch(error => console.log(error));
        getSubCategories()
            .then(response =>{ _setSubCategories(response.data);setSubCategories(response.data)})
            .catch(error => console.log(error));
        getProducts()
            .then(response =>{_setProducts(response.data);setProducts(response.data)})
            .catch(error => console.log(error));
    }, []);


    React.useEffect(() => {
        if (selectedMap.category && !selectedMap.subcategory) {
            setSubCategories(filterSubcategories(_subCategories, selectedMap.category))
            setProducts(filterProducts(_products, selectedMap.category))
        } else if (selectedMap.category && selectedMap.subcategory) {
            setProducts(filterProducts(_products, selectedMap.category, selectedMap.subcategory))
        } else if (!selectedMap.category && selectedMap.subcategory) {
            setSubCategories(_subCategories)
            setProducts(filterProducts(_products, null, selectedMap.subcategory))
        } else {
            setSubCategories(_subCategories);
            setProducts(_products);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedMap]);


    return (<CartContext.Provider
            value={{
                categories,
                subCategories,
                products,
                total,
                subTotal,
                cart,
                discounts,
                updateSelectedMap,
                getProductsByBarcode,
                addToCart,
                decreaseQuantityById,
                increaseQuantityById,
                removeFromCartById,
                toggleDiscounts
            }}
        >
            {children}
        </CartContext.Provider>);
};

export default CartContext;
export {CartProvider};
