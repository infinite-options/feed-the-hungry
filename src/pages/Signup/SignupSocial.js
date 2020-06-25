import React, { useState, useEffect } from "react";

import {
    // BrowserRouter as Router,
    // Switch,
    // Route,
    // Link,
    // useRouteMatch,
    // useParams,
    useHistory,
    useLocation
  } from "react-router-dom";

import axios from 'axios';
// import history from 'pages/App/History';

import StateAPI from 'API/StateAPI';
import "pages/styles.css";
import useField from "components/Hooks/useField";
import InputField from "components/Form/InputField";
import Select from 'components/Form/Select';
import ScrollToTopOnMount from "utils/Scroll/ScrollToTopOnMount";
import Icons from "components/Icons/Icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import Notifications from "components/Notifications/Notifications";
// import SignupLayout from "pages/Signup/SignupLayout.js";
// import FarmersMarket from 'assets/image/farmers-market.jpg';

function SignupSocial() {
    const states = StateAPI();
    const location = useLocation();

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

    const a_firstName = useField("First Name", "text");
    const a_lastName = useField("Last Name", "text");
    const a_dob = useField("Date of Birth", "date");

    const [hidden, setHidden] = useState("hidden");
    const [persons, setPersons] = useState([]);
    const [showForm, setShowForm] = useState(false);

    let hasRestrictions = vegan.value || vegetarian.value
                       || glutenFree.value || kosher.value 
                       || halal.value;
    let noneSelected = !!none.value;

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

    const savePerson = () => {
        let data = [
            a_firstName.value, 
            a_lastName.value, 
            a_dob.value, 
        ]
        let isAllValid = true;
        if (!a_firstName.validate() | !a_lastName.validate() | !a_dob.validate()) {
            isAllValid = false;
        }

        if (isAllValid) {
            persons.push(data);
            setPersons([...persons]);
            
            clearPersonForm();
            console.log(persons);
        }
    }

    const delPerson = (idx) => {
        persons.splice(idx, 1);
        console.log(idx);
        console.log(persons);
        setPersons([...persons]);
    }

    const clearPersonForm = () => {
        a_firstName.resetinput();
        a_lastName.resetinput();
        a_dob.resetinput();
        setShowForm(false);
    }

    function listPersons() {
        return (
            <div className="column">
                {persons.map((person, idx) => (
                    <p key={idx}>
                        {person[0] + ' ' + person[1]} <button onClick={() => delPerson(idx)}> X </button>
                    </p>
                ))}
            </div>
        );
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
        if (!none.value && !hasRestrictions) setHidden("");
        
        // Checking if user filled all required inputs
        let signupPassed = (none.value || hasRestrictions) && isAllValid;

        if(signupPassed) {
            // Testing to see if all values went through
            let data = {};
            // for (let input in inputs) {
            //     // console.log(input + ":", inputs[input].value);
            //     if (inputs[input].type !== "file") data[input] = inputs[input].value;
            //     else data[input] = inputs[input].file;
            // }
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
            data["persons"] = persons;
            console.log("Data:", data);
            console.log("we did it!");
            let test = {
                "first_name" : firstname.value,
                "last_name" : lastname.value,
                "address1" : address_1.value,
                "address2" : address_2.value,
                "city" : city.value,
                "state" : state.value,
                "zipcode" : zip.value,
                "phone" : phoneNumber.value,
                "email" : email.value,
                "accessToken": accessToken,
                "refreshToken": refreshToken,
                "socialMedia": socialMedia,
            }
            // axios.post(
            //     "API GOES HERE", 
            //     test
            // ).then(response => {
            //     console.log(response);
            //     if (response.status === 200) {
            //         // Log user in
            //     }
            // })
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
                            <div className="column has-text-centered">
                                {showForm ? (
                                    <React.Fragment>
                                        <button className="button is-success has-margins-0-5" onClick={clearPersonForm}>Cancel</button>
                                        <button className="button is-success has-margins-0-5" onClick={savePerson}>Save</button>
                                    </React.Fragment>
                                ) : (
                                    <button className="button is-success has-margins-0-5" onClick={() => setShowForm(true)}>Add a Family Member</button>
                                )}
                                {showForm && (
                                    <React.Fragment>
                                        <InputField props={a_firstName} />
                                        <InputField props={a_lastName} />
                                        <InputField props={a_dob} />
                                    </React.Fragment>
                                )}
                                <div className="box">
                                    {listPersons()}
                                </div>
                            </div>
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
                    <InputField props={vegan} icon={Icons.Vegan} isDisabled={noneSelected}/>
                    <InputField props={vegetarian} icon={Icons.Vegetarian} isDisabled={noneSelected} />
                    <InputField props={glutenFree} icon={Icons.GlutenFree} isDisabled={noneSelected} />
                    <InputField props={kosher} icon={Icons.Kosher} isDisabled={noneSelected} />
                    <InputField props={halal} icon={Icons.Halal} isDisabled={noneSelected} />
                    <InputField props={none} isDisabled={hasRestrictions} />
                    <div className={hidden === "" && (none.value || hasRestrictions === true) ? "hidden" : hidden}>
                        <article className="message is-danger error-msg">
                            <div className="message-body">Please select any dietary restrictions you have. If none are applicable, please select N/A.</div>
                        </article>
                    </div>
                    <div className="has-text-centered">
                        <button className="button is-success has-margins-0-5" type="button" onClick={handleClick}>Sign Up</button>
                    </div>
                </div>
            </form>
        </div>
    );
}
export default SignupSocial;