/* 
 * NOTES ON /social/{email} API!!!
 * Current: API responds with empty result if account not exist in social table (so if account not exist at all or if account exist as direct account)
 * Future: API responds with err 400 if account not exist at all, err 500 if account exist as direct account
 */

import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";

import axios from 'axios';
import useLogin from "components/Hooks/useLogin";
import LoginField from "components/Form/LoginField";
import Icons from "components/Icons/Icons";
import FacebookLogin from "react-facebook-login";
import GoogleLogin from "react-google-login"
import { OrderContext }  from 'components/Context/OrderContext';

function LoginForm(props) {
    const SOCIAL_API = "https://dc3so1gav1.execute-api.us-west-1.amazonaws.com/dev/api/v2/social/";
    const SOCIAL_ACC_API = "https://dc3so1gav1.execute-api.us-west-1.amazonaws.com/dev/api/v2/socialacc/";
    const LOGIN_API = "https://dc3so1gav1.execute-api.us-west-1.amazonaws.com/dev/api/v2/login";

    const context = useContext(OrderContext);
    const history = useHistory();

    const loginStatus = props.loginStatus;

    const [error, setError] = useState(null);
    const email = useLogin("Email","email");
    const password = useLogin("Password","password");

    const checkSocialLogin = (data) => {
        console.log("Data:", data);
        axios.get(SOCIAL_API + data.email).then(response => {
            console.log(response);
            if (response.data) {
                const result1 = response.data.result.result;
                // User exists in database
                if (result1.length) {
                    console.log("Exists");
                    // checking if user exists as the correct account type
                    if (data.social === result1[0].social_media) {
                        let uid = result1[0].user_id;
                        console.log(uid);
                        axios.post(SOCIAL_ACC_API + uid).then(response => {
                            console.log(response);
                            const result2 = response.data.result.result;
                            let first_name = result2[0].user_first_name;
                            let last_name = result2[0].user_last_name;
                            let phone = result2[0].user_phone;
                            
                            let address1 = result2[0].user_address1;
                            let address2 = result2[0].user_address2;
                            let city = result2[0].user_city;
                            let state = result2[0].user_state;
                            let zipcode = result2[0].user_zipcode;
                            let email = result2[0].user_email;
                            
                            let join_date = result2[0].user_join_date;
                            let uid = result2[0].user_id;
                            let login_id = response.data.login_attempt_log.login_id;
                            let session_id = response.data.login_attempt_log.session_id;

                            let user_is_customer = result2[0].user_is_customer;
                            let user_is_donor = result2[0].user_is_donor;
                            let user_is_admin = result2[0].user_is_admin;
                            let user_is_foodbank = result2[0].user_is_foodbank;

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
                                
                                isCustomer: user_is_customer,
                                isDonor: user_is_donor,
                                isAdmin: user_is_admin,
                                isFoodbank: user_is_foodbank,

                                social: data.social,
                                loginType: loginStatus,
                            }

                            checkAccountType(userInfo);
                        })
                    }
                    else {
                        setError(`Your account is registered as a ${result1[0].social_media} user`);
                    }
                }
                // New user, redirect to signup page
                else {
                    console.log("No exist");
                    history.push({
                        pathname: "/signup/social",
                        state: {
                            lastname: data.last_name,
                            firstname: data.first_name,
                            email: data.email,
                            social: data.social,
                            accessToken: data.access,
                            refreshToken: data.refresh,
                            signupStatus: loginStatus,
                        }
                    });
                }
            } 
        }).catch(err => {
            console.log(err.response);
            // Future: API should send err 500 if user already exists as direct login account
        })
    }
    
    const responseFacebook = async response => {
        if (response.email) {
            console.log("User has tried to login through Facebook..");
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

            const data = {
                email: email,
                access: access,
                refresh: refresh,
                first_name: first_name,
                last_name: last_name,
                social: "Facebook",
            }
            checkSocialLogin(data);
        }
    }

    const responseGoogle = async response => {
        if (response.profileObj) {
            console.log("User has tried to login through Google..");
            const email = response.profileObj.email;
            const access = response.accessToken;
            const refresh = response.googleId;
            const first_name = response.profileObj.givenName;
            const last_name = response.profileObj.familyName;

            const data = {
                email: email,
                access: access,
                refresh: refresh,
                first_name: first_name,
                last_name: last_name,
                social: "Google",
            }
            checkSocialLogin(data);
        }
    }

    const checkAccountType = (userInfo) => {
        const loginType = userInfo.loginType;
        const route = loginType === "customer" ? "/banks" : 
                        loginType === "donor" ? "/donate" : 
                        loginType === "admin" ? "/admin" :
                    /*loginType === "foodbank ?*/ "/foodbank";
        context.setIsAuth(true);
        window.localStorage.setItem('userInfo', JSON.stringify(userInfo));
        history.push(route);
    }

    function checkLogin() {
        axios.get(SOCIAL_API + email.value).then(response => {
            // if user has a social account
            const result1 = response.data.result.result;
            if (response.data && result1.length) {
                setError(`Your account is registered as a ${result1[0].social_media} user`);
            }
            // otherwise try direct login
            else {
                const data = {
                    "email": email.value,
                    "password": password.value,
                }

                axios.post(
                    LOGIN_API, 
                    data
                ).then(response => {
                    console.log("response:", response);
                    const result2 = response.data.result.result;
                    if (response.status === 200 && response.data.auth_success) {
                        if (result2[0].user_email_verified) {
                            let first_name = result2[0].user_first_name;
                            let last_name = result2[0].user_last_name;
                            let phone = result2[0].user_phone;
                            
                            let address1 = result2[0].user_address1;
                            let address2 = result2[0].user_address2;
                            let city = result2[0].user_city;
                            let state = result2[0].user_state;
                            let zipcode = result2[0].user_zipcode;
                            let email = result2[0].user_email;
                            
                            let join_date = result2[0].user_join_date;
                            let uid = result2[0].user_id;
                            let login_id = response.data.login_attempt_log.login_id;
                            let session_id = response.data.login_attempt_log.session_id;

                            let user_is_customer = result2[0].user_is_customer;
                            let user_is_donor = result2[0].user_is_donor;
                            let user_is_admin = result2[0].user_is_admin;
                            let user_is_foodbank = result2[0].user_is_foodbank;

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

                                isCustomer: user_is_customer,
                                isDonor: user_is_donor,
                                isAdmin: user_is_admin,
                                isFoodbank: user_is_foodbank,

                                loginType: loginStatus,
                            }

                            console.log("what");
                            checkAccountType(userInfo);
                        }
                        else {
                            setError("Please verify your email address before logging in");
                        }
                    }
                }).catch(err => {
                    console.log(err.response ? err.response : err);
                    // setError("Invalid email or password");
                    if (err.response.status === 500) setError("Failed to connect to the server, please try again later");
                    else if (err.response.status === 401 && !err.response.data.auth_success) setError("Invalid email or password");
                    else if (err.response.status === 400) {
                        setError("User does not exist, please create an account");
                    }
                    // In case any other errors i don't know about appear during testing
                    else {
                        setError(`Error ${error.response.status} :`, err.data.message);
                    }
                })
            }
        }).catch(err => {
            console.log(err.response);
        })
    }

    const handleClick = () => {
        console.log("User has tried to login..")
        if (email.checkInputs() & password.checkInputs()) {
            console.log("we did it!");
            checkLogin();
        }
        else {
            setError("Please fill out your login information");
            console.log("User has failed to login..", email.error);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <form onSubmit={handleSubmit} style={{width: "400px", maxWidth: "100%", margin: "auto"}}>
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
                            textButton='Login'
                            icon='fa-facebook-square'
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
                <LoginField props={email} icon={Icons.faEnvelope} />
                {/* Password input */}
                <LoginField props={password} icon={Icons.faLock} />
                {/* Error message */}
                {error && (
                    <p className="has-text-centered has-text-danger">{error}</p>
                )}
                {/* Buttons */}
                <div className="has-text-centered">
                    <button className="button is-success has-margins-0-5" type="button" onClick={handleClick}>Login</button>
                    {loginStatus === "customer" && (
                        <Link to="/signup" >
                            <button className="button is-success has-margins-0-5" type="button">Sign Up</button>
                        </Link>
                    )}
                </div>
            </div>
        </form>
    );
}

export default LoginForm;
