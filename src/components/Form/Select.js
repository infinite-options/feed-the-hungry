import React from 'react';

// to use this component, make sure that the array being passed in must be
// an array of object
function Select({list}) {
    return (
        <div className="select">
            <select>
                {Object.keys(list).map(x => 
                    <option value={x}>{list[x]}</option>
                )
                }
            </select>
        </div>
    );
}
const useSelect = () => {
    
}
export default Select;