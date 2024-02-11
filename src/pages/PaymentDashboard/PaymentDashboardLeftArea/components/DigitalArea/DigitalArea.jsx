import React, {useEffect, useRef} from 'react';
import "./digitalArea.css"
import Typewriter from "../Typewriter";

function DigitalArea({dark = false,totalPrice=2000,data=[]}) {
    const scrollRef = useRef(null);

    const amountPaid = data.reduce((total, item) => total + item.price, 0)
    const amountRemaining = (totalPrice-amountPaid)<0?(0):(totalPrice-amountPaid);
    const change = (totalPrice-amountPaid)<0?(amountPaid-totalPrice):(0);
    useEffect(() => {
        if (scrollRef.current) {
            const timeout = setTimeout(() => {
                scrollRef.current.scrollTop = scrollRef.current.scrollHeight + 200;
            }, 1);

            return () => clearTimeout(timeout);
        }
    }, [amountPaid]);

    return (
        <div style={{borderColor:dark?"white":"black",color:dark?"white":"black"}} className="digital-area-container">
            <div style={{}}>
                <Typewriter style={{fontSize: "3.5em",color:"green"}} speed={100}>{totalPrice.toFixed(2).toString()+"$"}</Typewriter>
                <Typewriter style={{fontSize: "1em"}}
                            speed={20}>................................................................................</Typewriter>
            </div>
            <div className="digital-area-scroll" ref={scrollRef}>
                {data.map((item,key)=><Typewriter key={key} style={{fontSize: "1em"}} speed={100}>
                    {(item.type==="card"?"💳":"💵")+" "+item.price.toFixed(2).toString()+"$ "+(item.type==="card"?"Kart ile ödendi!":"Nakit olarak ödendi!")}
                </Typewriter>)}
            </div>
            <div>
                <Typewriter style={{fontSize: "1em"}}
                            speed={20}>................................................................................</Typewriter>
                <div>
                    <Typewriter span style={{fontSize: "1.3em"}} speed={100}>Ödenen Tutar: </Typewriter>
                    <Typewriter span style={{fontSize: "1.3em"}} speed={100}>{amountPaid.toFixed(2).toString()+"$"}</Typewriter>
                </div>
                <div>
                    <Typewriter span style={{fontSize: "1.3em"}} speed={100}>Kalan Tutar: </Typewriter>
                    <Typewriter span style={{fontSize: "1.3em"}} speed={100}>{amountRemaining.toFixed(2).toString()+"$"}</Typewriter>
                </div>
                {change?<Typewriter style={{fontSize: "1.3em",color:"greenyellow"}} speed={100}>{"Para Üstü: "+change.toFixed(2).toString()+"$"}</Typewriter>:null}
            </div>
        </div>
    );
}

export default DigitalArea;