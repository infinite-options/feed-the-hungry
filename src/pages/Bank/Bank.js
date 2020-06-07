import React, { useState, useEffect }  from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
} from "react-router-dom";
import BankAPI from 'API/BankAPI'; 
import 'pages/styles.css';
import Icons from 'components/Icons/Icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Notifications from 'components/Notifications/Notifications';
import LeafletMap from 'components/Map/LeafletMap';

// display the bank's data on the website.
function Bank({list}) {
    let { bankId } = useParams();
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
    let { path, url } = useRouteMatch();
    const bank = BankAPI.getBankBy(`${bankId}`, list);
    return (
        <Router>
            <div className="bank-page-bd">
                <div className="bank-container">
                    <BankBanner obj={bank} />
                    <section className="bank-body">         
                        <div className="columns">
                            <div className="column is-6">
                                <div className="inventory-title">
                                    <p className="title is-6 has-text-grey-dark">Delivery or Pickup ({bank.inventory.length})</p>     
                                </div>
                                <Switch>
                                    <Route path={`${path}/:tagName`}>
                                        <FilterInventory inventory={bank.inventory} bankId={bankId}/>
                                    </Route>
                                    <Route exact path={path}>
                                        <BankInventory inventory={bank.inventory} bankId={bankId} />
                                    </Route>
                                </Switch>    
                            </div>
                            <div className="column is-6">
                                <div className="inventory-title">
                                    <p className="title is-6 has-text-grey-dark">Delivery Only</p>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </Router>
    );
}
// Render Banner
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
                            <h6 className="subtitle is-bold bank-address has-font-14">{obj.address}</h6>
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
function FilterInventory({inventory, bankId}){
    let { tagName } = useParams();
    const filteredInventory = BankAPI.GetItemsByTag(inventory, tagName);

    return (
        <BankInventory inventory={filteredInventory} bankId={bankId} />
    );
}
// Render inventory
function BankInventory({inventory, bankId}){
    return (
        <div className="inventory">
            {inventory.map((item) => 
                <div key={item.food_id} className="card item fade-in">
                    <div className="card-content has-no-padding item-content">
                        <div className="item-image-container">
                            <img src={item.image} className="item-image"alt="Placeholder image"></img>
                        </div>
                        <div className="item-info">
                            <p className="item-brand has-text-grey no-overflow">{item.brand}</p>
                            <p className="title is-6 has-text-grey-dark no-overflow">{item.food_name}</p>
                            <p className="subtitle has-font-13 has-text-grey no-overflow">1 {item.unit} ({item.weight})</p>
                            <QuantityInput maxQuantity={item.quantity}/>
                        </div>               
                    </div>
                    <div className="card-footer">
                        <div className="item-price">
                            <span className="subtitle has-font-13 has-text-grey">${item.price}</span>  
                        </div>
                        <div className="item-tags">
                            <SplitTags str={item.type} bankId={bankId} /> 
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
function SplitTags({str, bankId}){
    if (str){ 
        var tags = str.split(';');
        return (
            <div className="tags-container">
                { tags.map(tag => 
                    <Link key={tag} to={`/banks/${bankId}/${tag}`}  className="item-tag subtitle has-margin-left-12" alt="">#{tag}</Link>
                )}
            </div>
        );
    }
    return "";
}
const useCounter = () => {
    const [value, setValue] = useState(0);

    const increase = (event) => {
        event.preventDefault();
        setValue(value + 1);
    }
    const decrease = (event) => {
        event.preventDefault();
        setValue(value - 1);
    }
    const zero = () => {
        setValue(0);
    }
    return {
        value,
        increase,
        decrease,
        zero
    }
}
const useField = (type) => {
    const [value, setValue] = useState('');
    const onChange = (event) => {
        setValue(event.target.value);
    }
    return {
        type,
        value,
        onChange
    }
}
function QuantityInput({maxQuantity}) {
    const counter = useCounter();
    return (
        <div className="field is-grouped is-multiline">
            <div className="control item-actions">
            <button class="button is-small" onClick={counter.decrease}  disabled={counter.value == 0 ? true:false}>-</button>
            <input type="number" className="input is-small" value={counter.value} readOnly/>
            <button class="button is-small" onClick={counter.increase}  disabled={counter.value == maxQuantity ? true:false }>+</button>
            </div>
        </div>
    );
}
function BankSchedule({obj}){
    return (
        <div className="bank-schedule">
            <div className="schedule-days">
                <p className="subtitle is-bold has-font-14 capitalized">mon</p>
                <p className="subtitle is-bold has-font-14 capitalized">tue</p>
                <p className="subtitle is-bold has-font-14 capitalized">wed</p>
                <p className="subtitle is-bold has-font-14 capitalized">thu</p>
                <p className="subtitle is-bold has-font-14 capitalized">fri</p>
                <p className="subtitle is-bold has-font-14 capitalized">sat</p>
                <p className="subtitle is-bold has-font-14 capitalized">sun</p>
            </div>
            <div className="schedule-hours">
                <p className="subtitle has-font-14 has-text-grey capitalized">{obj.monday}</p>
                <p className="subtitle has-font-14 has-text-grey capitalized">{obj.tuesday}</p>
                <p className="subtitle has-font-14 has-text-grey capitalized">{obj.wednesday}</p>
                <p className="subtitle has-font-14 has-text-grey capitalized">{obj.thursday}</p>
                <p className="subtitle has-font-14 has-text-grey capitalized">{obj.friday}</p>
                <p className="subtitle has-font-14 has-text-grey capitalized">{obj.saturday}</p>
                <p className="subtitle has-font-14 has-text-grey capitalized">{obj.sunday}</p>
            </div>
        </div>
    );
}
export default Bank;