import React, { useState, useRef, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";

import axios from 'axios';
import StateAPI from 'API/StateAPI';
import useField from "components/Hooks/useField";
import InputField from "components/Form/InputField";
import Select from 'components/Form/Select';
import DietaryRestrictions from "pages/Signup/DietaryRestrictions";
import FamilyMembers from "pages/Signup/FamilyMembers";
import ErrorPage from 'pages/Error/ErrorPage';
import DateInputField from 'components/Form/DateInputField';
import useDate from 'components/Hooks/useDate';

function SignupForm(props) {
    // customer form: [Name, Phone, DOB, Email, Password]
    //                [Address (optional)]
    //                [Additional Personal Information (optional)]

    // donor form: [Name, Phone, DOB, Email, Password]
    //             [Address]

    // admin form: [Name, Phone, DOB, Email, Password]
    //             [Address]
    //             [Who you work for]
    //             [etc]

    // foodbank form: [Name, Phone, DOB, Email, Password]
    //                [Address]
    //                [Which foodbank are you]
    //                [etc]

    /* 
     * props.signupStatus will be used to check whether the form should
     * contain certain inputFields or whether the form should do a validation
     * check on certain inputFields.
     * 
     * Ex: Donor signup does not have Dietary Restrictions inputFields, so those
     *     fields do not exist on the form and handleClick() function will not check for
     *     whether the user selected a value. 
     *     If the function did check, the page would fail to render, since it would be trying to
     *     get the value property of an undefined variable.
     */
    const SOCIAL_SIGNUP_API = "https://dc3so1gav1.execute-api.us-west-1.amazonaws.com/dev/api/v2/socialsignup";
    const SIGNUP_API = "https://dc3so1gav1.execute-api.us-west-1.amazonaws.com/dev/api/v2/signup";

    const states = StateAPI();
    const history = useHistory();
    // const dietRef = useRef();
    const familyRef = useRef();
    const location = useLocation();

    const signupStatus = props.signupStatus;
    const isSocial = props.isSocial;
    const inputs = {
        firstName : useField("First Name", "text"),
        lastName : useField("Last Name","text"),
        dob : useDate("Date of Birth", false, null, new Date()),
        phoneNumber : useField("Phone Number", "tel"),
        email : useField("Email Address", "email"),
        emailConfirm : useField("Confirm Email", "email", isSocial ? false : true),
        password : useField("Password","password", isSocial ? false : true),
        passwordConfirm : useField("Confirm Password", "password", isSocial ? false : true),
        address_1 : useField("Address 1", "text", (signupStatus === "customer" ? false : true)),
        address_2 : useField("Address 2", "text", false),
        city : useField("City", "text", (signupStatus === "customer" ? false : true)),
        state : useField("State", "text", (signupStatus === "customer" ? false : true)),
        zip : useField("Zip", "text", (signupStatus === "customer" ? false : true)),

        license: useField("Drivers License", "text", false),
        licenseImg: useField("License Image", "file", false),
        monthlyIncome : useField("Monthly Income", "number", false),
    }

    const [accessToken, setAccessToken] = useState();
    const [refreshToken, setRefreshToken] = useState();
    const [socialMedia, setSocialMedia] = useState();

    useEffect(() => {
        (async function setSignupParams(state) {
            if (isSocial && state) {
                await setParams(state);
            }
        })(location.state);
    }, []);
    
    function setParams(state) {
        inputs.email.setValue(state.email);
        inputs.firstName.setValue(state.firstname ? state.firstname : "");
        inputs.lastName.setValue(state.lastname ? state.lastname : "");

        setAccessToken(state.accessToken);
        setRefreshToken(state.refreshToken);
        setSocialMedia(state.social);
    }

    const validateInputs = () => {
        let isAllValid = true;
        for (let input in inputs) {
            console.log(input, inputs[input].isValid);
            if (!inputs[input].checkInputs() && isAllValid) {
                isAllValid = false;
            }
        }
        return isAllValid;
    }

    const checkSignupStatus = (status) => {
        console.log(status, signupStatus);
        return (status === signupStatus ? 1 : 0);
    }

    const handleClick = () => {
        console.log("User has tried to sign up..")
        const isAllValid = validateInputs();
        // if (signupStatus === "customer") dietRef.current.checkValues();
        
        // Checking if user filled all required inputs
        // let signupPassed = signupStatus === "customer" ? dietRef.current.valid() && isAllValid : isAllValid;
        let signupPassed = isAllValid;
        if (!isSocial && signupPassed) {
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
            data["persons"] = familyRef.current ? familyRef.current.persons : [];
            // data["diet_restrictions"] = dietRef.current ? dietRef.current.restrictions : [];
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
                "phone" : inputs.phoneNumber.value.replace(/\D/g, ""),
                "email" : inputs.email.value,
                "password": inputs.password.value,
                "user_is_customer": checkSignupStatus("customer"),
                "user_is_donor": checkSignupStatus("donor"),
                "user_is_admin": checkSignupStatus("admin"),
                "user_is_foodbank": checkSignupStatus("foodbank"),
            }

            if (isSocial) {
                delete test["password"];
                test["access_token"] = accessToken;
                test["refresh_token"] = refreshToken;
                test["social_media"] = socialMedia;
            }

            console.log("Test:", test);
            axios.post(
                isSocial ? SOCIAL_SIGNUP_API : SIGNUP_API, 
                test
            ).then(response => {
                console.log(response);
                if (response.status === 200) {
                    // Send to verify email page
                    const route = isSocial ? "/login" : "/signup/verify";
                    history.push(route);
                }
            }).catch(err => {
                console.log(err.response);
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

    if (isSocial && !location.state) return <ErrorPage />
    else return (
        <form onSubmit={handleSubmit} onKeyPress={handleKeyPress} style={{width: "720px", maxWidth: "100%", margin: "auto"}}>
            <div className="column has-text-black">
                {/* Asking for user data */}
                <div>
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
                            <DateInputField props={inputs.dob} />
                            {/* <InputField  props={inputs.dob} /> */}
                        </div>
                    </div>
                    <div className="columns">
                        <div className="column">
                            <InputField props={inputs.email} readOnly={isSocial ? true : false} />
                        </div>
                        {!isSocial && (
                            <div className="column">
                                <InputField  props={inputs.emailConfirm} />
                            </div>
                        )}
                    </div>
                    {!isSocial && (
                        <div className="columns">
                            <div className="column">
                                <InputField  props={inputs.password} />
                            </div>
                            <div className="column">
                                <InputField props={inputs.passwordConfirm} />
                            </div>
                        </div>
                    )}
                </div>
                {/* Asking for user address */}
                <hr className="is-light-gray"/>
                <div>
                    {signupStatus === "customer" && (
                        <React.Fragment>
                            <p className="subtitle is-3 has-margin-top-1 has-text-centered has-text-black">Would you like to add a permanent address?</p>
                            <p className="subtitle is-4 has-text-centered has-text-black">Or <u>use my current location</u> instead.</p>
                        </React.Fragment>
                    )}
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
                {/* Asking for additional information */}
                {signupStatus === "customer" && (
                    <React.Fragment>
                        <hr className="is-light-gray"/>
                        <div>
                            <p className="subtitle is-3 has-margin-top-1 has-text-centered has-text-black">Additional Personal Information</p>
                            <div className="columns has-margin-top-1">
                                <FamilyMembers ref={familyRef} />
                                <div className="column">
                                    <InputField props={inputs.license} />
                                    <div className="box">
                                        <InputField props={inputs.licenseImg} />
                                    </div>
                                </div>
                            </div>
                            <InputField props={inputs.monthlyIncome} />
                        </div>
                    </React.Fragment>
                )}
                {/* Asking for dietary restrictions, if any */}
                {/* {signupStatus === "customer" && (
                    <DietaryRestrictions ref={dietRef}/>
                )} */}
                <div className="has-text-centered">
                    <button className="button is-success has-margin-top-1 has-margin-bottom-0-5" type="button" onClick={handleClick}>Sign Up</button>
                </div>
            </div>
        </form>
    );
}
export default SignupForm;
