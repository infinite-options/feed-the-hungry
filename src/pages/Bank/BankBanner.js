import React from "react";
import Icons from "components/Icons/Icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LeafletMap from "components/Map/LeafletMap";
import BankSchedule from "pages/Bank/BankSchedule";
import useMarker from 'components/Hooks/useMarker';
import {withRouter } from "react-router-dom";
import RoomOutlinedIcon from '@material-ui/icons/RoomOutlined';
import ScheduleOutlinedIcon from '@material-ui/icons/ScheduleOutlined';

function BankBanner({ obj }) {
  const marker  = useMarker();
  return (
    <section className="hero">
      {/* Food Bank's Banner */}
      
        <div className="bank-banner">
          <div className="columns" style={{margin:0}}>
          <div className="column has-no-padding">

          <div className="bank-banner-info">
          <div className="container">
            {/* Logo */}
            <div className="media">
            <div className="media-left">
            <figure className="image is-64x64">
              <img src={obj.fb_logo} alt=""></img>
            </figure>
            </div>
            <div className="media-content">
            <p className="title bank-title">{obj.fb_name} </p>
            </div>
            </div>
            <div className="divider-25"></div>
            {/* Address */}
            <p>{obj.foodbank_id}</p>
            <div className="bank-info-wrapper" >
              <div className="bank-info-icon">
                <span className="icon">
                  <RoomOutlinedIcon />
                </span>
              </div>
              <div className="bank-info-content no-overflow">
                <p className="title is-6 capitalized is-Nunito">
                  {obj.fb_address1}, {obj.fb_city}, {obj.fb_state} {obj.fb_zipcode} 
                </p>
              </div>
            </div>
            {/* Opening timings */}
            <div className="bank-info-wrapper">
              <BankSchedule obj={obj} />
            </div>
          </div>
          </div>
        </div>
        <div className="column has-no-padding">
          
        <div className="small-map">
          <LeafletMap banks={obj} marker={marker}/>
        </div>
        </div>
        </div>
        {/* </div> */}
      </div>
    </section>
  );
}

export default withRouter(BankBanner);
