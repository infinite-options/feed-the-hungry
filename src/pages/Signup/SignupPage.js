import React, { useState } from "react";

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
import ScrollToTopOnMount from "utils/Scroll/ScrollToTopOnMount";
import Icons from "components/Icons/Icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import Notifications from "components/Notifications/Notifications";
// import SignupLayout from "pages/Signup/SignupLayout.js";
import FarmersMarket from 'assets/image/farmers-market.jpg';

function SignupPage() {
    // User data
    const firstName = useField("text");
    const lastName = useField("text");
    const dob = useField("text");
    const phoneNumber = useField("text");
    const email = useField("email");
    const emailConfirm = useField("email");
    const password = useField("password")
    const passwordConfirm = useField("password")
    // User address
    const address_1 = useField("text");
    const address_2 = useField("text");
    const city = useField("text");
    const state = useField("text");
    const zip = useField("text");
    // Dietary restrictions
    const vegan = useField("checkbox");
    const vegetarian = useField("checkbox");
    const glutenFree = useField("checkbox");
    const kosher = useField("checkbox");
    const halal = useField("checkbox");
    const none = useField("checkbox");
    const [hidden, setHidden] = useState("hidden");
    let hasRestrictions = false;

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const handleClick = () => {
        console.log("User has tried to sign up..")
        if (firstName.value.length === 0) firstName.setError(true);
        if (lastName.value.length === 0) lastName.setError(true);
        if (dob.value.length === 0) dob.setError(true);
        if (phoneNumber.value.length === 0) phoneNumber.setError(true);
        if (email.value.length === 0) email.setError(true);
        if (emailConfirm.value.length === 0) emailConfirm.setError(true);
        if (password.value.length === 0) password.setError(true);
        if (passwordConfirm.value.length === 0) passwordConfirm.setError(true);
        if (address_1.value.length === 0) address_1.setError(true);
        if (city.value.length === 0) city.setError(true);
        if (state.value.length === 0) state.setError(true);
        if (zip.value.length === 0) zip.setError(true);
        hasRestrictions = vegan.value || vegetarian.value || glutenFree.value || kosher.value || halal.value
        if (!none.value && !hasRestrictions) setHidden("");
    }

    return (
        <div className="banks-page-bd">
            {/* Background image */}
            <figure className="image is-3by1" style={{opacity: "0.25"}}>
                <img src={FarmersMarket}></img>
            </figure>
            <div className="columns is-centered overlay-signup-text">
                <form onSubmit={handleSubmit}>
                    {/* Asking for user data */}
                    <div>
                        <p className="subtitle is-1 has-margin-top-1 has-text-centered">Sign Up</p>
                        <div className="columns has-margin-top-1">
                            <div className="column">
                                <InputField label="First Name" props={firstName} />
                            </div>
                            <div className="column">
                                <InputField label="Last Name" props={lastName} />
                            </div>
                            <div className="column">
                                <InputField label="Date of Birth" props={dob} />
                            </div>
                        </div>
                        <InputField label="Phone Number" props={phoneNumber} />
                        <div className="columns">
                            <div className="column">
                                <InputField label="Email Address" props={email} />
                            </div>
                            <div className="column">
                                <InputField label="Confirm Email" props={emailConfirm} />
                            </div>
                        </div>
                        <div className="columns">
                            <div className="column">
                                <InputField label="Password" props={password} />
                            </div>
                            <div className="column">
                                <InputField label="Confirm Password" props={passwordConfirm} />
                            </div>
                        </div>
                    </div>
                    <hr></hr>
                    {/* Asking for user address */}
                    <div>
                        <p className="subtitle is-3 has-margin-top-1 has-text-centered">Would you like to add a permanent address?</p>
                        <p className="subtitle is-4 has-text-centered">Or <u>use my current location</u> instead.</p>
                        <p className="subtitle is-4 has-margin-top-1 has-text-centered">Add An Address</p>
                        <div className="columns has-margin-top-1">
                            <div className="column">
                                <InputField label="Address 1" props={address_1} />
                            </div>
                            <div className="column">
                                <InputField label="Address 2" props={address_2} />
                            </div>
                        </div>
                        <div className="columns">
                            <div className="column">
                                <InputField label="City" props={city} />
                            </div>
                            <div className="column">
                                <InputField label="State" props={state} />
                            </div>
                            <div className="column">
                                <InputField label="ZIP" props={zip} />
                            </div>
                        </div>
                    </div>
                    <hr></hr>
                    {/* Asking for dietary restrictions */}
                    <p className="right-most" title="Substitutions allow users to choose different items that align with their dietary restrictions to add to their total cart.">* Opt for substitutions.</p>
                    <p className="subtitle is-3 has-text-centered">Dietary Restrictions*</p>
                    <InputField label="Vegan" props={vegan} />
                    <InputField label="Vegetarian" props={vegetarian} />
                    <InputField label="Gluten Free" props={glutenFree} />
                    <InputField label="Kosher" props={kosher} />
                    <InputField label="Halal" props={halal} />
                    <InputField label="N/A" props={none} />
                    {/* FIXME: Message shows when selecting any dietary restriction checkbox AFTER leaving all checkboxes empty & clicking Sign Up button*/}
                    <div className={hidden === "" && (none.value || hasRestrictions) ? "hidden" : hidden}>
                        <article class="message is-danger error-msg">
                            <div class="message-body">Please select any dietary restrictions you have. If none are applicable, please select N/A.</div>
                        </article>
                    </div>
                    <div className="has-text-centered">
                        <button className="button is-success has-margin-top-1 has-margin-bottom-0-5" onClick={handleClick}>Sign Up</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default SignupPage;
