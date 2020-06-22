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
//import FacebookLogin from "react-facebook-login";
//import GoogleLogin from "react-google-login"

function LoginPage() {
    const email = useField("Email","email");
    const password = useField("Password","password");
    // let onLoginPage = true;

    // const responseFacebook = async response => {
    //     console.log("User has tried to login through Facebook..")
    // }

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const handleClick = () => {
        console.log("User has tried to login..")
        email.validate();
        password.validate();
        if (email.validate() && password.validate()) {
            console.log("we did it!");
            checkLogin();
        }
        else {
            console.log("User has failed to login..");
        }
    }

    async function grabLoginInfoForUser(userEmail, userPassword) {
        // For testing...
        // console.log("running function grabLoginInfoForUser()..");
        // console.log(
        //             "Email:", (userEmail ? userEmail : undefined), 
        //             "Password:", (userPassword ? userPassword : undefined)
        //             );

        // Code here
    }

    function checkLogin() {
        // For testing...
        // console.log("running function checkLogin()..")

        grabLoginInfoForUser(email.value, password.value).then(response => {
            login(response);
        }).catch(err => {
            // For testing...
            console.log("uh oh error ", err.response)

            // Code here
        })
    }

    function login(response) {
        // For testing...
        // console.log("running function login()..");
        // console.log("Response:", response);

        // Code here
        if(response) {}
    }

    return (
        <div className="login-signup-page">
            {/* Login image */}
            <figure className="image is-3by1 has-margin-bottom-0-5" style={{width: "100%"}}>
                <img src={FarmersMarket}></img>
            </figure>
            {/* Login Form */}
            {/* Facebook and Google login go here */}
            <form onSubmit={handleSubmit} style={{width: "400px", maxWidth: "100%"}}>
                <div className="column">
                    {/* Email input */}
                    <InputField props={email} icon={Icons.faEnvelope} />
                    {/* Password input */}
                    <InputField props={password} icon={Icons.faLock} />
                    {/* Buttons */}
                    <div className="has-text-centered has-margin-bottom-0-5">
                        <button className="button is-success has-margins-0-5" onClick={handleClick}>Login</button>
                        <Link to="/signup" >
                            <button className="button is-success has-margins-0-5">Sign Up</button>
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default LoginPage;
