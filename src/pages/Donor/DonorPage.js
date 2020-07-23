import React, { useState, useContext, useEffect } from "react";
import { Redirect, useHistory } from "react-router-dom";

import "pages/styles.css";
import NeedMoreInfoForm from "components/Form/NeedMoreInfoForm";
import DonationHistory from "./DonationHistory";
import DonationForm from "./DonationForm";
import axios from "axios";

function DonorPage() {
    const userInfo = JSON.parse(window.localStorage.getItem("userInfo"));
    // 0 -> donation tab, 1 -> volunteer tab, 2 -> history tab
    const [onTab, setOnTab] = useState(0);
    const [loading, setLoading] = useState(true);
    const [isDonor, setIsDonor] = useState(userInfo.isDonor);

    useEffect(() => {
        if (!userInfo.isDonor) {
            if(userInfo.address1 && userInfo.city && userInfo.state && userInfo.zip) {
                userInfo.isDonor = 1;
                const user_auth_data = {
                    user_id: userInfo.userID,
                    user_is_customer: userInfo.isCustomer,
                    user_is_donor: userInfo.isDonor,
                    user_is_admin: userInfo.isAdmin,
                    user_is_foodbank: userInfo.isFoodbank,
                }
                axios.post("https://dc3so1gav1.execute-api.us-west-1.amazonaws.com/dev/api/v2/edit_user_status", user_auth_data).then(response => {
                    console.log(response);
                    setIsDonor(1);
                    setLoading(false);
                    window.localStorage.setItem('userInfo', JSON.stringify(userInfo));
                }).catch(err => {
                    console.log(err.response);
                })
            }
        }
        else {
            setLoading(false);
        }
    }, [])

    const handleClick = (e) => {
        console.log(e.target.name);
        const type = e.target.name;
        // is there a better way to do this?
        // for whatever reason, this was the only
        // way I could get this to properly work
        setOnTab(type === "donate" ? 0 : 
                 type === "volunteer" ? 1 : 
               /*type === "history" ?*/ 2);
    }

    return !loading && (
        <div className="donate-page has-text-centered">
            {/* <div className="box"></div> */}
            {isDonor ? (
                <React.Fragment>
                    <nav className="level is-mobile">
                        <p className="level-item has-text-centered" style={{margin: "0"}}>
                            <button name="donate" className={"button is-fullwidth is-success" + (onTab === 0 ? " is-active" : "")} onClick={handleClick}>Make Donation</button>
                        </p>
                        <p className="level-item has-text-centered" style={{margin: "0"}}>
                            <button name="volunteer" className={"button is-fullwidth is-success" + (onTab === 1 ? " is-active" : "")} onClick={handleClick}>Volunteer</button>
                        </p>
                        <p className="level-item has-text-centered" style={{margin: "0"}}>
                            <button name="history" className={"button is-fullwidth is-success" + (onTab === 2 ? " is-active" : "")} onClick={handleClick}>History</button>
                        </p>
                    </nav>
                    
                    {/* More stuff here */}
                    {onTab === 0 && (
                        <DonationForm />
                    )}
                    {onTab === 1 && (
                        <div className="column">
                            List of food banks requiring volunteers<br />
                            OR<br />
                            Fill form (location, contact info, etc) and based on form inputs, a nearby food bank in need will choose from a queue of volunteers
                        </div>
                    )}
                    {onTab === 2 && (
                        <DonationHistory />
                    )}
                </React.Fragment> 
            ) : (
                <NeedMoreInfoForm type="donor" userInfo={userInfo} setValue={setIsDonor} />
            )}
        </div>
    );
}

export default DonorPage;
