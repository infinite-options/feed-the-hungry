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
import InputField from "components/Input/InputField";
import Icons from "components/Icons/Icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import Notifications from "components/Notifications/Notifications";
// import LoginLayout from "pages/Login/LoginLayout.js";

function LoginPage() {
    const email = useField("email");
    const password = useField("password");
    let onLoginPage = true;

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const handleClick = () => {
        console.log("User has tried to login..")
        if (email.value.length === 0) email.setError(true);
        if (password.value.length === 0) password.setError(true);
    }

    return (
        <div className="banks-page-bd">
            {/* Login image */}
            <figure className="image is-3by1">
                <img src="https://s3-alpha-sig.figma.com/img/07a8/e68a/ad97cee81e3a869d96b086acd924a781?Expires=1593388800&Signature=e-WOlix~DPgFQiHt6YGjJFlQOKlTNwvao4vGZ3TzbxH2Zc3DVBeTHbcjLKOjq7R8igIRzFcPDzuD9gQQZg9nKE8~6tldUFIk6hebJKcMdehjshNTXBcKd9qZ80uOLOpYESRnqFqoOC9kxoZKlEHGLO6WuoyFzbCoC~1QRf6Wuopx4H~bRQpC5iDZ5BC4~KoT3cwwAx8gcwHpSUr0OYJmk6ytS476w7ttN63ZT10wFYI9pk~Bxe4HIFi2ysu~y1~iS2tIC62G5rA48rdKPt04Yp3qVCL3Ko-dlEOnQlj-I8NlCx8aDgUpPQo2Ab9nMmqBKxoROU7RZX40XPrncHxIpQ__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"></img>
            </figure>
            {/* Login Form */}
            <form onSubmit={handleSubmit} >
                <div className="columns has-margin-top-1 is-centered">
                    <div className="column" style={{maxWidth: "360px"}}>
                        {/* Email input */}
                        <div className="field">
                            <div className="control">
                                <InputField label="Email" props={email} />
                            </div>
                        </div>
                        {/* Password input */}
                        <div className="field">
                            <div className="control">
                                <InputField label="Password" props={password} />
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
