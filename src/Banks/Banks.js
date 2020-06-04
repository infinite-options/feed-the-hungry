import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
} from "react-router-dom";
import '../styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Icons from '../icons/Icons';
import { Map, TileLayer, Marker, Popup, L, MapLayer } from 'react-leaflet';
import { geolocated } from 'react-geolocated';
import Notifications from '../Notifications/Notifications';

// use San Jose, CA as the default center
const DEFAULT_LATITUDE = 37.338208;
const DEFAULT_LONGITUDE = -121.886329;

class Banks extends React.Component {
    render(){
        // get browser's current latitude and longitude
        const latitude = this.props.coords ? this.props.coords.latitude:  DEFAULT_LATITUDE;
        const longitude = this.props.coords ? this.props.coords.longitude: DEFAULT_LONGITUDE;
        const list = this.props.list;
        if (list.length > 0){ 
            return (
                <div className="banks-page-bd">
                    <div className="columns">
                        <div className="column is-7">
                            <div className="bank-list">
                                <RenderListOfBanks banks={list} />
                            </div>
                        </div>
                        <div className="column is-5 has-no-padding has-shadow">
                            <RenderMap props={this.props} userPos={[latitude, longitude]} />
                        </div>         
                    </div>
                </div>
            );
        } 
        return (
            <div className="banks-page-bd">
                {Notifications.Danger("ERROR: Cannot fetch data")}
            </div>
        );
    }
}

// render list of banks
function RenderListOfBanks({banks}) {
  
    // const banks = API.RemoveDuplicatesBy('foodbank_id', list);
    function getNextDay(){ // get next day
        var d = new Date();
        var weekday = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
        var n = weekday[d.getDay()];
        return n;
    }
    var day = getNextDay();
    return (
        <div className="banks">
            {banks.map((bank) => 
                <div key={bank.foodbank_id} className="card bank-card">
                    <div className="card-content">
                        <div className="media">
                            <div className="media-left">
                                <figure className="image is-48x48">
                                    <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image"></img>
                                </figure>
                            </div> 
                            <div className="media-content">
                                <p className="title is-5"><Link to={`/banks/${bank.foodbank_id}`} className="has-text-grey-dark link-to-bank">{bank.foodbank_name} (0.5 miles)</Link></p>
                                <p className="subtitle is-7 has-text-grey"> {bank.address}</p>
                            </div>
                        </div>
                        <div className="content">
                            <div class="columns is-mobile">
                                <div class="column is-6">
                                    <p className="subtitle is-7 no-overflow">Tomorrow's Availability</p>
                                    <p className="subtitle is-6 is-bold no-overflow">
                                        <span className="days">{day}</span>
                                        <span className="hours">{bank[day.toLowerCase()]}</span>
                                    </p>
                                </div>
                                <div class="column is-3">                                  
                                    <p className="subtitle is-7  no-overflow">Delivery</p>
                                    <span className="icon tooltip">
                                        <img src={Icons.Delivery} alt=""></img>
                                        <span class="tooltiptext">Delivery is available</span>
                                    </span>
                                </div>
                                <div className="column is-3">
                                    <p className="subtitle is-7  no-overflow">Pickup</p>
                                    <span className="icon tooltip">
                                        <img class="not-available" src={Icons.Pickup} alt=""></img>
                                        <span class="tooltiptext">Pickup is not available</span>
                                    </span> 
                                </div>                           
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
   
}
function RenderMap({props,userPos}){
    return ( 
        <div className="sticky">
            <Map center={userPos} zoom={13}> 
              
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                />
                <Marker position={[37.3164077, -121.8747172]}>
                    <Popup>37.3164077,-121.8747172</Popup>
                </Marker>
                {
                    !props.coords ?
                    <div className="loading">Cannot load current location.</div>
                    :
                    <Marker position={userPos}>
                        <Popup>{userPos[0]},{userPos[1]}</Popup>
                    </Marker>
                
                }                           
            </Map>
        </div>
    );
}
export default geolocated({
    // positionOptions: {
    //     enableHighAccuracy: false
    // },
    userDecisionTimeout: 10000
})(Banks);
// export default Banks;