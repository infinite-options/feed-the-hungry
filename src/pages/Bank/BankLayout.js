import React, { useState, useEffect }  from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useLocation,
    useParams
} from "react-router-dom";
import BankAPI from 'API/BankAPI'; 
import BankInventory from 'pages/Bank/BankInventory';
import BankBanner from 'pages/Bank/BankBanner';
import BankFilters from 'pages/Bank/BankFilters';
import ScrollToTopOnMount from 'utils/Scroll/ScrollToTopOnMount';
function BankLayout({obj}){
    let { path, url } = useRouteMatch();
    let query = useQuery();
    return (
        // <Router>
            <div className="bank-page-bd">
                <ScrollToTopOnMount />
                <div className="bank-container">
                    <BankBanner obj={obj} />
                    <BankFilters bankUrl={url}/>
                    <section className="bank-body">            
                        <div className="columns">
                            <div className="column is-6">
                                <div className="inventory-title-container">
                                    <p className="subtitle inventory-title">Delivery or Pickup</p>  
                                </div>
                                {/* <Switch>
                                    <Route path={`${path}?type=:tagName`}>
                                        <FilterInventory inventory={obj.inventory} bankUrl={url}/>
                                    </Route>
                                    <Route exact path={path}>
                                        <BankInventory inventory={obj.inventory} bankUrl={url}/>
                                    </Route>
                                </Switch>     */}
                                <BankInventory type={query.get("type")} inventory={obj.inventory} bankUrl={url}/>
                            </div>
                            <div className="column is-6">
                                <div className="inventory-title-container">
                                    <p className="subtitle inventory-title">Delivery Only</p>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        // </Router>
    );
}
function FilterInventory({inventory, bankUrl}){
    let { tagName } = useParams();
    const filteredInventory = BankAPI.GetItemsByTag(inventory, tagName);
    return (
        <BankInventory inventory={filteredInventory} bankUrl={bankUrl}/>
    );
}
function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
export default BankLayout;