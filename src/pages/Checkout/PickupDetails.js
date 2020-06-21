import React from 'react';
import Icons from "components/Icons/Icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function PickupDetails({obj}) {
    return (
        <div className="pickup-confirm">
            <p className="title is-5">Pickup Address</p>
            <p className="subtitle is-6">{obj.address}</p>
        </div>
    );
}
export default PickupDetails;