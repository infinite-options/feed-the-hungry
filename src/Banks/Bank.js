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
    const bank = API.getBankBy(`${bankId}`, list);
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
    const filteredInventory = API.GetItemsByTag(inventory, tagName);

    return (
        <BankInventory inventory={filteredInventory} bankId={bankId} />
    );
}
// Render inventory
function BankInventory({inventory, bankId}){
    // console.log(inventory);
    // const initialValues  = {};
    // inventory.forEach(x => {
    //     initialValues[x.food_id] = 0;
    // })
    // console.log(initialValues);
    // const [amount,setAmount] = useState(initialValues);
    // console.log(amount);
    // function increment(id){
    //     var value = amount[id];
    //     if (value >=10) value = 10;
    //     else value += 1;
    //     setAmount((prevState) => ({
    //         ...prevState,
    //         [id]: value
    //     }));
    // }
    // function decrement(id){
    //     var value = amount[id];
    //     if (value <= 0) value = 0;
    //     else value -= 1;
    //     setAmount((prevState) => ({
    //         ...prevState,
    //         [id]: value
    //     }));
    // }
    // convert 1..9 to  01..09
    function pad(d){
        return (d < 10) ? '0' + d.toString() : d.toString();
    }
    function increaseValue(id){
        var value = parseInt(document.getElementById(id).value, 10);
        // value = isNaN(value) ? 0 : value;
        value++;
        document.getElementById(id).value = value;
    }
      
    function decreaseValue(id) {
        var value = parseInt(document.getElementById(id).value, 10);
        // value = isNaN(value) ? 0 : value;
        // value < 1 ? value = 1 : '';
        value--;
        document.getElementById(id).value = value;
    }
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

                            {/* <div className="field is-grouped is-grouped-multiline item-actions"> */}
                            <form>
                                <div class="value-button" id="decrease" onClick={() => decreaseValue(item.food_id)} value="Decrease Value">-</div>
                                <input type="number" id={item.food_id} value="0" />
                                <div class="value-button" id="increase" onClick={() => increaseValue(item.food_id)} value="Increase Value">+</div>
                            </form>
                                {/* <div className="control">
                                    <button className="button is-small" onClick={() => decrement(item.food_id)}>
                                        <span className="icon decrease-qty">
                                            <FontAwesomeIcon icon={Icons.faChevronDown} />
                                        </span>
                                    </button>
                                    
                                </div>
                                <div className="control">
                                    <span id={item.food_id} className="subtitle has-font-13">
                                    { item.food_id }
                                    </span>
                                </div>
                                <div className="control">
                                    <button className="button is-small" onClick={() => increment(item.food_id)}>
                                        <span className="icon increase-qty">
                                            <FontAwesomeIcon icon={Icons.faChevronUp} />
                                        </span>
                                    </button>
                                </div> */}
                            {/* </div> */}
                        </div>               
                    </div>
                    <div className="card-footer">
                        <div className="item-price">
                            <span className="subtitle has-font-13 has-text-grey">${item.price}</span>  
                        </div>
                        <div className="item-tags">
                            {/* <a href="#">@{item.type}</a> */}
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