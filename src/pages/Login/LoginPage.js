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
import FarmersMarket from 'assets/image/farmers-market.jpg';
// import Notifications from "components/Notifications/Notifications";
// import LoginLayout from "pages/Login/LoginLayout.js";
import FacebookLogin from "react-facebook-login";
import GoogleLogin from "react-google-login"

function LoginPage() {
    const email = useField("Email","email");
    const password = useField("Password","password");
    // let onLoginPage = true;

    const responseFacebook = async response => {
        console.log("User has tried to login through Facebook..")
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const handleClick = () => {
        console.log("User has tried to login..")
        email.validatewith();
        password.validatewith();
    }

    return (
        <div className="login-signup-page">
            {/* Login image */}
            <figure className="image is-3by1 has-margin-bottom-0-5">
                <img src={FarmersMarket}></img>
            </figure>
            {/* Login Form */}
            <div className="columns has-no-margin is-centered">
                {/* Facebook and Google login go here */}
                <form onSubmit={handleSubmit}>
                    <div className="column">
                        {/* Email input */}
                        <div className="field">
                            <div className="control">
                                <InputField props={email}/>
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
                            <div className="control has-text-centered has-margin-bottom-0-5">
                                <button className="button is-success has-margins-0-5" onClick={handleClick}>Login</button>
                                <Link to="/signup" >
                                    <button className="button is-success has-margins-0-5">Sign Up</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            {/* <InputField label="Email" props={email} />
            <InputField label="Password" props={password} /> */}
        </div>
    );
}

export default LoginPage;
