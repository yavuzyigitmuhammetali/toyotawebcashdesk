import React from 'react';


function OnlineOfflineIndicator({online = true, circleSize = 5}) {
    return (
        <div style={{display:"inline-block",position: "relative",boxSizing:"border-box",paddingLeft:"10px"}}>
            <div style={online ? {color: "green"} : {color: "red"}}>{online ? "Online" : "Offline"}</div>
            <div style={{height:"100px",position:"absolute",left:"0",top:"50%",transform:"translate(-50%, -50%)"}}>
                <svg width="100" height="100">
                    <circle cx="50" cy="50" r={circleSize} fill={online ? "green" : "red"} id="point"/>
                    <circle cx="50" cy="50" r={circleSize} fill="none" stroke={online ? "green" : "red"}
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