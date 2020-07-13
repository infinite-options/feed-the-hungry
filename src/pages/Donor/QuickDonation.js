import React, { useState } from "react";

import useField from "components/Hooks/useField";
import InputField from "components/Form/InputField";

function QuickDonation() {
    // isRequired values are set to false, not because they're optional, but rather because this allows
    // me to control the error display.
    // so in this case, you can think of the isRequired value as being isCheckingRequirementOnChange!
    const firstName = useField("First Name", "text", false);
    const lastName = useField("Last Name", "text", false);
    const email = useField("Email Address", "email", false);
    const phone = useField("Phone Number", "tel", false);

    const handleClick = () => {
        // check if inputs are filled
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <form className="has-text-left" onSubmit={handleSubmit} style={{width: "480px", maxWidth: "100%", margin: "auto"}}>
            <div className="columns">
                <div className="column">
                    <InputField props={firstName} />
                </div>
                <div className="column">
                <InputField props={lastName} />
                </div>
            </div>
            {/* <div className="columns">
                <div className="column"> */}
                <InputField props={email} />
                {/* </div>
                <div className="column"> */}
                <InputField props={phone} />
                {/* </div>
            </div> */}
            <div className="has-text-centered">
                <button className="button is-success" onClick={handleClick}>Submit</button>
            </div>
        </form>
    );
}

export default QuickDonation;
