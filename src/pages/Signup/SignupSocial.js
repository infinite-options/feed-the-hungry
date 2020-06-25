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

function SignupSocial(props) {
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

    useEffect(() => {
        //     console.log(props.location.state)
        //     typeof props.location.state === "undefined" ? console.log("undefined") :  ( typeof props.location.state.email === "undefined" ? console.log("undefined") : setEmail(props.location.state.email) )
        //     typeof props.location.state === "undefined" ? console.log("undefined") :  ( typeof props.location.state.social === "undefined" ? console.log("undefined") : setSocialMedia(props.location.state.social) )
        //     typeof props.location.state === "undefined" ? console.log("undefined") :  ( typeof props.location.state.accessToken === "undefined" ? console.log("undefined") : setAccessToken(props.location.state.accessToken) )
        //     typeof props.location.state === "undefined" ? console.log("undefined") :  ( typeof props.location.state.refreshToken === "undefined" ? console.log("undefined") : setRefreshToken(props.location.state.refreshToken) )
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

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <div className="login-signup-page signup-background-image">
            <form onSubmit={handleSubmit} style={{width: "720px", maxWidth: "100%"}}>
                <div className="column has-text-black">
                    {/* Asking for user data */}
                    <div>
                        <p className="subtitle is-1 has-margin-top-1 has-text-centered has-text-black">Sign Up</p>
                        <div className="columns has-margin-top-1">
                            <div className="column">
                                <input className="input" type="text" value={firstname} />
                            </div>
                            <div className="column">
                                <input className="input" type="text" value={lastname} />
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
                        <input className="input" type="text" value={email} />
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
                                {/* {showForm ? (
                                    <React.Fragment>
                                        <button className="button is-success has-margins-0-5" onClick={clearPersonForm}>Cancel</button>
                                        <button className="button is-success has-margins-0-5" onClick={savePerson}>Save</button>
                                    </React.Fragment>
                                ) : (
                                    <button className="button is-success has-margins-0-5" onClick={() => setShowForm(true)}>Add a Family Member</button>
                                )}
                                {showForm && (
                                    <React.Fragment>
                                        <InputField props={addition.a_firstName} />
                                        <InputField props={addition.a_lastName} />
                                        <InputField props={addition.a_dob} />
                                    </React.Fragment>
                                )} */}
                                <div className="box">
                                    {/* {listPersons()} */}
                                </div>
                            </div>
                            <div className="column">
                                {/* <InputField props={inputs.license} /> */}
                                <div className="box">
                                    {/* <InputField props={inputs.licenseImg} /> */}
                                </div>
                            </div>

                            {/* <div className="column">
                                <div className="box">
                                    {listPersons()}
                                </div>
                            </div> */}
                        </div>
                        {/* <div className="columns">
                            <div className="column">
                                <InputField props={inputs.license} />
                            </div>
                            <div className="column">
                                <div className="box">
                                    <InputField props={inputs.licenseImg} />
                                </div>
                            </div>
                        </div> */}
                        {/* Adding $ to income input */}
                        <div className="field-body">
                            <div className="field is-expanded">
                                <div className="field has-addons">
                                    <div className="control">
                                        <a className="button is-static">$</a>
                                    </div>
                                    <div className="control is-expanded">
                                        {/* <InputField props={inputs.monthlyIncome} /> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr className="is-light-gray"/>
                    {/* Asking for dietary restrictions */}
                    <p className="right-most" title="Substitutions allow users to choose different items that align with their dietary restrictions to add to their total cart.">* Opt for substitutions.</p>
                    <p className="subtitle is-3 has-text-centered has-text-black">Dietary Restrictions*</p>
                    {/* <InputField props={inputs.vegan} icon={Icons.Vegan} isDisabled={noneSelected}/>
                    <InputField props={inputs.vegetarian} icon={Icons.Vegetarian} isDisabled={noneSelected} />
                    <InputField props={inputs.glutenFree} icon={Icons.GlutenFree} isDisabled={noneSelected} />
                    <InputField props={inputs.kosher} icon={Icons.Kosher} isDisabled={noneSelected} />
                    <InputField props={inputs.halal} icon={Icons.Halal} isDisabled={noneSelected} />
                    <InputField props={inputs.none} isDisabled={hasRestrictions} /> */}
                    {/* <div className={hidden === "" && (inputs.none.value || hasRestrictions === true) ? "hidden" : hidden}>
                        <article className="message is-danger error-msg">
                            <div className="message-body">Please select any dietary restrictions you have. If none are applicable, please select N/A.</div>
                        </article>
                    </div>
                    <div className="has-text-centered">
                        <button className="button is-success has-margins-0-5" type="button" onClick={handleClick}>Sign Up</button>
                    </div> */}
                </div>
            </form>
        </div>
    );
}
export default SignupSocial;