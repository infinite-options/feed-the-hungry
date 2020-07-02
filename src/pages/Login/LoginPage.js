import React, { useState, useContext } from "react";

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

import { OrderContext }  from 'components/Context/OrderContext';

function LoginPage() {
    const context = useContext(OrderContext);

    const history = useHistory();

    const email = useField("Email","email");
    const password = useField("Password","password");
    // let onLoginPage = true;

    async function grabSocialUserInfo(email) {
        // try {
        //     let response = await axios.get("${API_URL}/${email}");
        //     console.log(response);
        //     if (response.status === 200) {
        //         Depending on how i get the data, this might look different
        //     }
        //     Check if user exists in direct login database table
        //     return null if it does, then setError("User already exists as a direct login account")
    }

    // const checkSocialLogin = (data) => {
    //     axios.post("${API_URL}", data).then(response => {
    //         console.log("Data:", data);
    //         // user logged in, update user data & status
    //     }).catch(err => {
    //         history.push({
    //             pathname: "/signup/social",
    //             state: {
    //                 lastname: data.last_name,
    //                 firstname: data.first_name,
    //                 email: data.email,
    //                 social: data.social,
    //                 accessToken: access,
    //                 refreshToken: refresh,
    //                 // SOCIAL_API_URL: `${props.SOCIAL_API_URL}acc`
    //             }
    //         });
    //     })
    // }
    
    const responseFacebook = async response => {
        console.log("User has tried to login through Facebook..");
        console.log(response);
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

            // Other way to do it possibly
            // data = {
            //     email: email,
            //     access: access,
            //     refresh: refresh,
            //     first_name: first_name,
            //     last_name: last_name,
            //     social: "Facebook",
            // }
            // checkSocialLogin(data);
            // END OF FUNCTION

            // let data = await grabSocialUserInfo(email); // gets social user data, returns null if data doesn't exist
            let data = null; // temp value

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
            const email = response.profileObj.email;
            const access = response.accessToken;
            const refresh = response.googleId;
            const first_name = response.profileObj.givenName;
            const last_name = response.profileObj.familyName;

            // Other way to do it possibly
            // data = {
            //     email: email,
            //     access: access,
            //     refresh: refresh,
            //     first_name: first_name,
            //     last_name: last_name,
            //     social: "Google",
            // }
            // checkSocialLogin(data);
            // END OF FUNCTION

            // let data = await grabSocialUserInfo(email); // get social data, returns null if user doesn't exist yet
            let data = null; // temp value
            
            if (!data) {
                // new user, send them to social signup page
                console.log("Data not found..");
                history.push({
                    pathname: "/signup/social",
                    state: {
                        lastname: last_name,
                        firstname: first_name,
                        email: email,
                        social: "Google",
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

    const [error, setError] = useState(null);
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
            if (response.status === 200 && response.data.auth_success) {
                if (response.data.result.result[0].ctm_email_verify) {
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

                    // setLoginInfo(prevState => ({...prevState, 
                    //     firstName: first_name,
                    //     lastName: last_name,
                    //     phoneNumber: phone,
                    //     address1: address1,
                    //     address2: address2,
                    //     city: city,
                    //     state: state,
                    //     zip: zipcode,
                    //     email: email,

                    //     joinDate: join_date,
                    //     userID: uid,
                    //     loginID: login_id,
                    //     sessionID: session_id,
                    // }));

                    let userInfo = {
                        firstName: first_name,
                        lastName: last_name,
                        phoneNumber: phone,
                        address1: address1,
                        address2: address2,
                        city: city,
                        state: state,
                        zip: zipcode,
                        email: email,

                        joinDate: join_date,
                        userID: uid,
                        loginID: login_id,
                        sessionID: session_id,
                    }
                    window.localStorage.setItem('userInfo', JSON.stringify(userInfo));
                    
                    // Context API stuff here!
                    context.setIsAuth(true);
                    history.push('/');
                }
                else {
                    setError("Please verify your email before logging in");
                }
            }
        }).catch(err => {
            console.log(err.response);
            setError("Invalid email or password");
            // if (error.response.status === 500) setError("Failed to connect to the server, please try again later");
            // else if (!error.response.data.auth_success) setError("Invalid password");
            // else if (error.response.status === 400) {
            //     axios.get("${API_URL}/${email.value}").then(response => {
            //         setError("User already exists as a ${response.data.social} account");
            //     }).catch(err => {
            //         setError("User does not exist, please create an account");
            //     })
            // }
            // // In case any other errors i don't know about appear during testing
            // else {
            //     setError("Error ${error.response.status} :", error.data.message);
            // }
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
                            <GoogleLogin
                                clientId="1031017519051-tuc2hrq6otb40imvmmc9mucecu2u7ggj.apps.googleusercontent.com"
                                buttonText='Login'
                                onSuccess={responseGoogle}
                                onFailure={responseGoogle}
                                isSignedIn={false}
                                disable={false}
                                cookiePolicy={"single_host_origin"}
                            />
                        </span>
                    </div>
                    {/* Email input */}
                    <InputField props={email} icon={Icons.faEnvelope} />
                    {/* Password input */}
                    <InputField props={password} icon={Icons.faLock} />
                    {/* Error message */}
                    {error && (
                        <p className="has-text-centered has-text-danger">{error}</p>
                    )}
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
