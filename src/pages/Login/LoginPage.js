import React, { useState } from "react";

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams,
    useHistory
  } from "react-router-dom";

import axios from 'axios';
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
    const history = useHistory();

    const email = useField("Email","email");
    const password = useField("Password","password");
    // let onLoginPage = true;

    const responseFacebook = async response => {
        console.log("User has tried to login through Facebook..");
        if (response.email) {
            const email = response.email;
            const access = response.accessToken;
            const refresh = response.id;
            const name = response.name.split(" ");
            const last_name = name[name.length - 1];
            let first_name = "";
            for (let i = 0; i < name.length - 1; i++) {
                first_name += name[i] + " ";
            }
            first_name = first_name.slice(0, -1);
            // let data = await grabSocialUserInfo(e); // gets social user data, returns null if data doesn't exist
            let data = null;

            if (!data) {
                // new user, send them to social signup page
                console.log("Data not found..");
                history.push({
                    pathname: "/signup/social",
                    state: {
                        lastname: last_name,
                        firstname: first_name,
                        email: email,
                        social: "Facebook",
                        accessToken: access,
                        refreshToken: refresh,
                        // SOCIAL_API_URL: `${props.SOCIAL_API_URL}acc`
                    }
                });
            }
            else {
                console.log("Data:", data);
                // user logged in, update user data & status
            }
        }
    }

    const responseGoogle = async response => {
        console.log("User has tried to login through Google..");
        if (response.profileObj) {
            // const email = response.profileObj.email;
            // const access = response.accessToken;
            // const refresh = response.googleId;
            // const first_name = response.profileObj.givenName;
            // const last_name = response.profileObj.familyName;
            // let data = await grabSocialUserInfo(e); // get social data, returns null if user doesn't exist yet
            let data = response;
            
            if (!data) {
                // new user, send them to '/signup/social' page
                console.log("Data not found..");
            }
            else {
                console.log("Data:", data);
                // user has logged in, update login status and user data
            }
        }
    }

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

    const [hidden, setHidden] = useState("hidden");
    function checkLogin() {
        // For testing...
        // console.log("running function checkLogin()..")

        // get user data based on email and password inputs
        // grabLoginInfoForUser(email.value, password.value).then(response => {
        //     login(response);
        // }).catch(err => {
        //     // For testing...
        //     console.log("uh oh error ", err.response)

        //     // Code here
        // })


        const data = {
            "email": email.value,
            "password": password.value,
        }

        axios.post(
            "https://dc3so1gav1.execute-api.us-west-1.amazonaws.com/dev/api/v2/login", 
            data
        ).then(response => {
            console.log(response);
            if (response.status === 200) {
                if (response.auth_success) {
                    let first_name = response.data.result.result[0].ctm_first_name;
                    let last_name = response.data.result.result[0].ctm_last_name;
                    let phone = response.data.result.result[0].ctm_phone;
                    
                    let address1 = response.data.result.result[0].ctm_address1;
                    let address2 = response.data.result.result[0].ctm_address2;
                    let city = response.data.result.result[0].ctm_city;
                    let state = response.data.result.result[0].ctm_state;
                    let zipcode = response.data.result.result[0].ctm_zipcode;
                    let email = response.data.result.result[0].ctm_email;
                    
                    let join_date = response.data.result.result[0].ctm_join_date;
                    let uid = response.data.result.result[0].ctm_id;
                    let login_id = response.data.login_attempt_log.login_id;
                    let session_id = response.data.login_attempt_log.session_id;
                    
                    // Context API stuff here!

                    history.push('/');
                }
            }
        }).catch(err => {
            // console.log(err);
            setHidden("");
        })
    }

    function login(response) {
        // For testing...
        // console.log("running function login()..");
        // console.log("Response:", response);

        // Code here
        if(response) {
            // user has logged in, update user data and login status
        }
    }

    return (
        <div className="login-signup-page">
            {/* Login image */}
            <figure className="image is-3by1 has-margin-bottom-0-5" style={{width: "100%"}}>
                <img src={FarmersMarket}></img>
            </figure>
            {/* Login Form */}
            <form onSubmit={handleSubmit} style={{width: "400px", maxWidth: "100%"}}>
                <div className="column">
                    {/* Facebook and Google login go here */}
                    <div className="has-text-centered has-margin-bottom-0-5">
                        <span className="has-margins-0-5">
                            <FacebookLogin
                                appId='235300190881746'
                                autoLoad={false}
                                fields='name,email,picture'
                                onClick='return false'
                                callback={responseFacebook}
                                size='small'
                                textButton='FB Login'
                            />
                        </span>
                        <span className="has-margins-0-5">
                            {/* <GoogleLogin
                                clientId={null} // Not set up yet
                                buttonText='Login'
                                onSuccess={responseGoogle}
                                onFailure={responseGoogle}
                                isSignedIn={false}
                                disable={false}
                                cookiePolicy={"single_host_origin"}
                            /> */}
                        </span>
                    </div>
                    {/* Email input */}
                    <InputField props={email} icon={Icons.faEnvelope} />
                    {/* Password input */}
                    <InputField props={password} icon={Icons.faLock} />
                    {/* Error message */}
                    <div className={hidden}>
                        <p className="has-text-centered has-text-danger">Invalid email or password</p>
                    </div>
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
