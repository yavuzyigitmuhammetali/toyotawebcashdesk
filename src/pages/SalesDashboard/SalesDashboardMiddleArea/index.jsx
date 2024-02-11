import React, {useContext} from 'react';
import "./salesDashboardMiddleArea.css"
import ShoppingCartItem from "../../../shared/components/ShoppingCartItem/ShoppingCartItem";
import CartContext from "../context";

function SalesDashboardMiddleArea({dark = false}) {


    const {
        cart,
        decreaseQuantityById,
        increaseQuantityById,
        removeFromCartById,
        total:totalPrice,
        subTotal:subTotalPrice
    } = useContext(CartContext);


    return (
        <div style={dark ? {backgroundColor: "#121418", borderColor: "white"} : {}}
             className="sales-dashboard-middle-area-container">
            <div style={{borderColor: dark && "white", backgroundColor: dark ? "#111923" : "white"}}
                 className="sales-dashboard-middle-area-products-scroll">
                <div className="sales-dashboard-middle-area-products">
                    {cart.map((item, key) =>
                        <ShoppingCartItem onAdd={() => increaseQuantityById(item.id)}
                                          onDelete={()=>decreaseQuantityById(item.id)}
                                          onRemove={()=>removeFromCartById(item.id)}
                                          key={key} dark={dark}
                                          campaign={item.campaign.toUpperCase()}
                                          discountedPrice={item.discountedPrice}
                                          price={item.price} index={key + 1} barcode={item.barcode} tax={item.tax}
                                          quantity={item.quantity} productName={item.name}/>
                    )}

                </div>
            </div>
            <div style={dark ? {backgroundColor: "black", color: "white", borderColor: "white"} : {}}
                 className="sales-dashboard-middle-area-texts">
                <div className="sales-dashboard-middle-area-amount">
                    <span>Ara Toplam: </span>
                    <span>{subTotalPrice}$</span>
                </div>
                <hr style={{borderColor: "Background"}}/>
                <div className="sales-dashboard-middle-area-amount">
                    <span>Toplam Tutar</span>
                    <span>{totalPrice}$</span>
                </div>
            </div>
        </div>
    );
}

export default SalesDashboardMiddleArea;