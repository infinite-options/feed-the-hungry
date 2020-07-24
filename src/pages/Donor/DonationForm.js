import React, { useState } from "react";

import useField from "components/Hooks/useField";
import InputField from "components/Form/InputField";

function DonationForm() {
    // 0 -> main page, 1 -> donate produce form, 2 -> donate cash form
    const [onForm, setOnForm] = useState(0);

    const handleClick = (e) => {
        const type = e.target.name;
        const formNumber = type === "cancel" ? 0 : 
                           type === "produce" ? 1 : 
                         /*type === "cash" ?*/ 2;
        setOnForm(formNumber);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <div style={{marginTop: "15vh"}}>
            {onForm === 0 && (
                <React.Fragment>
                    <p className="is-size-4 is-italic">What would you like to donate?</p>
                    <button className="button is-text has-margins-0-5" onClick={handleClick} name="produce">Produce</button>
                    <button className="button is-text has-margins-0-5" onClick={handleClick} name="cash">Cash</button>
                </React.Fragment>
            )}
            {onForm !== 0 && (
                <DonationSubmission name={(onForm === 1 ? "produce" : "cash")} handleClick={handleClick} handleSubmit={handleSubmit} />
            )}
        </div>
    );
}

function DonationSubmission(props) {
    const itemName = useField("Produce Name", "text");
    const amount = useField("Quantity", "number");
    const expDate = useField("Expiration Date", "date");
    const receiver = useField("Donation Receiver", "text");
    const currency = useField("Donation Currency", "number");
    const additionalInfo = useField("Additional Information", "textarea", false);

    const handleDonation = () => {
        console.log(`Submitted ${props.name} donation..`);
    }

    return (
        <form onSubmit={props.handleSubmit} style={{width: "720px", maxWidth: "100%", margin: "auto"}}>
            {props.name === "produce" ? (
                <div className="has-text-left">
                    <div className="columns">
                        <div className="column">
                            <InputField props={receiver} />
                        </div>
                        <div className="column">
                            <InputField props={itemName} />
                        </div>
                    </div>
                    <div className="columns">
                        <div className="column">
                            <InputField props={amount} />
                        </div>
                        <div className="column">
                            <InputField props={expDate} />
                        </div>
                        <div className="column">
                            Checkbox [N/A]
                        </div>
                    </div>
                    <div className="columns">
                        <div className="column">
                            <InputField props={additionalInfo} />
                        </div>
                    </div>
                </div>
            ) : (
                <div className="has-text-left">
                    <div className="columns">
                        <div className="column">
                            <InputField props={receiver} />
                        </div>
                        <div className="column">
                            <InputField props={currency} />
                        </div>
                    </div>
                    <div className="columns">
                        <div className="column">
                            <InputField props={additionalInfo} />
                        </div>
                    </div>
                </div>
            )}
            <button className="button is-success has-margins-0-5" name="cancel" type="button" onClick={props.handleClick}>Cancel</button>
            <button className="button is-success has-margins-0-5" type="button" onClick={handleDonation}>Submit</button>
        </form>
    );
}

export default DonationForm;
