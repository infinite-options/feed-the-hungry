import React, { useState, useContext, useEffect } from "react";
import { Redirect, useHistory } from "react-router-dom";

import "pages/styles.css";
import NeedMoreInfoForm from "components/Form/NeedMoreInfoForm";

function DonorPage() {
    const userInfo = JSON.parse(window.localStorage.getItem("userInfo"));
    const [onTab, setOnTab] = useState(0);
    const [loading, setLoading] = useState(true);
    const [isDonor, setIsDonor] = useState(userInfo.isDonor);

    useEffect(() => {
        if (!userInfo.isDonor) {
            if(userInfo.address1 && userInfo.city && userInfo.state && userInfo.zip) {
                console.log("hi");
                setIsDonor(1);
                userInfo.isDonor = 1;
                window.localStorage.setItem('userInfo', JSON.stringify(userInfo));
                // CALL EDIT_ACCOUNT API
            }
        }
        setLoading(false);
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
        <div className="login-signup-page has-text-centered">
            <div className="box"></div>
            {isDonor ? (
                <React.Fragment>
                    <nav className="level is-mobile">
                        <p className="level-item has-text-centered" style={{margin: "0"}}>
                            <button name="donate" className={"button is-fullwidth is-primary" + (onTab === 0 ? " is-active" : "")} onClick={handleClick}>Make Donation</button>
                        </p>
                        <p className="level-item has-text-centered" style={{margin: "0"}}>
                            <button name="volunteer" className={"button is-fullwidth is-primary" + (onTab === 1 ? " is-active" : "")} onClick={handleClick}>Volunteer</button>
                        </p>
                        <p className="level-item has-text-centered" style={{margin: "0"}}>
                            <button name="history" className={"button is-fullwidth is-primary" + (onTab === 2 ? " is-active" : "")} onClick={handleClick}>History</button>
                        </p>
                    </nav>
                    {/* More stuff here */}
                </React.Fragment> 
            ) : (
                <NeedMoreInfoForm type="donor" userInfo={userInfo} setValue={setIsDonor} />
            )}
        </div>
    );
}

export default DonorPage;
