import React from "react";
import Icons from "components/Icons/Icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LeafletMap from "components/Map/LeafletMap";
import BankSchedule from "pages/Bank/BankSchedule";
function BankBanner({ obj }) {
  return (
    <section className="hero">
      {/* Food Bank's Banner */}
      <div className="bank-banner">
        <div className="bank-banner-left">
          <div className="bank-banner-info">
            {/* Logo */}
            <figure className="image bank-logo is-96x96">
              <img src={obj.logo} alt=""></img>
            </figure>
            <div className="bank-info-wrapper has-no-margin">
              <p className="title bank-title is-5">{obj.name} </p>
            </div>
            {/* Address */}
            <div className="bank-info-wrapper">
              <div className="bank-info-icon">
                <span className="icon">
                  <FontAwesomeIcon
                    icon={Icons.faMapMarkerAlt}
                    style={{ fontSize: 16 }}
                  />
                </span>
              </div>
              <div className="bank-info-content no-overflow">
                <p className="subtitle is-bold bank-address has-font-13">
                  {obj.address}
                </p>
              </div>
            </div>
            {/* Opening timings */}
            <div className="bank-info-wrapper">
              <div className="bank-info-icon">
                <span className="icon">
                  <FontAwesomeIcon
                    icon={Icons.faClock}
                    style={{ fontSize: 16 }}
                  />
                </span>
              </div>
              <BankSchedule obj={obj} />
            </div>
          </div>
        </div>
        <div className="bank-banner-right">
          <LeafletMap banks={obj}/>
        </div>
      </div>
    </section>
  );
}
export default BankBanner;
