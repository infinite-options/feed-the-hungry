import React from "react";
import LeafletMap from 'components/Map/LeafletMap';
import Banks from 'pages/Banks/Banks';

function BanksLayout({banks}){
    return (
        <div className="banks-page-bd">
            <div className="columns">
                <div className="column is-7">
                    <div className="bank-list">
                        <Banks banks={banks} />
                    </div>
                </div>
                <div className="column is-5 has-no-padding has-shadow">
                    <div className="sticky">
                        <LeafletMap banks={banks}/>
                    </div>              
                </div>         
            </div>
        </div>
    );
}


export default BanksLayout;