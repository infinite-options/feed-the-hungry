import React, { useState } from "react";

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
  } from "react-router-dom";

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
import FarmersMarket from 'assets/image/farmers-market.jpg';

function SignupPage() {
    const states = StateAPI();

    const inputs = {
        firstName : useField("First Name", "text"),
        lastName : useField("Last Name","text"),
        dob : useField("Date of Birth", "date"),
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

        license: useField("Drivers License", "text", false),
        licenseImg: useField("License Image", "file", false),
        monthlyIncome : useField("Monthly Income", "number", false),
    }

    const addition = {
        a_firstName : useField("First Name", "text"),
        a_lastName : useField("Last Name", "text"),
        a_dob : useField("Date of Birth", "text"),
    }

    const [hidden, setHidden] = useState("hidden");
    let hasRestrictions = inputs.vegan.value || inputs.vegetarian.value
                       || inputs.glutenFree.value || inputs.kosher.value 
                       || inputs.halal.value;
    let noneSelected = !!inputs.none.value;

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const handleKeyPress = (e) => {
        if (e.which === 13) {
            e.preventDefault();
        }
    }

    const validateInputs = () => {
        let isAllValid = true;
        for (let input in inputs) {
            if (!inputs[input].validate()) {
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
            let data = {};
            for (let input in inputs) {
                // console.log(input + ":", inputs[input].value);
                data[input] = inputs[input].value;
            }
            // console.log("persons" + ":", persons);
            data["persons"] = persons;
            console.log("Data:", data);
            console.log("we did it!");

            // Code
        }
        else {
            console.log("Sign up failed...");
        }
    }

    // Testing adding additional people
    const [persons, setPersons] = useState([]);
    const [showForm, setShowForm] = useState(false);

    const savePerson = () => {
        let data = [
            addition.a_firstName.value, 
            addition.a_lastName.value, 
            addition.a_dob.value, 
        ]
        let isAllValid = true;
        for (let input in addition) {
            if (!addition[input].validate()) {
                isAllValid = false;
            }
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
        for (let input in addition) {
            addition[input].resetinput();
        }
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

    return (
        <div className="login-signup-page signup-background-image">
            <form onSubmit={handleSubmit} onKeyPress={handleKeyPress} style={{width: "720px", maxWidth: "100%"}}>
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
                                {/* Adding [+1] phone number button */}
                                <div className="field-body">
                                    <div className="field is-expanded">
                                        <div className="field has-addons">
                                            <div className="control">
                                                <a className="button is-static">+1</a>
                                            </div>
                                            <div className="control is-expanded">
                                                <InputField props={inputs.phoneNumber} />
                                            </div>
                                        </div>
                                    </div>
                                </div>

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
                                <Select props={inputs.state} data={states.data} />
                            </div>
                            <div className="column">
                                <InputField props={inputs.zip} />
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
                                        <InputField props={addition.a_firstName} />
                                        <InputField props={addition.a_lastName} />
                                        <InputField props={addition.a_dob} />
                                    </React.Fragment>
                                )}
                            </div>
                            <div className="column">
                                <div className="box">
                                    {listPersons()}
                                </div>
                            </div>
                        </div>
                        <div className="columns">
                            <div className="column">
                                <InputField props={inputs.license} />
                            </div>
                            <div className="column">
                                <div className="box">
                                    <InputField props={inputs.licenseImg} />
                                </div>
                            </div>
                        </div>
                        <div className="field-body">
                            <div className="field is-expanded">
                                <div className="field has-addons">
                                    <div className="control">
                                        <a className="button is-static">$</a>
                                    </div>
                                    <div className="control is-expanded">
                                        <InputField props={inputs.monthlyIncome} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr className="is-light-gray"/>
                    {/* Asking for dietary restrictions */}
                    <p className="right-most" title="Substitutions allow users to choose different items that align with their dietary restrictions to add to their total cart.">* Opt for substitutions.</p>
                    <p className="subtitle is-3 has-text-centered has-text-black">Dietary Restrictions*</p>
                    <InputField props={inputs.vegan} icon={Icons.Vegan} isDisabled={noneSelected}/>
                    <InputField props={inputs.vegetarian} icon={Icons.Vegetarian} isDisabled={noneSelected} />
                    <InputField props={inputs.glutenFree} icon={Icons.GlutenFree} isDisabled={noneSelected} />
                    <InputField props={inputs.kosher} icon={Icons.Kosher} isDisabled={noneSelected} />
                    <InputField props={inputs.halal} icon={Icons.Halal} isDisabled={noneSelected} />
                    <InputField props={inputs.none} isDisabled={hasRestrictions} />
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
