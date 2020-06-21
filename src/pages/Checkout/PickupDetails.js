import React from 'react';
import Icons from "components/Icons/Icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function PickupDetails({obj, items}) {
    const delivery_pickup_items = items.filter(x => x.item.delivery_pickup.includes('both'));
    const delivery_items = items.filter(x => x.item.delivery_pickup.includes('delivery'));
    console.log(delivery_items);
    const pickup_items = items.filter(x => x.item.delivery_pickup.includes('pickup'));
    return (
        <div className="pickup-confirm">
            <p className="title is-5">Pickup Address</p>
            <p className="subtitle is-6">{obj.address}</p>
            <div className="space-1"></div>
            {delivery_items && delivery_items.length > 0 ? 
            <NoPickUp items={delivery_items} /> : ""
            }
        </div>
    );
}
const NoPickUp = ({items}) => {
    let html = '';
    var i = 0;
    for (i; i < items.length-1; i++){
        html += " " + items[i].item.food_name + ",";
    }
    html += " " + items[i].item.food_name;
    return (
        <p className="subtitle is-6 has-text-danger">The following items are not available for pickup: 
        {html}
        </p>
    );
}
export default PickupDetails;