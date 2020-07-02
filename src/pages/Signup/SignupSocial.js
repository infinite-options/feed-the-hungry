import React, { useState, useEffect, useRef } from "react";

import { useLocation } from "react-router-dom";

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
    const dietRef = useRef();
    const familyRef = useRef();

    const [email, setEmail] = useState("");
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [accessToken, setAccessToken] = useState("");
    const [refreshToken, setRefreshToken] = useState("");
    const [socialMedia, setSocialMedia] = useState("");

    const phoneNumber = useField("Phone Number", "tel");
    const dob = useField("Date of Birth", "date");
    const address_1 = useField("Address 1", "text");
    const address_2 = useField("Address 2", "text", false);
    const city = useField("City", "text");
    const state = useField("State", "text");
    const zip = useField("Zip", "text");
    const vegan = useField("Vegan", "checkbox");
    const vegetarian = useField("Vegetarian", "checkbox");
    const glutenFree = useField("Gluten Free", "checkbox");
    const kosher = useField("Kosher", "checkbox");
    const halal = useField("Halal", "checkbox");
    const none = useField("None", "checkbox");

    const license= useField("Drivers License", "text", false);
    const licenseImg= useField("License Image", "file", false);
    const monthlyIncome = useField("Monthly Income", "number", false);

    useEffect(() => {
        (async function setSignupParams(state) {
            if (state) {
                await setParams(state);
            }
        })(location.state);
    }, []);
    
    function setParams(state) {
        setEmail(state.email);
        setLastName(state.lastname);
        setFirstName(state.firstname);
        setAccessToken(state.accessToken);
        setRefreshToken(state.refreshToken);
        // setSOCIAL_API_URL(state.SOCIAL_API_URL);
        setSocialMedia(state.social);
    }

    const validateInputs = () => {
        let isAllValid = true;
        if (!phoneNumber.validate() |
            !dob.validate() |
            !address_1.validate() |
            !address_2.validate() |
            !city.validate() |
            !state.validate() |
            !zip.validate() |
            !vegan.validate() |
            !vegetarian.validate() |
            !glutenFree.validate() |
            !kosher.validate() |
            !halal.validate() |
            !none.validate()) {
            isAllValid = false;
        }
        return isAllValid;
    }

    const handleClick = () => {
        console.log("User has tried to sign up..")
        let isAllValid = validateInputs();
        dietRef.current.checkValues();
        
        // Checking if user filled all required inputs
        let signupPassed = dietRef.current.valid() && isAllValid;

        if(signupPassed) {
            // Testing to see if all values went through
            let data = {};
            data["email"] = email;
            data["firstname"] = firstname;
            data["lastname"] = lastname;
            data["accessToken"] = accessToken;
            data["refreshToken"] = refreshToken;
            data["socialMedia"] = socialMedia;

            data["phoneNumber"] = phoneNumber.value;
            data["dob"] = dob.value;
            data["address_1"] = address_1.value;
            data["address_2"] = address_2.value;
            data["city"] = city.value;
            data["state"] = state.value;
            data["zip"] = zip.value;
            data["vegan"] = vegan.value;
            data["vegetarian"] = vegetarian.value;
            data["glutenFree"] = glutenFree.value;
            data["kosher"] = kosher.value;
            data["halal"] = halal.value;
            data["none"] = none.value;
            // console.log("persons" + ":", persons);
            data["persons"] = familyRef.current.persons;
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
                "accessToken": accessToken,
                "refreshToken": refreshToken,
                "socialMedia": socialMedia,
            }
            console.log("Test:", test);
            // axios.post(
            //     "${API_URL}", 
            //     test
            // ).then(response => {
            //     console.log(response);
            //     if (response.status === 200) {
            //         // Log user in
            //     }
            // }).catch(err => {
            //     console.log(err);
            // });
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
                                {/* Adding [+1] phone number button */}
                                <div className="field-body">
                                    <div className="field is-expanded">
                                        <div className="field has-addons">
                                            <div className="control">
                                                <a className="button is-static">+1</a>
                                            </div>
                                            <div className="control is-expanded">
                                                <InputField props={phoneNumber} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
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
                        {/* Adding $ to income input */}
                        <div className="field-body">
                            <div className="field is-expanded">
                                <div className="field has-addons">
                                    <div className="control">
                                        <a className="button is-static">$</a>
                                    </div>
                                    <div className="control is-expanded">
                                        <InputField props={monthlyIncome} />
                                    </div>
                                </div>
                            </div>
                        </div>
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