import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
} from "react-router-dom";

// import styles for bank cards, map, etc.
import './style.css';

// improt FontAwesome icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faShippingFast, faCube, faMapPin, faClock, faCalendarAlt} from '@fortawesome/free-solid-svg-icons'


function Bank() {

    return (
        <div class="main-bd">

            <section class="hero grey">
                <div class="hero-body bank-banner">
                    <div class="container">
                        <figure class="image is-96x96">
                                <img src="https://bulma.io/images/placeholders/96x96.png"></img>
                            </figure>
                        <h1 class="title">
                            West Valley Food Bank (Santa Clara)
                        </h1>
                        {/* <h2 class="subtitle">
                            2.1 miles
                        </h2> */}
                        <div class="icons">
                        <span class="subtitle is-6">0.5 miles</span>
                                    <span class="icon-wrapper">
                                        <FontAwesomeIcon class="icon" icon={faShippingFast}/>  
                                    </span>
                                    <span class="subtitle is-6">Delivery</span>
                                    <span class="icon-wrapper has-margin-left-2">
                                        <FontAwesomeIcon class="icon" icon={faCube}/>
                                    </span>
                                    <span class="subtitle is-6">Pick Up</span>                          
                                </div>
                    </div>
                </div>
            </section>
            <section class="bank-body">
                <div class="columns">
                    <div class="column is-two-thirds">
                        <div class="highlights">
                            <div class="content">
                                {/* <div class="icons">
                                    <span class="icon-wrapper">
                                        <FontAwesomeIcon class="icon is-medium" icon={faShippingFast}/>  
                                    </span>
                                    <span class="subtitle is-6">Delivery</span>
                                    <span class="icon-wrapper has-margin-left-2">
                                        <FontAwesomeIcon class="icon is-medium" icon={faCube}/>
                                    </span>
                                    <span class="subtitle is-6">Pick Up</span>                          
                                </div> */}
                            </div>
                        </div>
                    </div>
                    <div class="column">
                        <nav class="panel bank-panel">
                            <div class="map">
                            </div>
                            <div class="panel-content">
                                <p class="title is-5 location-and-hours">Location and Hours</p>
                                <div class="panel-block">
                                    <span class="panel-icon">
                                        <FontAwesomeIcon icon={faMapPin} />
                                    </span>
                                    <span class="title is-6">123 Street Santa Clara, CA 95051</span>
                                    
                                </div>
                                <div class="panel-block no-flex">
                                    <span class="panel-icon has-margin-top-0-25">
                                        <FontAwesomeIcon icon={faClock} />   
                                    </span>
                                    <span class="title is-6">Monday - Wednesday</span>
                                    <br></br>
                                    <p class="subtitle is-6 has-margin-left-14">11:00 AM - 2:00 PM</p>
                                </div>
                                <div class="panel-block no-flex">
                                    <span class="panel-icon has-margin-top-0-25">
                                        <FontAwesomeIcon icon={faClock} />   
                                    </span>
                                    <span class="title is-6">Tuesday - Friday</span>
                                    <br></br>
                                    <p class="subtitle is-6 has-margin-left-14">11:00 AM - 2:00 PM</p>
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
                
            </section>
            
        </div>
       
    );
}
function sideBar(){
    return (<nav class="panel">
        <p>Location and Hours</p>
        <div class="panel-block">
            <span class="panel-icon">
                <FontAwesomeIcon icon={faMapPin} />
            </span>
            123 Street Santa Clara, CA 95051
        </div>
    </nav>);
}
export default Bank;