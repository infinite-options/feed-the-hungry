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
import BankInventory from 'pages/Bank/BankInventory';
import BankBanner from 'pages/Bank/BankBanner';
import BankFilters from 'pages/Bank/BankFilters';

function BankLayout({obj}){
    let { path, url } = useRouteMatch();
    return (
        <Router>
            <div className="bank-page-bd">
                <div className="bank-container">
                    <BankBanner obj={obj} />
                    <BankFilters bankUrl={url}/>
                    <section className="bank-body">            
                        <div className="columns">
                            <div className="column is-6">
                                <div className="inventory-title">
                                    <p className="title is-6 has-text-grey-dark">Delivery or Pickup ({obj.inventory.length})</p>  
                                </div>
                                <Switch>
                                    <Route path={`${path}/:tagName`}>
                                        <FilterInventory inventory={obj.inventory} bankUrl={url}/>
                                    </Route>
                                    <Route exact path={path}>
                                        <BankInventory inventory={obj.inventory} bankUrl={url}/>
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
function FilterInventory({inventory, bankUrl}){
    let { tagName } = useParams();
    const filteredInventory = BankAPI.GetItemsByTag(inventory, tagName);
    return (
        <BankInventory inventory={filteredInventory} bankUrl={bankUrl}/>
    );
}
export default BankLayout;