import React from "react";
import "./receipt.css";
import {convertToDateFormat} from "./functions";
import {defaultReceipt} from "./data";
import translations from './lang.json';

function Receipt({storeName = "Lorem Ipsum", data = {}, language = "en"}) {
    const defaultData = defaultReceipt;

    const validatedData = {
        ...defaultData,
        ...data,
        cart: data.cart && data.cart.length > 0
            ? data.cart.map((item) => ({...defaultData.cart[0], ...item}))
            : defaultData.cart,
        transactions: data.transactions && data.transactions.length > 0
            ? data.transactions.map((item) => ({...defaultData.transactions[0], ...item}))
            : defaultData.transactions,
    };

    const {day, time} = convertToDateFormat(validatedData.date, language);

    return (
        <div className="receipt-container">
            {!validatedData.active && <div className="receipt-refund">{translations[language].refund}</div>}
            <div className="receipt-header">
                <h1 style={{fontSize: "2em"}}>{storeName}</h1>
                <div>{translations[language].storeNumber}: {validatedData.storeNumber}</div>
                <div>{translations[language].caseNumber}: {validatedData.case}</div>
                <div className="receipt-header-time">
                    <span>{translations[language].cashierName}: {validatedData.cashierName.split(' ').map((name) => name[0] + name.slice(1).replace(/./g, '*')).join(' ')}</span>
                    <span>{translations[language].cashierNumber}: {validatedData.cashierNumber.toString().padStart(4, '0')}</span>
                </div>
                <div>{translations[language].receiptNumber}: {validatedData.receiptNumber}</div>
                <div className="receipt-header-time">
                    <span>{translations[language].receiptDate}: {day}</span>
                    <span>{translations[language].receiptTime}: {time}</span>
                </div>
            </div>

            <div className="receipt-main">
                {validatedData.cart.map((item, key) => (
                    <div key={key} className="receipt-product">
                        <span style={{justifyContent: "left"}}>{item.name}</span>
                        <span>{item.quantity} {item.fraction ? translations[language].lbs : translations[language].pcs}</span>
                        <span>%{item.tax < 10 ? "0" + item.tax : item.tax.toString()}</span>
                        <span>{item.discountedPrice ? (item.discountedPrice * item.quantity).toFixed(2) : (item.price * item.quantity).toFixed(2)}$</span>
                    </div>
                ))}
            </div>

            <div className="receipt-footer">
                <hr/>
                <div>
                    <span>{translations[language].totalTax}:</span> <span>*{validatedData.totalTax.toFixed(2)}$</span>
                </div>
                <div>
                    <span>{translations[language].total}:</span> <span>*{validatedData.total.toFixed(2)}$</span>
                </div>
                <hr/>
                <br/>
                <h3 style={{fontSize: "1.5em"}}>{translations[language].transactions}</h3>
                {validatedData.transactions.map((item, key) => (
                    <React.Fragment key={key}>
                        <hr/>
                        <div>
                            <span>
                                {item.type === "cash"
                                    ? translations[language].cash
                                    : item.type === "card"
                                        ? translations[language].card
                                        : item.type === "payback"
                                            ? translations[language].payback
                                            : item.type}
                            </span>
                            <span>*{item.price.toFixed(2)}$</span>
                        </div>
                    </React.Fragment>
                ))}
                <hr/>
                <br/>
                <div>
                    <span>{translations[language].amountPaid}:</span>
                    <span>*{validatedData.amountPaid.toFixed(2)}$</span>
                </div>
                <div>
                    <span>{translations[language].change}:</span> <span>*{validatedData.change.toFixed(2)}$</span>
                </div>
            </div>

            <h2 className="receipt-thanks">{translations[language].thanks}</h2>
        </div>
    );
}

export default Receipt;