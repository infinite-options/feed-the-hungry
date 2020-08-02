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
          {/* <div className="container"> */}
          <div className="columns" style={{margin:0}}>
          <div className="column has-no-padding">
        {/* <div className="container"> */}
        {/* <div className="bank-banner-left"> */}
          <div className="bank-banner-info">
            {/* Logo */}
            <figure className="image is-96x96">
              <img src={obj.fb_logo} alt=""></img>
            </figure>
            <div className="bank-info-wrapper has-no-margin" >
              <p className="title bank-title">{obj.fb_name} </p>
            </div>
            <div className="divider-25"></div>
            {/* Address */}
            <div className="bank-info-wrapper" >
              <div className="bank-info-icon">
                <span className="icon">
                  <RoomOutlinedIcon />
                  {/* <img
                    src={Icons.RoomOutlinedIcon}
                    
                  /> */}
                </span>
              </div>
              <div className="bank-info-content no-overflow">
                <p className="subtitle bank-address">
                  {obj.foodbank_address}
                </p>
              </div>
            </div>
            {/* Opening timings */}
            <div className="bank-info-wrapper">
              <div className="bank-info-icon">
                <span className="icon">
                  <ScheduleOutlinedIcon />
                  {/* <FontAwesomeIcon
                    icon={Icons.faClock}
                    style={{ fontSize: 16 }}
                  /> */}
                </span>
              </div>
              <BankSchedule obj={obj} />
            </div>
          {/* </div> */}
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
