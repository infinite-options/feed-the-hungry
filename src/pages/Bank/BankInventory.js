import React, { useState, useEffect }  from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
} from "react-router-dom";

function BankInventory({inventory, bankUrl}){
    return (
        <div className="inventory">
            {inventory.map((item) => 
                <div key={item.food_id} className="card item fade-in">
                    <div className="card-content has-no-padding item-content">
                        <div className="item-image-container">
                            <img src={item.image} className="item-image"alt="Placeholder image"></img>
                        </div>
                        <div className="item-info">
                            <p className="item-brand has-text-grey no-overflow">{item.brand}</p>
                            <p className="title is-6 has-text-grey-dark no-overflow">{item.food_name}</p>
                            <p className="subtitle has-font-13 has-text-grey no-overflow">1 {item.unit} ({item.weight} {item.weight_unit})</p>
                            <QuantityInput maxQuantity={item.quantity}/>
                        </div>               
                    </div>
                    <div className="card-footer">
                        <div className="item-price">
                            <span className="subtitle has-font-13 has-text-grey">${item.price}</span>  
                        </div>
                        <div className="item-tags">
                            <SplitTags bankUrl={bankUrl} str={item.type}/> 
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function SplitTags({bankUrl, str}){
    if (str){ 
        var tags = str.split(';');
        return (
            <div className="tags-container">
                { tags.map(tag => 
                    <Link key={tag} to={`${bankUrl}/${tag}`}  className="item-tag subtitle has-margin-left-12" alt="">#{tag}</Link>
                )}
            </div>
        );
    }
    return "";
}
function QuantityInput({maxQuantity}) {
    const counter = useCounter();
    return (
        <div className="field is-grouped is-multiline">
            <div className="control item-actions">
            <button class="button is-small" onClick={counter.decrease}  disabled={counter.value == 0 ? true:false}>-</button>
            <input type="number" className="input is-small" value={counter.value} readOnly/>
            <button class="button is-small" onClick={counter.increase}  disabled={counter.value == maxQuantity ? true:false }>+</button>
            </div>
        </div>
    );
}
const useCounter = () => {
    const [value, setValue] = useState(0);

    const increase = (event) => {
        event.preventDefault();
        setValue(value + 1);
    }
    const decrease = (event) => {
        event.preventDefault();
        setValue(value - 1);
    }
    const zero = () => {
        setValue(0);
    }
    return {
        value,
        increase,
        decrease,
        zero
    }
}
export default BankInventory;