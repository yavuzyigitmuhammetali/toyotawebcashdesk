import React from 'react';
import "./receipt.css"

function Receipt() {
    return (
            <div className="receipt-container">
                <div className="receipt-header">
                    <h1 style={{fontSize:"2em"}}>Lorem İpsum</h1>
                    <div>Mağaza Numarası:1001(Web)</div>
                    <div>Kasa Numarası: 1</div>
                    <div>Fiş Numarası: 797b5fbc-68ad-40af-b393-3a3808ec2e97</div>
                    <div className="receipt-header-time">
                        <span>Fiş Tarih: </span>
                        <span>Fiş Saat: </span>
                    </div>
                </div>

                <div className="receipt-main">
                    <div className="receipt-product">
                        <span style={{justifyContent: "left"}}>uzuzn ve kalitleri çelik halat</span>
                        <span>5 adet</span>
                        <span>%08</span>
                        <span>15.05$</span>
                    </div>
                    <div className="receipt-product">
                        <span style={{justifyContent: "left"}}>uzuzn ve </span>
                        <span>500 adet</span>
                        <span>%8</span>
                        <span>15.05$</span>
                    </div>

                    <div className="receipt-product">
                        <span style={{justifyContent: "left"}}>uzuzn ve </span>
                        <span>5 adet</span>
                        <span>%08</span>
                        <span>150000000.05$</span>
                    </div>


                    <div className="receipt-product">
                        <span style={{justifyContent: "left"}}>uzuzn ve </span>
                        <span>5 adet</span>
                        <span>%08</span>
                        <span>15.05$</span>
                    </div>

                    <div className="receipt-product">
                        <span style={{justifyContent: "left"}}>uzuzn ve </span>
                        <span>5 adet</span>
                        <span>%08</span>
                        <span>15.05$</span>
                    </div>

                    <div className="receipt-product">
                        <span style={{justifyContent: "left"}}>uzuzn ve </span>
                        <span>5 adet</span>
                        <span>%08</span>
                        <span>15.05$</span>
                    </div>


                </div>
                <div className="receipt-footer">
                    <hr/>
                    <div><span>TPLKDV:</span> <span>*55.25$</span></div>
                    <div><span>TOPLAM:</span> <span>*1200.00$</span></div>
                    <hr/>
                    <br/>
                    <h3 style={{fontSize: "1.5em"}}>Ödeme</h3>
                    <hr/>
                    <div><span>Kart</span> <span>*1200.00$</span></div>
                    <hr/>
                    <div><span>Kart</span> <span>*1200.00$</span></div>
                    <hr/>
                    <div><span>Nakit</span> <span>*1200.00$</span></div>
                    <hr/>
                    <br/>
                    <div><span>ÖDENTPLM:</span> <span>*1200.00$</span></div>
                    <div><span>PARAÜSTÜ:</span> <span>*1200.00$</span></div>
                </div>
                <h2 style={{
                    textAlign: "center",
                    fontSize: "1.5em",position:"absolute",bottom:0,left:"50%",transform: "translate(-50%, -50%)"}}>TEŞEKKÜRLER</h2>
            </div>
    );
}

export default Receipt;