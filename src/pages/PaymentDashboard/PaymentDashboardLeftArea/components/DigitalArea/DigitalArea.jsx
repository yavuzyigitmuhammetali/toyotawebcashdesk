import React, {useEffect, useRef} from 'react';
import "./digitalArea.css";
import Typewriter from "../Typewriter";
import {useTranslation} from "react-i18next";

function DigitalArea({dark = false, totalPrice = 2000, data = []}) {
    const scrollRef = useRef(null);
    const {t} = useTranslation();

    const amountPaid = data.reduce((total, item) => total + item.price, 0);
    const amountRemaining = Math.max(0, totalPrice - amountPaid);
    const change = Math.max(0, amountPaid - totalPrice);

    useEffect(() => {
        if (scrollRef.current) {
            const timeout = setTimeout(() => {
                scrollRef.current.scrollTop = scrollRef.current.scrollHeight + 200;
            }, 1);

            return () => clearTimeout(timeout);
        }
    }, [amountPaid]);


    return (
        <div className={`digital-area-container ${dark ? 'dark' : ''}`}>
            <div>
                <Typewriter className="total-price" speed={100}>{totalPrice.toFixed(2).toString() + "$"}</Typewriter>
                <Typewriter className="dots"
                            speed={20}>................................................................................</Typewriter>
            </div>
            <div className="digital-area-scroll" ref={scrollRef}>
                {data.map((item, key) => <Typewriter key={key} className="item" speed={100}>
                    {(item.type === "card" ? "💳" : "💵") + " " + item.price.toFixed(2).toString() + "$ " + (item.type === "card" ? t('paidWithCard') : t('paidInCash'))}
                </Typewriter>)}
            </div>
            <div>
                <Typewriter className="dots"
                            speed={20}>................................................................................</Typewriter>
                <div>
                    <Typewriter span className="amount" speed={100}>{t('paidAmount') + ": "}</Typewriter>
                    <Typewriter span className="amount"
                                speed={100}>{amountPaid.toFixed(2).toString() + "$"}</Typewriter>
                </div>
                <div>
                    <Typewriter span className="amount" speed={100}>{t('remainingAmount') + ": "}</Typewriter>
                    <Typewriter span className="amount"
                                speed={100}>{amountRemaining.toFixed(2).toString() + "$"}</Typewriter>
                </div>
                {change ? <Typewriter className="change"
                                      speed={100}>{t('change') + ": " + change.toFixed(2).toString() + "$"}</Typewriter> : null}
            </div>
        </div>
    );
}

export default DigitalArea;