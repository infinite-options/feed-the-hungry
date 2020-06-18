import React from 'react';

// to use this component, make sure that the array being passed in must be
// an array of object
function Select({props, data}) {
    return (
        <div>
        <div className={props.error.length > 0? "select is-danger" : "select"}>
            <select {...props}>
                <option value="">{props.label}</option>
                {Object.keys(data).map(x => 
                    <option value={x}>{data[x]}</option>
                )
                }
            </select>
        </div>
        <p className="help is-danger">{props.error}</p>
        </div>
        
    );
}

export default Select;