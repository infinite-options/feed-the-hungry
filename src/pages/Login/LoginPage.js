import React from "react";

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
  } from "react-router-dom";

import "pages/styles.css";
import useField from "components/Hooks/useField";
import InputField from "components/Form/InputField";
import Icons from "components/Icons/Icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import Notifications from "components/Notifications/Notifications";
// import LoginLayout from "pages/Login/LoginLayout.js";
import FarmersMarket from 'assets/image/farmers-market.jpg';

function LoginPage() {
    const email = useField("Email","email");
    const password = useField("Password","password");
    let onLoginPage = true;

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const handleClick = () => {
        console.log("User has tried to login..")
        email.onButtonClick();
        password.onButtonClick();
    }

    return (
        <div className="banks-page-bd">
            {/* Login image */}
            <figure className="image is-3by1">
                <img src={FarmersMarket}></img>
            </figure>
            {/* Login Form */}
            <form onSubmit={handleSubmit} >
                <div className="columns has-margin-top-1 is-centered">
                    <div className="column" style={{maxWidth: "360px"}}>
                        {/* Email input */}
                        <div className="field">
                            <div className="control">
                                <InputField props={email} />
                            </div>
                        </div>
                        {/* Password input */}
                        <div className="field">
                            <div className="control">
                                <InputField  props={password} />
                            </div>
                        </div>
                        {/* Buttons */}
                        <div className="field">
                            <div className="control has-text-centered">
                                <button className="button is-success" onClick={handleClick}>Login</button>
                                <Link to="/signup" >
                                    <button className="button is-success has-margin-left-12">Sign Up</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            {/* <InputField label="Email" props={email} />
            <InputField label="Password" props={password} /> */}
        </div>
    );
}

export default LoginPage;
