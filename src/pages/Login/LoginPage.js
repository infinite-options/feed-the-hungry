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
// import Notifications from "components/Notifications/Notifications";
// import LoginLayout from "pages/Login/LoginLayout.js";

function LoginPage() {
    return (
        <div className="banks-page-bd">
            <figure className="image is-3by1">
            <img src="https://s3-alpha-sig.figma.com/img/07a8/e68a/ad97cee81e3a869d96b086acd924a781?Expires=1593388800&Signature=e-WOlix~DPgFQiHt6YGjJFlQOKlTNwvao4vGZ3TzbxH2Zc3DVBeTHbcjLKOjq7R8igIRzFcPDzuD9gQQZg9nKE8~6tldUFIk6hebJKcMdehjshNTXBcKd9qZ80uOLOpYESRnqFqoOC9kxoZKlEHGLO6WuoyFzbCoC~1QRf6Wuopx4H~bRQpC5iDZ5BC4~KoT3cwwAx8gcwHpSUr0OYJmk6ytS476w7ttN63ZT10wFYI9pk~Bxe4HIFi2ysu~y1~iS2tIC62G5rA48rdKPt04Yp3qVCL3Ko-dlEOnQlj-I8NlCx8aDgUpPQo2Ab9nMmqBKxoROU7RZX40XPrncHxIpQ__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"></img>
            </figure>
            <div className="columns has-margin-top-1 is-centered">
                <div className="column is-one-third">
                    <div className="field">
                        <div className="control">
                            <input className="input has-text-centered" type="email" placeholder="Email"></input>
                        </div>
                    </div>
                    <div className="field">
                        <div className="control">
                            <input className="input has-text-centered" type="password" placeholder="Password"></input>
                        </div>
                    </div>
                    <div className="field">
                        <div className="control has-text-centered">
                            <button className="button is-success">Login</button>
                            <Link to="/signup" >
                                <button className="button is-success has-margin-left-12">Sign Up</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default LoginPage;
