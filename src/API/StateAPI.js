import React, { useState, useEffect }  from 'react';

const StateAPI = () => {
    // fetch list of states
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('https://gist.githubusercontent.com/mshafrir/2646763/raw/8b0dbb93521f5d6889502305335104218454c2bf/states_hash.json')
        .then(x => x.json())
        .then (data => setData(data))
    },[]);

    const contain = (state) => {
        if (data.filter(x => x.name === state || x.abbreviation === state ).length > 0) return true;
        return false;
    }
    return {
        data,
        contain
    }
}
export default StateAPI;