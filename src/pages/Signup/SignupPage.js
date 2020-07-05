import React, { useRef } from "react";
import { useHistory } from "react-router-dom";

import axios from 'axios';
import StateAPI from 'API/StateAPI';
import "pages/styles.css";
import useField from "components/Hooks/useField";
import InputField from "components/Form/InputField";
import Select from 'components/Form/Select';
import DietaryRestrictions from "pages/Signup/DietaryRestrictions";
import FamilyMembers from "pages/Signup/FamilyMembers";

function SignupPage() {
    const states = StateAPI();
    const history = useHistory();
    const dietRef = useRef();
    const familyRef = useRef();

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

        license: useField("Drivers License", "text", false),
        licenseImg: useField("License Image", "file", false),
        monthlyIncome : useField("Monthly Income", "number", false),
    }

    const validateInputs = () => {
        // let isAllValid = true;
        for (let input in inputs) {
            if (!inputs[input].isValid) {
                return false;
            }
        }
        return true;
    }

    const handleClick = () => {
        console.log("User has tried to sign up..")
        const isAllValid = validateInputs();
        dietRef.current.checkValues();
        
        // Checking if user filled all required inputs
        let signupPassed = dietRef.current.valid() && isAllValid;
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
                if (inputs[input].type !== "file") data[input] = inputs[input].value;
                else data[input] = inputs[input].file;
            }
            // console.log("persons" + ":", persons);
            data["persons"] = familyRef.current.persons;
            console.log("Data:", data);
            console.log("we did it!");
            let test = {
                "first_name" : inputs.firstName.value,
                "last_name" : inputs.lastName.value,
                "address1" : inputs.address_1.value,
                "address2" : inputs.address_2.value,
                "city" : inputs.city.value,
                "state" : inputs.state.value,
                "zipcode" : inputs.zip.value,
                "phone" : inputs.phoneNumber.value,
                "email" : inputs.email.value,
                "password": inputs.password.value
            }
            console.log("Test:", test);
            // axios.post(
            //     "https://dc3so1gav1.execute-api.us-west-1.amazonaws.com/dev/api/v2/signup", 
            //     test
            // ).then(response => {
            //     console.log(response);
            //     if (response.status === 200) {
            //         // Send to verify email page
            //         history.push('/signup/verify');
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
                            <FamilyMembers ref={familyRef} />
                            <div className="column">
                                <InputField props={inputs.license} />
                                <div className="box">
                                    <InputField props={inputs.licenseImg} />
                                </div>
                            </div>
                        </div>
                        {/* Adding $ to income input */}
                        <InputField props={inputs.monthlyIncome} />
                        {/* <div className="field-body">
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
                        </div> */}
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
export default SignupPage;
