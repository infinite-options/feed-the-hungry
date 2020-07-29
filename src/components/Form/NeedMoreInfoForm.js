import React, { useState, useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";

import useField from "components/Hooks/useField";
import InputField from "components/Form/InputField";
import StateAPI from 'API/StateAPI';
import Select from 'components/Form/Select';
import axios from "axios";

function NeedMoreInfoForm(props) {
    const userInfo = props.userInfo;

    const states = StateAPI();

    const address1 = useField("Address 1", "text");
    const address2 = useField("Address 2", "text", false);
    const city = useField("City", "text");
    const state = useField("State", "text");
    const zip = useField("Zip", "text");
    const [addressValid, setAddressValid] = useState(false);

    // In case the user has partially filled information
    // Ex: Address filled out but not another required input
    useEffect(() => {
        if (userInfo.address1 && userInfo.city && userInfo.state && userInfo.zip) {
            setAddressValid(true);
        }
    }, [])

    const handleClick = e => {
        if (addressValid || (address1.isValid && address2.isValid && 
                             city.isValid && state.isValid && zip.isValid)) {
            console.log("Inputs are valid");
            const EDIT_USER_DATA_API = `https://dc3so1gav1.execute-api.us-west-1.amazonaws.com/dev/api/v2/edit_user_status/${userInfo.userID}?`;
            axios.get(EDIT_USER_DATA_API + "user_is_donor=1&"
                                          + `user_address1="${address1.value}"&`
                                          + `user_address2="${address2.value}"&`
                                          + `user_city="${city.value}"&`
                                          + `user_state="${state.value}"&`
                                          + `user_zipcode="${zip.value}"`).then(() => {
                userInfo.isDonor = 1;
                userInfo.address1 = address1.value;
                userInfo.address2 = address2.value;
                userInfo.city = city.value;
                userInfo.state = state.value;
                userInfo.zip = zip.value;
                window.localStorage.setItem('userInfo', JSON.stringify(userInfo));
                props.setValue(1);
            });
        }
    }

    const handleSubmit = e => {
        e.preventDefault();
    }

    return (
        <form onSubmit={handleSubmit} style={{width: "720px", margin: "auto"}}>
            <p>WORK IN PROGRESS (BASED ON LOGIN TYPE, ASK FOR CERTAIN EXTRA INFO)</p>
            <div className="column has-text-left">
                {!addressValid && (
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
            <button className="button is-success" type="button" onClick={handleClick}>Submit</button>
        </form>
    );
}

export default NeedMoreInfoForm;
