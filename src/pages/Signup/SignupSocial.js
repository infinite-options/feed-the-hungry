import React, { useState, useEffect, useRef } from "react";

import { useLocation, useHistory } from "react-router-dom";

import axios from 'axios';

import StateAPI from 'API/StateAPI';
import "pages/styles.css";
import useField from "components/Hooks/useField";
import InputField from "components/Form/InputField";
import Select from 'components/Form/Select';
import DietaryRestrictions from "pages/Signup/DietaryRestrictions";
import FamilyMembers from "pages/Signup/FamilyMembers";

function SignupSocial() {
    const states = StateAPI();
    const location = useLocation();
    const history = useHistory();
    const dietRef = useRef();
    const familyRef = useRef();

    // const [email, setEmail] = useState("");
    // const [firstname, setFirstName] = useState("");
    // const [lastname, setLastName] = useState("");
    // const [accessToken, setAccessToken] = useState("");
    // const [refreshToken, setRefreshToken] = useState("");
    // const [socialMedia, setSocialMedia] = useState("");
    // const [signupStatus, setSignupStatus] = useState("");

    const email = location.state.email;
    const firstname = location.state.firstname;
    const lastname = location.state.lastname;
    const accessToken = location.state.accessToken;
    const refreshToken = location.state.refreshToken;
    const socialMedia = location.state.social;
    const signupStatus = location.state.signupStatus;

    const phoneNumber = useField("Phone Number", "tel");
    const dob = useField("Date of Birth", "date");
    const address_1 = useField("Address 1", "text", (signupStatus === "customer" ? false : true));
    const address_2 = useField("Address 2", "text", false);
    const city = useField("City", "text", (signupStatus === "customer" ? false : true));
    const state = useField("State", "text", (signupStatus === "customer" ? false : true));
    const zip = useField("Zip", "text", (signupStatus === "customer" ? false : true));

    const license= useField("Drivers License", "text", false);
    const licenseImg= useField("License Image", "file", false);
    const monthlyIncome = useField("Monthly Income", "number", false);

    // useEffect(() => {
    //     (async function setSignupParams(state) {
    //         if (state) {
    //             await setParams(state);
    //         }
    //     })(location.state);
    // }, []);
    
    // function setParams(state) {
    //     setEmail(state.email);
    //     setLastName(state.lastname);
    //     setFirstName(state.firstname);
    //     setAccessToken(state.accessToken);
    //     setRefreshToken(state.refreshToken);
    //     setSocialMedia(state.social);
    //     setSignupStatus(state.signupStatus);
    // }

    const validateInputs = () => {
        let isAllValid = true;
        if (!phoneNumber.isValid ||
            !dob.isValid ||
            !address_1.isValid ||
            !address_2.isValid ||
            !city.isValid ||
            !state.isValid ||
            !zip.isValid) {
            isAllValid = false;
        }
        return isAllValid;
    }

    const checkSignupStatus = (status) => {
        return (status === signupStatus ? 1 : 0);
    }

    const handleClick = () => {
        console.log("User has tried to sign up..")
        let isAllValid = validateInputs();
        dietRef.current.checkValues();
        
        // Checking if user filled all required inputs
        let signupPassed = dietRef.current.valid() && isAllValid;
        console.log(dietRef.current.valid(), isAllValid, signupPassed);

        if(signupPassed) {
            // Testing to see if all values went through
            let data = {};
            data["email"] = email;
            data["first_name"] = firstname;
            data["last_name"] = lastname;
            data["access_token"] = accessToken;
            data["refresh_token"] = refreshToken;
            data["social_media"] = socialMedia;

            data["phone"] = phoneNumber.value;
            data["dob"] = dob.value;
            data["address1"] = address_1.value;
            data["address2"] = address_2.value;
            data["city"] = city.value;
            data["state"] = state.value;
            data["zipcode"] = zip.value;
            data["persons"] = familyRef.current.persons;
            data["diet_restrictions"] = dietRef.current.restrictions;
            console.log("Data:", data);
            console.log("we did it!");
            let test = {
                "first_name" : firstname,
                "last_name" : lastname,
                "address1" : address_1.value,
                "address2" : address_2.value,
                "city" : city.value,
                "state" : state.value,
                "zipcode" : zip.value,
                "phone" : phoneNumber.value,
                "email" : email,
                "social_media" : socialMedia,
                "access_token": accessToken,
                "refresh_token": refreshToken,
                "user_is_customer": checkSignupStatus("customer"),
                "user_is_donor": checkSignupStatus("donor"),
                "user_is_admin": checkSignupStatus("admin"),
                "user_is_foodbank": checkSignupStatus("foodbank"),
            }
            console.log("Test:", test);
            axios.post(
                "https://dc3so1gav1.execute-api.us-west-1.amazonaws.com/dev/api/v2/socialsignup", 
                test
            ).then(response => {
                console.log(response);
                if (response.status === 200) {
                    history.push('/login');
                }
            }).catch(err => {
                console.log(err);
            });
        }
        else {
            console.log("Sign up failed...");
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const handleKeyPress = (e) => {
        if (e.which === 13) {
            e.preventDefault();
        }
    }

    return (
        <div className="login-signup-page signup-background-image">
            <form onSubmit={handleSubmit} onKeyPress={handleKeyPress} style={{width: "720px", maxWidth: "100%"}}>
                <div className="column has-text-black">
                    {/* Asking for user data */}
                    <div>
                        <p className="subtitle is-1 has-margin-top-1 has-text-centered has-text-black">Social Sign Up</p>
                        <div className="columns has-margin-top-1">
                            <div className="column">
                                <input className="input" type="text" value={firstname} readOnly/>
                            </div>
                            <div className="column">
                                <input className="input" type="text" value={lastname} readOnly/>
                            </div>
                        </div>
                        <div className="columns">
                            <div className="column is-8">
                                <InputField props={phoneNumber} />
                            </div>
                            <div className="column">
                                <InputField  props={dob} />
                            </div>
                        </div>
                        <input className="input" type="text" value={email} readOnly/>
                    </div>
                    <hr className="is-light-gray"/>
                    {/* Asking for user address */}
                    <div>
                        <p className="subtitle is-3 has-margin-top-1 has-text-centered has-text-black">Would you like to add a permanent address?</p>
                        <p className="subtitle is-4 has-text-centered has-text-black">Or <u>use my current location</u> instead.</p>
                        <p className="subtitle is-4 has-margin-top-1 has-text-centered has-text-black">Add An Address</p>
                        <div className="columns has-margin-top-1">
                            <div className="column">
                                <InputField props={address_1} />
                            </div>
                            <div className="column">
                                <InputField  props={address_2} />
                            </div>
                        </div>
                        <div className="columns">
                            <div className="column">
                                <InputField  props={city} />
                            </div>
                            <div className="column">
                                <Select props={state} data={states.data} />
                            </div>
                            <div className="column">
                                <InputField props={zip} />
                            </div>
                        </div>
                    </div>
                    {/* testing adding additional people inputs */}
                    <hr className="is-light-gray"/>
                    <div>
                        <p className="subtitle is-3 has-margin-top-1 has-text-centered has-text-black">Optional Personal Information</p>
                        <div className="columns has-margin-top-1">
                            <FamilyMembers ref={familyRef} />
                            <div className="column">
                                <InputField props={license} />
                                <div className="box">
                                    <InputField props={licenseImg} />
                                </div>
                            </div>
                        </div>
                        <InputField props={monthlyIncome} />
                    </div>
                    <hr className="is-light-gray"/>
                    {/* Asking for dietary restrictions */}
                    <p className="right-most" title="Substitutions allow users to choose different items that align with their dietary restrictions to add to their total cart.">* Opt for substitutions.</p>
                    <p className="subtitle is-3 has-text-centered has-text-black">Dietary Restrictions*</p>
                    <DietaryRestrictions ref={dietRef}/>
                    <div className="has-text-centered">
                        <button className="button is-success has-margins-0-5" type="button" onClick={handleClick}>Sign Up</button>
                    </div>
                </div>
            </form>
        </div>
    );
}
export default SignupSocial;