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
    const inputs = {
        firstName : useField("First Name", "text"),
        lastName : useField("Last Name","text"),
        dob : useField("Date of Birth", "text"),
        phoneNumber : useField("Phone Number", "tel"),
        email : useField("Email Address", "email"),
        emailConfirm : useField("Confirm Email", "email"),
        password : useField("Password","password"),
        passwordConfirm : useField("Confirm Password", "password"),
        address_1 : useField("Address 1", "text"),
        address_2 : useField("Address 2", "text", false),
        city : useField("City", "text"),
        state : useField("State", "text"),
        zip : useField("Zip", "text"),
        vegan : useField("Vegan", "checkbox"),
        vegetarian : useField("Vegetarian", "checkbox"),
        glutenFree : useField("Gluten Free", "checkbox"),
        kosher : useField("Kosher", "checkbox"),
        halal : useField("Halal", "checkbox"),
        none : useField("None", "checkbox"),
    }

    const [hidden, setHidden] = useState("hidden");
    let hasRestrictions = inputs.vegan.value || inputs.vegetarian.value
                       || inputs.glutenFree.value || inputs.kosher.value 
                       || inputs.halal.value;

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const validateInputs = () => {
        let isAllValid = true;
        for (let input in inputs) {
            if (!inputs[input].validatewith()) {
                isAllValid = false;
            }
        }
        return isAllValid;
    }

    const handleClick = () => {
        console.log("User has tried to sign up..")
        let isAllValid = validateInputs();
        if (!inputs.none.value && !hasRestrictions) setHidden("");
        
        // Checking if user filled all required inputs
        let signupPassed = (inputs.none.value || hasRestrictions) && isAllValid;
        if (signupPassed) {
            // Checking if email/password matches its confirmed
            if(inputs.email.value !== inputs.emailConfirm.value) {
                // Email mismatch error message goes here
                console.log("Email mismatch.");
                signupPassed = false;
            }
            if(inputs.password.value !== inputs.passwordConfirm.value) {
                // Password mismatch error message goes here
                console.log("Password mismatch.");
                signupPassed = false;
            }
        }

        if(signupPassed) {
            // Testing to see if all values went through
            for (let input in inputs) {
                // console.log(input + ":", inputs[input].value);
                console.log("we did it!");
            }

            // Code
        }
        else {
            console.log("Sign up failed...");
        }
    }

    // Testing adding additional people
    const [additions, setAdditions] = useState([]);
    const handleAddClick = () => {
        additions.push({firstName: "", lastName: "", dob: ""});
        setAdditions([...additions]);
    }

    return (
        <div className="login-signup-page signup-background-image">
            {/* testing adding additional people inputs */}
            <button class="button is-success has-margins-0-5" onClick={handleAddClick}>testing dynamic inputs</button>
            {additions.map((val, idx) => {
                return (
                    <div className="has-margins-0-5" key={idx}>
                        <label className="label">Person {idx}</label>
                        <div className="field">
                            <div className="control">
                                <input className="input" type="text" placeholder="First Name"></input>
                            </div>
                        </div>
                        <div className="field">
                            <div className="control">
                                <input className="input" type="text" placeholder="Last Name"></input>
                            </div>
                        </div>
                        <div className="field">
                            <div className="control">
                                <input className="input" type="text" placeholder="Date of Birth"></input>
                            </div>
                        </div>
                    </div>
                );
            })}
            <form onSubmit={handleSubmit} style={{width: "720px", maxWidth: "100%"}}>
                <div className="column has-text-black">
                    {/* Asking for user data */}
                    <div>
                        <p className="subtitle is-1 has-margin-top-1 has-text-centered has-text-black">Sign Up</p>
                        <div className="columns has-margin-top-1">
                            <div className="column">
                                <InputField props={inputs.firstName} />
                            </div>
                            <div className="column">
                                <InputField  props={inputs.lastName} />
                            </div>
                        </div>
                        <div className="columns">
                            <div className="column is-8">
                                <InputField props={inputs.phoneNumber} />
                            </div>
                            <div className="column">
                                <InputField  props={inputs.dob} />
                            </div>
                        </div>
                        <div className="columns">
                            <div className="column">
                                <InputField props={inputs.email} />
                            </div>
                            <div className="column">
                                <InputField  props={inputs.emailConfirm} />
                            </div>
                        </div>
                        <div className="columns">
                            <div className="column">
                                <InputField  props={inputs.password} />
                            </div>
                            <div className="column">
                                <InputField props={inputs.passwordConfirm} />
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
                                <InputField props={inputs.address_1} />
                            </div>
                            <div className="column">
                                <InputField  props={inputs.address_2} />
                            </div>
                        </div>
                        <div className="columns">
                            <div className="column">
                                <InputField  props={inputs.city} />
                            </div>
                            <div className="column">
                                <InputField  props={inputs.state} />
                            </div>
                            <div className="column">
                                <InputField props={inputs.zip} />
                            </div>
                        </div>
                    </div>
                    <hr className="is-light-gray"/>
                    {/* Asking for dietary restrictions */}
                    <p className="right-most" title="Substitutions allow users to choose different items that align with their dietary restrictions to add to their total cart.">* Opt for substitutions.</p>
                    <p className="subtitle is-3 has-text-centered has-text-black">Dietary Restrictions*</p>
                    <InputField props={inputs.vegan} icon={Icons.Vegan}/>
                    <InputField props={inputs.vegetarian} icon={Icons.Vegetarian} />
                    <InputField props={inputs.glutenFree} icon={Icons.GlutenFree} />
                    <InputField props={inputs.kosher} icon={Icons.Kosher}/>
                    <InputField props={inputs.halal} icon={Icons.Halal}/>
                    <InputField props={inputs.none} />
                    <div className={hidden === "" && (inputs.none.value || hasRestrictions === true) ? "hidden" : hidden}>
                        <article className="message is-danger error-msg">
                            <div className="message-body">Please select any dietary restrictions you have. If none are applicable, please select N/A.</div>
                        </article>
                    </div>
                    <div className="has-text-centered">
                        <button className="button is-success has-margins-0-5" onClick={handleClick}>Sign Up</button>
                    </div>
                </div>
            </form>
        </div>
    );
}
export default SignupPage;
