import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
} from "react-router-dom";
import API from '../API/API';
import './styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Icons from '../icons/Icons';

function Banks() {
    return (
        <div className="banks-page-bd">
            <div className="columns">
                <div className="column is-7">
                    <div className="bank-list">
                        <RenderListOfBanks />
                    </div>
                </div>
                <div className="column is-5 has-no-padding has-shadow">
                    <div className="big-map sticky">
                        <img class="has-shadow" src="https://www.skmlifestyle.com/wp-content/uploads/2017/05/Beijing_Travel_Map.png" alt=""></img>
                    </div>
                </div>         
            </div>
        </div>
    );
}

// render list of banks
function RenderListOfBanks() {
    const list = API.DataLoader();
    const banks = API.RemoveDuplicatesBy('foodbank_id', list);
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
                                    <p className="subtitle is-7">Tomorrow's Availability</p>
                                    <div className="field is-grouped is-grouped-multiline">
                                        <div className="control">
                                            <span className="subtitle is-6 days">
                                                {day}
                                            </span>
                                        </div>
                                        <div className="control">         
                                            <span className="subtitle is-6 hours">
                                                {bank[day.toLowerCase()]}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div class="column is-3">                                  
                                    <p className="subtitle is-7">Delivery</p>
                                    <span className="icon tooltip">
                                        <img src={Icons.Delivery} alt=""></img>
                                        <span class="tooltiptext">Delivery is available</span>
                                    </span>
                                </div>
                                <div className="column is-3">
                                    <p className="subtitle is-7">Pickup</p>
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

export default Banks;