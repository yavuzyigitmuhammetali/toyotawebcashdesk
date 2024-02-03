import React, {useEffect, useState} from 'react';
import {checkOnline} from "../functions/checkOnline";




function OnlineOfflineIndicator() {
    const [online, setOnline] = useState()

    useEffect(() => {
        const handleOnline = async () => {
            try {
                const result = await checkOnline();
                setOnline(result);
            } catch (error) {
                console.error('Error:', error);
            }
        };
        handleOnline();
    }, []);
    const circleSize = 5;
    return (
        <div style={{display:"inline-block",position: "relative",boxSizing:"border-box",paddingLeft:"10px",userSelect:"none"}}>
            <div style={online ? {color: "green"} : {color: "red"}}>{online ? "Online" : "Offline"}</div>
            <div style={{height:"20px",position:"absolute",left:"0",top:"50%",transform:"translate(-50%, -50%)"}}>
                <svg width="20" height="20">
                    <circle cx="10" cy="10" r={circleSize} fill={online ? "green" : "red"} id="point"/>
                    <circle cx="10" cy="10" r={circleSize} fill="none" stroke={online ? "green" : "red"}
                            strokeWidth="2">
                        <animate attributeName="r" from={circleSize} to={circleSize * 2} dur="1s" begin="0s"
                                 repeatCount="indefinite"/>
                        <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0s" repeatCount="indefinite"/>
                    </circle>
                </svg>
            </div>
        </div>
    );
}

export default OnlineOfflineIndicator;