import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
} from "react-router-dom";
import 'pages/styles.css';
import Icons from 'components/Icons/Icons';
import Notifications from 'components/Notifications/Notifications';
import LeafletMap from 'components/Map/LeafletMap';

function Banks({list}){
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
                        <div className="sticky">
                            <LeafletMap banks={list}/>
                        </div>
                        
                    </div>         
                </div>
            </div>
        );
    } 
    return (
        <div className="banks-page-bd">
            {Notifications.Warning("Loading Data...")}
        </div>
    );
}

// render list of banks
function RenderListOfBanks({banks}) {
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
                <div key={bank.id} className="card bank-card">
                    <div className="card-content">
                        <div className="media">
                            <div className="media-left">
                                <figure className="image is-48x48">
                                    <img src={bank.logo} alt="Placeholder image"></img>
                                </figure>
                            </div> 
                            <div className="media-content">
                                <p className="title is-5"><Link to={`/banks/${bank.id}`} className="has-text-grey-dark link-to-bank">{bank.name} (0.5 miles)</Link></p>
                                <p className="subtitle has-font-13 has-text-grey"> {bank.address}</p>
                            </div>
                        </div>
                        <div className="content">
                            <div className="columns is-mobile">
                                <div className="column is-6">
                                    <p className="subtitle has-font-13 no-overflow">Hours</p>
                                    <p className="subtitle has-font-13 is-bold no-overflow">
                                        <span className="days">{day}</span>
                                        <span className="hours">{bank[day.toLowerCase()]}</span>
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
                                        <img className="not-available" src={Icons.Pickup} alt=""></img>
                                        <span className="tooltiptext">Pickup is not available</span>
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
export default Banks;