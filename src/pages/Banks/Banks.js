import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
  useHistory,
  withRouter,
} from "react-router-dom";
import Icons from "components/Icons/Icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Distance from 'utils/Distance';

function Banks({ marker, banks }) {
  const history = useHistory();
  function getNextDay() {
    // get next day
    var d = new Date();
    var week = [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
    ];
    return week[d.getDay()];
  }

  const user = JSON.parse(window.localStorage.getItem('userInfo'));
  const dist = (lat,lon) =>{
  return Math.round(Distance(user.position[0],user.position[1],lat,lon,"M") * 10) / 10;}
  
  return (
    <div className="banks">
      {banks.map((bank) => (
        <div
          key={bank.foodbank_id}
          className="card bank-card"
          onMouseEnter={() => marker.setActiveMarker(bank.foodbank_id)}
          onMouseLeave={() => marker.setActiveMarker("")}
          onClick={() => history.push(`/banks/${bank.foodbank_id}/products`)}
        >
          <div className="card-content">
            <div className="media">
              <div className="media-left">
                <figure className="image is-64x64">
                  {/* <div className="bank-card-logo"> */}
                  <img src={bank.fb_logo} alt="Bank's Logo"></img>
                  {/* </div> */}
                </figure>
              </div>
              <div className="media-content">
                <div className="columns is-variable is-1-mobile is-8-desktop has-no-margin">
                  <div className="column is-6">
                    <div className="media-content-text">
                      <p className="title bank-card-title">{bank.fb_name}</p>
                      {/* <p className="subtitle is-Nunito has-text-grey" style={{fontSize: '14px'}}>{bank.fb_city}, {bank.fb_state} */}

                      {/* </p> */}
                    </div>
                  </div>
                  <div className="column">
                    <span style={{fontWeight:'600'}}>{dist(bank.fb_latitude, bank.fb_longitude)} miles</span><br></br>
                    <p
                      className="subtitle is-Nunito"
                      style={{ fontSize: "14px" }}
                    >
                      <span className="has-text-grey">in </span>
                      <span style={{fontWeight:'600'}}>
                         {bank.fb_city}, {bank.fb_state}
                      </span>
                    </p>
                  </div>
                  <div className="column" style={{paddingRight:'0'}}>
                    <div className="tags">
                      {bank.fb_delivery === 1 && (
                        <div className="tag is-success is-light">
                          <span className="icon">
                            <FontAwesomeIcon icon={Icons.faCircle} />
                          </span>
                          <span style={{ fontWeight: "600" }}>Delivery</span>
                        </div>
                      )}
                      {bank.fb_pickup === 1 && (
                        <div className="tag is-warning is-light">
                          <span className="icon">
                            <FontAwesomeIcon icon={Icons.faCircle} />
                          </span>
                          <span style={{ fontWeight: "600" }}>Pickup</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* <div className="divider-24"></div> */}

                {/* <div className="buttons are-small" style={{ marginBottom: 0 }}>
                  <button
                    className="button delivery-btn"
                    style={
                      bank.fb_delivery === 1
                        ? { visibility: "visible" }
                        : { visibility: "hidden" }
                    }
                  >
                    Delivery
                  </button>

                  <button
                    className="button pickup-btn"
                    style={
                      bank.fb_pickup === 1
                        ? { visibility: "visible" }
                        : { visibility: "hidden" }
                    }
                  >
                    Pick Up
                  </button>
                </div> */}
                {/* <Link to={`banks/${bank.foodbank_id}/products`}><button className="button is-small is-success start-order-btn">Start Order</button></Link> */}
              </div>
            </div>
            {/* <div className="content">
              <div className="columns is-mobile">
                <div className="column is-6">
                  <p className="subtitle has-font-13 no-overflow">Hours</p>
                  <p className="subtitle has-font-13 is-bold no-overflow">
                    {bank[`fb_${day}_time`]} 
                  </p>
                </div>
                <div className="column is-3">
                  <p className="subtitle has-font-13  no-overflow">Delivery</p>
                  <span className="icon tooltip">
                    <img src={Icons.Delivery} alt=""></img>
                    <span className="tooltiptext">Delivery is available</span>
                  </span>
                </div>
                <div className="column is-3">
                  <p className="subtitle has-font-13  no-overflow">Pickup</p>
                  <span className="icon tooltip">
                    <img
                      className="not-available"
                      src={Icons.Pickup}
                      alt=""
                    ></img>
                    <span className="tooltiptext">Pickup is not available</span>
                  </span>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      ))}
    </div>
  );
}
export default withRouter(Banks);
