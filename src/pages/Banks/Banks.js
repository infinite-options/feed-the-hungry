import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
  useHistory ,
  withRouter
} from "react-router-dom";
import Icons from "components/Icons/Icons";

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
  const day = getNextDay();
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
                <figure className="image is-48x48">
                  <img src={bank.fb_logo} alt="Placeholder image"></img>
                </figure>
              </div>
              <div className="media-content">
                <p className="title is-6 has-text-grey-dark">
              
                    {bank.fb_name}
                 
                </p>
                <p className="subtitle has-font-13 has-text-grey">
                  {" "}
                  {bank.foodbank_address}
                </p>
              </div>
            </div>
            <div className="content">
              <div className="columns is-mobile">
                <div className="column is-6">
                  <p className="subtitle has-font-13 no-overflow">Hours</p>
                  <p className="subtitle has-font-13 is-bold no-overflow">
                    {/* <span className="days">{day}</span> */}
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
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
export default withRouter(Banks);
