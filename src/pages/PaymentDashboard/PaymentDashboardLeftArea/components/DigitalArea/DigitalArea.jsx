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

    const renderTypewriter = (className, text, speed = 100, span = false) => (
        <Typewriter className={className} speed={speed} span={span}>{text}</Typewriter>
    );

    return (
        <div className={`digital-area-container ${dark ? 'dark' : ''}`}>
            <div>
                {renderTypewriter("total-price", totalPrice.toFixed(2).toString() + "$")}
                {renderTypewriter("dots", ".......................................................................................................", 20)}
            </div>
            <div className="digital-area-scroll" ref={scrollRef}>
                {data.map((item, key) => renderTypewriter("item",
                    (item.type === "card" ? "💳" : "💵") + " " + item.price.toFixed(2).toString() + "$ " + (item.type === "card" ? t('paidWithCard') : t('paidInCash')), 100, false, key))}
            </div>
            <div>
                {renderTypewriter("dots", ".......................................................................................................", 20)}
                <div>
                    {renderTypewriter("amount", t('paidAmount') + ": ", 100, true)}
                    {renderTypewriter("amount", amountPaid.toFixed(2).toString() + "$", 100, true)}
                </div>
                <div>
                    {renderTypewriter("amount", t('remainingAmount') + ": ", 100, true)}
                    {renderTypewriter("amount", amountRemaining.toFixed(2).toString() + "$", 100, true)}
                </div>
                {change ? renderTypewriter("change", t('change') + ": " + change.toFixed(2).toString() + "$") : null}
            </div>
        </div>
    );
}

export default DigitalArea;
