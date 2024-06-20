import React, {useMemo} from "react";
import PropTypes from "prop-types";
import styles from "./Receipt.module.css";
import {convertToDateFormat} from "./functions";
import {defaultReceipt} from "./data";
import translations from './lang.json';

const maskName = (name) => name.split(' ').map((n) => n[0] + n.slice(1).replace(/./g, '*')).join(' ');

const Receipt = ({storeName, logo, unstyled, data, language}) => {
    const validatedData = useMemo(() => {
        return {
            ...defaultReceipt,
            ...data,
            cart: data.cart?.length ? data.cart.map(item => ({...defaultReceipt.cart[0], ...item})) : defaultReceipt.cart,
            transactions: data.transactions?.length ? data.transactions.map(item => ({...defaultReceipt.transactions[0], ...item})) : defaultReceipt.transactions,
        };
    }, [data]);

    const {day, time} = convertToDateFormat(validatedData.date, language);

    const containerClass = `${styles.receiptContainer} ${unstyled ? styles.receiptUnstyled : ""}`;
    const imgClass = `${styles.receiptImg} ${unstyled ? styles.receiptImgUnstyled : ""}`;

    return (
        <div className={containerClass}>
            <img
                alt=""
                className={imgClass}
                src={logo}
            />
            {!validatedData.active && <div className={styles.receiptRefund}>{translations[language].refund}</div>}
            <div className={styles.receiptHeader}>
                <h1 style={{fontSize: "2em"}}>{storeName}</h1>
                <div>{translations[language].storeNumber}: {validatedData.storeNumber}</div>
                <div>{translations[language].caseNumber}: {validatedData.case}</div>
                <div className={styles.receiptHeaderTime}>
                    <span>{translations[language].cashierName}: {maskName(validatedData.cashierName)}</span>
                    <span>{translations[language].cashierNumber}: {validatedData.cashierNumber.toString().padStart(4, '0')}</span>
                </div>
                <div>{translations[language].receiptNumber}: {validatedData.receiptNumber}</div>
                <div className={styles.receiptHeaderTime}>
                    <span>{translations[language].receiptDate}: {day}</span>
                    <span>{translations[language].receiptTime}: {time}</span>
                </div>
            </div>

            <div className={styles.receiptMain}>
                {validatedData.cart.map((item, key) => (
                    <div key={key} className={styles.receiptProduct}>
                        <span style={{justifyContent: "left"}}>{item.name}</span>
                        <span>{item.quantity} {item.fraction ? translations[language].lbs : translations[language].pcs}</span>
                        <span>%{item.tax < 10 ? "0" + item.tax : item.tax.toString()}</span>
                        <span>{item.discountedPrice ? (item.discountedPrice * item.quantity).toFixed(2) : (item.price * item.quantity).toFixed(2)}$</span>
                    </div>
                ))}
            </div>

            <div className={styles.receiptFooter}>
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

            <h2 className={styles.receiptThanks}>{translations[language].thanks}</h2>
        </div>
    );
}

Receipt.propTypes = {
    storeName: PropTypes.string,
    logo: PropTypes.string,
    unstyled: PropTypes.bool,
    data: PropTypes.object,
    language: PropTypes.string
};

Receipt.defaultProps = {
    storeName: "Lorem Ipsum",
    logo: "",
    unstyled: true,
    data: {},
    language: "en"
};

export default Receipt;
