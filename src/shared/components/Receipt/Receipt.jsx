import React from 'react';
import "./receipt.css"

function Receipt() {
    return (
            <div className="responsive-receipt-container">
                <div className="responsive-receipt-header">
                    <h1 style={{fontSize:"2em"}}>Lorem İpsum</h1>
                    <div>Mağaza numarası:1001(Web)</div>
                    <div>Kasa Numarası: 1</div>
                    <div>Fiş Numarası: 797b5fbc-68ad-40af-b393-3a3808ec2e97</div>
                    <div className="responsive-receipt-header-time">
                        <span>Fiş Tarih: </span>
                        <span>Fiş Saat: </span>
                    </div>
                </div>
                <div className="responsive-receipt-main">
                    <div className="responsive-receipt-product">
                        <span>uzuzn ve kalitleri çelik halat</span>
                        <span>5 adet</span>
                        <span>%08</span>
                        <span>15.05$</span>
                    </div>
                    <div className="responsive-receipt-product">
                        <span>uzuzn ve kalitleri çelik halat</span>
                        <span>5 adet</span>
                        <span>%08</span>
                        <span>15.05$</span>
                    </div>
                </div>
                <div className="responsive-receipt-footer">
                    <div>------------------------------------------------------</div>
                    <div><span>TOPLAMKDV:</span> <span>*55.25$</span></div>
                    <div><span>ARATOPLAM:</span> <span>*1200.00$</span></div>
                    <div>------------------------------------------------------</div>
                    <div><span>TOPLAM:</span> <span>*1200.00$</span></div>
                    <br/>
                    <h3 style={{fontSize:"1.5em"}}>Ödeme</h3>
                    <div>------------------------------------------------------</div>
                    <div><span>Kart</span> <span>*1200.00$</span></div>
                    <div>------------------------------------------------------</div>
                    <div><span>Kart</span> <span>*1200.00$</span></div>
                    <div>------------------------------------------------------</div>
                    <div><span>Nakit</span> <span>*1200.00$</span></div>
                    <div>------------------------------------------------------</div>
                    <div><span>ÖDENTPLM:</span> <span>*1200.00$</span></div>
                    <div><span>PARAÜSTÜ:</span> <span>*1200.00$</span></div>
                </div>
                <br/>
                <br/>
                <h2 style={{textAlign: "center",fontSize:"1.5em"}}>TEŞEKKÜRLER</h2>
            </div>
    );
}

export default Receipt;