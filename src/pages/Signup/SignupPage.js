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
import InputField from "components/Form/InputField";
import ScrollToTopOnMount from "utils/Scroll/ScrollToTopOnMount";
import Icons from "components/Icons/Icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import Notifications from "components/Notifications/Notifications";
// import SignupLayout from "pages/Signup/SignupLayout.js";
import FarmersMarket from 'assets/image/farmers-market.jpg';

function SignupPage() {
    // User data
    const firstName = useField("First Name", "text");
    const lastName = useField("Last Name","text");
    const dob = useField("Date of Birth", "text");
    const phoneNumber = useField("Phone Number", "text");
    const email = useField("Email Address", "email");
    const emailConfirm = useField("Confirm Email", "email");
    const password = useField("Password","password")
    const passwordConfirm = useField("Confirm Password", "password")
    // User address
    const address_1 = useField("Address 1", "text");
    const address_2 = useField("Address 2", "text", false);
    const city = useField("City", "text");
    const state = useField("State", "text");
    const zip = useField("Zip", "text");
    // Dietary restrictions
    const vegan = useField("Vegan", "checkbox");
    const vegetarian = useField("Vegetarian", "checkbox");
    const glutenFree = useField("Gluten Free", "checkbox");
    const kosher = useField("Kosher", "checkbox");
    const halal = useField("Halal", "checkbox");
    const none = useField("None", "checkbox");
    const [hidden, setHidden] = useState("hidden");
    let hasRestrictions = vegan.value || vegetarian.value || glutenFree.value || kosher.value || halal.value;

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const handleClick = () => {
        console.log("User has tried to sign up..")
        firstName.onButtonClick();
        lastName.onButtonClick();
        dob.onButtonClick();
        phoneNumber.onButtonClick();
        email.onButtonClick();
        emailConfirm.onButtonClick();
        password.onButtonClick();
        passwordConfirm.onButtonClick();
        address_1.onButtonClick();
        address_2.onButtonClick();
        city.onButtonClick();
        state.onButtonClick();
        zip.onButtonClick();

        if (!none.value && !hasRestrictions) setHidden("");
    }

    return (
        <div className="banks-page-bd">
            {/* Background image */}
            {/* <figure className="image is-3by1t" style={{opacity: "0.25"}}>
                <img src={FarmersMarket}></img>
            </figure> */}
            <div className="columns is-centered signup-background-image">
                <form onSubmit={handleSubmit}>
                    <div className="column has-text-black">
                        {/* Asking for user data */}
                        <div>
                            <p className="subtitle is-1 has-margin-top-1 has-text-centered has-text-black">Sign Up</p>
                            <div className="columns has-margin-top-1">
                                <div className="column">
                                    <InputField props={firstName} />
                                </div>
                                <div className="column">
                                    <InputField  props={lastName} />
                                </div>
                                <div className="column">
                                    <InputField  props={dob} />
                                </div>
                            </div>
                            <InputField props={phoneNumber} />
                            <div className="columns">
                                <div className="column">
                                    <InputField props={email} />
                                </div>
                                <div className="column">
                                    <InputField  props={emailConfirm} />
                                </div>
                            </div>
                            <div className="columns">
                                <div className="column">
                                    <InputField  props={password} />
                                </div>
                                <div className="column">
                                    <InputField props={passwordConfirm} />
                                </div>
                            </div>
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
                                    <InputField  props={state} />
                                </div>
                                <div className="column">
                                    <InputField props={zip} />
                                </div>
                            </div>
                        </div>
                        <hr className="is-light-gray"/>
                        {/* Asking for dietary restrictions */}
                        <p className="right-most" title="Substitutions allow users to choose different items that align with their dietary restrictions to add to their total cart.">* Opt for substitutions.</p>
                        <p className="subtitle is-3 has-text-centered has-text-black">Dietary Restrictions*</p>
                        <InputField props={vegan} />
                        <InputField props={vegetarian} />
                        <InputField props={glutenFree} />
                        <InputField props={kosher} />
                        <InputField props={halal} />
                        <InputField props={none} />
                        <div className={hidden === "" && (none.value || hasRestrictions === true) ? "hidden" : hidden}>
                            <article className="message is-danger error-msg">
                                <div className="message-body">Please select any dietary restrictions you have. If none are applicable, please select N/A.</div>
                            </article>
                        </div>
                        <div className="has-text-centered">
                            <button className="button is-success has-margin-top-1 has-margin-bottom-0-5" onClick={handleClick}>Sign Up</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default SignupPage;
