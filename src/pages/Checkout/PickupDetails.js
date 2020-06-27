import React from 'react';
import Icons from "components/Icons/Icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function PickupDetails({bank, items}) {
    const delivery_pickup_items = items.length > 0 ? items.filter(x => x.info.delivery_pickup.includes('both')) : [];
    const delivery_items = items.length > 0 ? items.filter(x => x.info.delivery_pickup.includes('delivery')) : [];
    const pickup_items = items.filter(x => x.info.delivery_pickup.includes('pickup'));
    return (
        <div className="pickup-confirm">
            <p className="title is-5">Pickup Address</p>
            <p className="subtitle is-6">{bank.foodbank_address}</p>
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
        <p className="subtitle is-6">Unavailable for pick up:</p>
        <p className="subtitle is-6 has-text-danger">{html}
        </p>
        </div>
    );
}
export default PickupDetails;