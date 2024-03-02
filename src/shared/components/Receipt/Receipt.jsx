import React from 'react';
import "./receipt.css"
import {convertToDateFormat} from "./functions";
import {defaultReceipt} from "../../state/AppData/defaultData";

function Receipt({
                     storeName = "Lorem Ipsum", data = {}
                 }) {

    const defaultData = defaultReceipt;

    const validatedData = {
        ...defaultData, ...data,
        cart: data.cart && data.cart.length > 0 ? data.cart.map(item => ({
            ...defaultData.cart[0], ...item
        })) : defaultData.cart,
        transactions: data.transactions && data.transactions.length > 0 ? data.transactions.map(item => ({
            ...defaultData.transactions[0], ...item
        })) : defaultData.transactions
    };

    const {day, time} = convertToDateFormat(validatedData.date, "tr")

    return (<div className="receipt-container">
        {!validatedData.active ? <div className="receipt-refund">İADE GÖRMÜŞ</div> : null}
        <div className="receipt-header">
            <h1 style={{fontSize: "2em"}}>{storeName}</h1>
            <div>Mağaza Numarası: {validatedData.storeNumber}</div>
            <div>Kasa Numarası: {validatedData.case}</div>
            <div>Fiş Numarası: {validatedData.receiptNumber}</div>
            <div className="receipt-header-time">
                <span>Fiş Tarih: {day}</span>
                <span>Fiş Saat: {time}</span>
            </div>
        </div>

        <div className="receipt-main">
            {validatedData.cart.map((item, key) => <div key={key} className="receipt-product">
                <span style={{justifyContent: "left"}}>{item.name}</span>
                <span>{item.quantity} adet</span>
                <span>%{item.tax < 10 ? "0" + item.tax : item.tax.toString()}</span>
                <span>{item.discountedPrice ? item.discountedPrice.toFixed(2) : item.price.toFixed(2)}$</span>
            </div>)}
        </div>
        <div className="receipt-footer">
            <hr/>
            <div><span>TPLKDV:</span> <span>*{validatedData.totalTax.toFixed(2)}$</span></div>
            <div><span>TOPLAM:</span> <span>*{validatedData.total.toFixed(2)}$</span></div>
            <hr/>
            <br/>
            <h3 style={{fontSize: "1.5em"}}>İşlemler</h3>
            {validatedData.transactions.map((item, key) => <React.Fragment key={key}>
                <hr/>
                <div>
                    <span>{item.type === "cash" ? "Nakit" : item.type === "card" ? "Kart" : item.type === "payback" ? "Geri Ödeme" : item.type}</span><span>*{item.price.toFixed(2)}$</span>
                </div>
            </React.Fragment>)}
            <hr/>
            <br/>
            <div><span>ÖDENTPLM:</span> <span>*{validatedData.amountPaid.toFixed(2)}$</span></div>
            <div><span>PARAÜSTÜ:</span> <span>*{validatedData.change.toFixed(2)}$</span></div>
        </div>
        <h2 className="receipt-thanks">TEŞEKKÜRLER</h2>
    </div>);
}

export default Receipt;