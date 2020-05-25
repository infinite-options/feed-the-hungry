import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
} from "react-router-dom";
import Bank from './Bank';
// import styles for bank cards, map, etc.
import './style.css';

// improt FontAwesome icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faShippingFast, faCube} from '@fortawesome/free-solid-svg-icons'



function Banks () {
    let match = useRouteMatch();
    return (  
        <section id="bank-list">
            <div class="container">
            <div class="container has-margin-top-bottom-150">
                <div class="columns">
                {/* list of banks */}
                <div class="column">
                <div class="card bank-card">
                    <div class="card-content">
                        <div class="media">
                            <div class="media-left">
                                <figure class="image is-48x48">
                                    <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image"></img>
                                </figure>
                            </div>
                            <div class="media-content">
                            <p class='title is-5'><Link to={`/banks/west-valley`}>West Valley Food Bank - 0.5 mi</Link></p>
                            <p class="subtitle is-6">123 Street Santa Clara, CA 95051</p>
                            </div>
                        </div>
                        <div class="content">
                        <div class="icons">
                            <span class="icon-wrapper">
                            <FontAwesomeIcon icon={faShippingFast}/>  
                            </span>
                            <span class="subtitle is-6">Delivery</span>
                                 
                        </div>
                        <div class="columns">
                            <div class="column days">
                            Monday - Thursday
                            </div>
                            <div class="column hours">
                            11:00 AM - 4:00 PM
                            </div>
                        </div>
                        </div>
                        <br>
                        </br>
                    </div>
                    </div>
                    <div class="card bank-card">
                    <div class="card-content">
                        <div class="media">
                            <div class="media-left">
                                <figure class="image is-48x48">
                                    <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image"></img>
                                </figure>
                            </div>
                            <div class="media-content">
                            <p class='title is-5'>Second Harvest - 1.1 mi</p>
                            <p class="subtitle is-6">123 Street Santa Clara, CA 95051</p>
                            </div>
                        </div>
                        <div class="content">
                        <div class="icons">
                            <span class="icon-wrapper">
                                <FontAwesomeIcon icon={faShippingFast}/>  
                            </span>
                            <span class="subtitle is-6">Delivery</span>
                            <span class="icon-wrapper has-margin-left-2">
                                <FontAwesomeIcon icon={faCube}/>
                            </span>
                            <span class="subtitle is-6">Pick Up</span>                          
                        </div>
                        <div class="columns">
                            <div class="column days">
                            Tuesday - Friday
                            </div>
                            <div class="column hours">
                            10:00 AM - 3:00 PM
                            </div>
                        </div>
                        </div>
                        <br>
                        </br>
                    </div>
                    </div>
                    <div class="card bank-card">
                    <div class="card-content">
                        <div class="media">
                            <div class="media-left">
                                <figure class="image is-48x48">
                                    <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image"></img>
                                </figure>
                            </div>
                            <div class="media-content">
                            <p class='title is-5'>River of Life - 1.9 mi</p>
                            <p class="subtitle is-6">321 Avenue San Jose, CA 95121</p>
                            </div>
                        </div>
                        <div class="content">
                        <div class="icons">
                            <span class="icon-wrapper">
                            <FontAwesomeIcon icon={faCube}/>
                            </span>                         
                            <span class="subtitle is-6">Pick Up</span>     
                        </div>
                        <div class="columns">
                            <div class="column days">
                            Wednesday-Friday
                            </div>
                            <div class="column hours">
                            9:00 AM - 2:00 PM
                            </div>
                        </div>
                        </div>
                        <br>
                        </br>
                    </div>
                    </div>
                    <div class="card bank-card">
                    <div class="card-content">
                        <div class="media">
                            <div class="media-left">
                                <figure class="image is-48x48">
                                    <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image"></img>
                                </figure>
                            </div>
                            <div class="media-content">
                            <p class='title is-5'>River of Life - 1.9 mi</p>
                            <p class="subtitle is-6">321 Avenue San Jose, CA 95121</p>
                            </div>
                        </div>
                        <div class="content">
                        <div class="icons">
                        
                            <span class="icon-wrapper">
                            <FontAwesomeIcon icon={faCube}/>
                            </span>
                            <span class="subtitle is-6">Pick Up</span>                               
                        </div>
                        <div class="columns">
                            <div class="column days">
                            Wednesday-Friday
                            </div>
                            <div class="column hours">
                            9:00 AM - 2:00 PM
                            </div>
                        </div>
                        </div>
                        <br>
                        </br>
                    </div>
                    </div>
                </div>
                {/* sticky map */}
                <div class="column">
                    <div class="map-container sticky">
                    </div>
                </div>
                </div>
            </div>
            </div>
            {/* The Banks page has its own <Switch> with more routes that build on the /banks URL path. You can think of the
            2nd <Route> here as an "index" page for all banks, or the page that is shown when no topic is selected */}
            {/* <Switch>
                <Route path={`/banks/west-valley`}>
                    <Bank />
                </Route>
                <Route path={`/banks/`}>
                </Route>
            </Switch> */}
        </section>
    );

}
export default Banks;