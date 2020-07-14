import React, { useState, useContext } from "react";

import useLogin from "components/Hooks/useLogin";
import LoginField from "components/Form/LoginField";
import useField from "components/Hooks/useField";
import InputField from "components/Form/InputField";

function QuickDonation() {
    // isRequired values are set to false, not because they're optional, but rather because this allows
    // me to control the error display.
    // so in this case, you can think of the isRequired value as being isCheckingRequirementOnChange!
    const firstName = useField("First Name", "text");
    const lastName = useField("Last Name", "text");
    const email = useField("Email Address", "email");
    const phone = useField("Phone Number", "tel");
    const donation = useField("Donation Details", "text");

    const handleClick = () => {
        console.log("User has tried to submit donation..")
        if (firstName.isValid && lastName.isValid && 
            email.isValid && phone.isValid) {
            console.log("we did it!");
        }
        else {
            console.log("User has failed to submit..");
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <form className="has-text-left" onSubmit={handleSubmit} style={{width: "480px", maxWidth: "100%", margin: "auto"}}>
            <div className="column">
                <div className="columns">
                    <div className="column">
                        <InputField props={firstName} errorOnSubmit={true} />
                    </div>
                    <div className="column">
                    <InputField props={lastName} />
                    </div>
                </div>
                <InputField props={email} />
                <InputField props={phone} />
                <textarea className={!donation.isValid ? "textarea is-danger" : "textarea"} placeholder="Donation details..." value={donation.value} onChange={donation.onChange}></textarea>
                <p className="help is-danger">{donation.error}</p>
                <div className="has-text-centered">
                    <button className="button is-success has-margins-0-5" onClick={handleClick}>Submit</button>
                </div>
            </div>
        </form>
    );
}

export default QuickDonation;
