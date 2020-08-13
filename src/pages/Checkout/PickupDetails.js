import React from 'react';
import Icons from "components/Icons/Icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function PickupDetails({bank, items}) {
    // const delivery_pickup_items = items.length > 0 ? items.filter(x => x.info.delivery_pickup.includes('both')) : [];
    const delivery_items = items.length > 0 ? items.filter(x => x.info.deliver === 1) : [];
    // const pickup_items = items.filter(x => x.info.pickup === 1);
    return (
        <div className="pickup-confirm">
            <p className="title is-5">In-store Pickup</p>
            <p className="subtitle is-6">{bank.fb_address1}</p>
            <div className="space-1"></div>
            {delivery_items.length > 0 ? 
            <NoPickUp items={delivery_items} /> : ""
            }
        </div>
    );
}
const NoPickUp = ({items}) => {
    let html = '';
    var i = 0;
    for (i; i < items.length-1; i++){
        html += " " + items[i].info.food_name + ",";
    }
    html += " " + items[i].info.food_name;
    return (
        <div>
        <span className="subtitle is-6 has-text-danger">Pick up is not available for the following item(s): </span>
        <span className="subtitle is-6 ">{html}
        </span>
        </div>
    );
}
export default PickupDetails;