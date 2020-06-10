import React from 'react';
import Icons from 'components/Icons/Icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LeafletMap from 'components/Map/LeafletMap';
import BankSchedule from 'pages/Bank/BankSchedule';
function BankBanner({obj}){
    return (
        <section className="hero">
            <div className="bank-banner">
                <div className="bank-banner-left">
                    <div className="bank-banner-info">
                        <figure className="image bank-logo is-96x96">
                            <img src={obj.logo} alt=""></img>
                        </figure> 
                        <div className="bank-info-wrapper has-no-margin">
                        <h1 className="title bank-title is-5">{obj.name} </h1>
                        </div>
                        <div className="bank-info-wrapper no-overflow">
                            <span className="icon icon-wrapper">
                                <FontAwesomeIcon icon={Icons.faMapMarkerAlt} style={{ fontSize: 18 }}/>
                            </span>
                            <h6 className="subtitle is-bold bank-address has-font-13">{obj.address}</h6>
                        </div>
                        <div className="bank-info-wrapper">
                            <span className="icon icon-wrapper">
                                <FontAwesomeIcon icon={Icons.faClock} style={{fontSize: 18 }} />
                            </span>
                            <BankSchedule obj={obj}/>
                        </div>
                    </div>
                </div>
                <div className="bank-banner-right"> 
                    <LeafletMap/>              
                </div>
            </div>
        </section>
    );
}
export default BankBanner;