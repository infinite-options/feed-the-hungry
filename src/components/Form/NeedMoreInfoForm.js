import React, { useState, useRef } from "react";
import { useHistory } from "react-router-dom";

import useField from "components/Hooks/useField";
import InputField from "components/Form/InputField";
import StateAPI from 'API/StateAPI';
import Select from 'components/Form/Select';

function NeedMoreInfoForm(props) {
    const states = StateAPI();

    const address1 = useField("Address 1", "text");
    const address2 = useField("Address 2", "text", false);
    const city = useField("City", "text");
    const state = useField("State", "text");
    const zip = useField("Zip", "text");

    const handleSubmit = e => {
        e.preventDefault();
    }

    return (
        <form onSubmit={handleSubmit} style={{width: "720px", margin: "auto"}}>
            <p>WORK IN PROGRESS (BASED ON LOGIN TYPE, ASK FOR CERTAIN EXTRA INFO)</p>
            <div className="column has-text-left">
                {props.type === "donor" && (
                    <React.Fragment>
                        <div className="columns">
                            <div className="column">
                                <InputField props={address1} />
                            </div>
                            <div className="column">
                                <InputField props={address2} />
                            </div>
                        </div>
                        <div className="columns">
                            <div className="column">
                                <InputField props={city} />
                            </div>
                            <div className="column">
                                <Select props={state} data={states.data} />
                            </div>
                            <div className="column">
                                <InputField props={zip} />
                            </div>
                        </div>
                    </React.Fragment>
                )}
            </div>
        </form>
    );
}

export default NeedMoreInfoForm;
