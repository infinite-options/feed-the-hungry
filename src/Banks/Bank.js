import React, { useState, useEffect }  from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
} from "react-router-dom";
import API from '../API/API'; 
import '../styles.css';
import Icons from '../icons/Icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Notifications from '../Notifications/Notifications';
import LeafletMap from '../Map/LeafletMap';

// display the bank's data on the website.
function Bank({list}) {
    let { bankId } = useParams();
    //Keep a check before using bank's id, name, etc
    if (list.length > 0){
        return (
            <GetBank list={list} bankId={bankId}/>
        );
    }
    return (
        <div className="bank-page-bd">
            {Notifications.Warning("Loading Data...")}
        </div>
    );
}
function GetBank({list, bankId}){
    const bank = API.getBankBy(`${bankId}`, list);
    return (
        <div className="bank-page-bd">
            <BankBanner obj={bank} />
            <section className="bank-body">         
                <div className="columns">
                    <div className="column is-6">
                        <div className="inventory-title">
                            <p className="title is-4">Delivery or Pickup</p>     
                        </div>
                        <BankInventory inventory={bank.inventory} />
                    </div>
                    <div className="column is-6">
                        <div className="inventory-title">
                            <p className="title is-4">Delivery Only</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
// Render Banner
function BankBanner({obj}){
    return (
        <section className="hero banner-image">
            <div className="columns banner-container">
                <div className="column is-6 banner-padded">
                    <figure className="image bank-logo is-96x96">
                        <img src={obj.logo} alt=""></img>
                    </figure> 
                    <div className="bank-info-wrapper">
                    <h1 className="title bank-title">{obj.name} </h1>
                    </div>
                    <div className="bank-info-wrapper no-overflow">
                        <span className="icon icon-wrapper">
                            <FontAwesomeIcon icon={Icons.faMapMarkerAlt} style={{ fontSize: 18 }}/>
                        </span>
                        <h6 className="subtitle bank-address is-6">{obj.address}</h6>
                    </div>
                    <div className="bank-info-wrapper">
                        <span className="icon icon-wrapper">
                            <FontAwesomeIcon icon={Icons.faClock} style={{fontSize: 18 }} />
                        </span>
                        <BankSchedule obj={obj}/>
                    </div>
                </div>
                <div className="column is-6 has-no-padding"> 
                    <div className="small-map">
                        <LeafletMap/>
                    </div>
                    
                </div>
            </div>
        </section>
    );
}
// Render inventory
function BankInventory({inventory}){
    const initialValues  = {};
    inventory.forEach(x => {
        initialValues[x.food_id] = 0;
    })
    const [amount,setAmount] = useState(initialValues);
    function increment(id){
        var value = amount[id];
        if (value >=10) value = 10;
        else {
            value += 1;
        }
        setAmount((prevState) => ({
            ...prevState,
            [id]: value
        }));
    }
    function decrement(id){
        var value = amount[id];
        if (value <= 0) value = 0;
        else {
            value -= 1;
        }
        setAmount((prevState) => ({
            ...prevState,
            [id]: value
        }));
    }
    // convert 1..9 to  01..09
    function pad(d){
        return (d < 10) ? '0' + d.toString() : d.toString();
    }
    return (
        <div className="inventory">
            {inventory.map((item) => 
                <div key={item.food_id} className="item">
                    <div className="columns">
                        <div className="column is-8 flex-center">
                            <div className="item-image-container">
                                <figure className="image is-square">
                                    <img className="is-rounded" src={item.image} alt=""></img>
                                </figure>
                            </div>
                            <div className="item-header">
                                <span className="title is-5">{item.food_name}</span><br></br>
                                <span className="subtitle is-6">1 {item.package_type} ({item.package_weight} {item.unit_type})</span>      
                            </div>
                        </div>
                        <div className="column is-4 flex-center">
                            <div className="item-action">
                                <div className="field is-grouped is-grouped-multiline">
                                    <div className="control">
                                        <button className="button">
                                            <span onClick={() => decrement(item.food_id)} className="icon decrease-qty">
                                                <FontAwesomeIcon icon={Icons.faChevronDown} />
                                            </span>
                                        </button>
                                        
                                    </div>
                                    <div className="control amount">
                                        <span id={item.food_id} className="title is-6">
                                        {pad(amount[item.food_id])}
                                        </span>
                                    </div>
                                    <div className="control">
                                        <div className="button">
                                            <span onClick={() => increment(item.food_id)} className="icon increase-qty">
                                                <FontAwesomeIcon icon={Icons.faChevronUp} />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
function BankSchedule({obj}){
    return (
        <div className="bank-schedule">
            <div className="schedule-days">
                <p className="subtitle is-bold is-6 capitalized">mon</p>
                <p className="subtitle is-bold is-6 capitalized">tue</p>
                <p className="subtitle is-bold is-6 capitalized">wed</p>
                <p className="subtitle is-bold is-6 capitalized">thu</p>
                <p className="subtitle is-bold is-6 capitalized">fri</p>
                <p className="subtitle is-bold is-6 capitalized">sat</p>
                <p className="subtitle is-bold is-6 capitalized">sun</p>
            </div>
            <div className="schedule-hours">
                <p className="subtitle is-6 has-text-grey capitalized">{obj.monday}</p>
                <p className="subtitle is-6 has-text-grey capitalized">{obj.tuesday}</p>
                <p className="subtitle is-6 has-text-grey capitalized">{obj.wednesday}</p>
                <p className="subtitle is-6 has-text-grey capitalized">{obj.thursday}</p>
                <p className="subtitle is-6 has-text-grey capitalized">{obj.friday}</p>
                <p className="subtitle is-6 has-text-grey capitalized">{obj.saturday}</p>
                <p className="subtitle is-6 has-text-grey capitalized">{obj.sunday}</p>
            </div>
        </div>
    );
}
export default Bank;