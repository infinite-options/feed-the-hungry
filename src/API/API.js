import React, { useState, useEffect }  from 'react';
const API = {
    // fetch data from json file
    // return an array of objects
    DataLoader: function(){
        const [data, setData] = useState([]);
        useEffect(() => {
            fetch('https://dc3so1gav1.execute-api.us-west-1.amazonaws.com/dev/api/v2/foodbankinfo')
            .then (x=> x.json())
            .then(({  result: { result }  }) => result)
            .then(data => setData(data))
            .catch((error) => {
                return (<div class="notification is-danger">
                <button class="delete"></button>
                ERROR: Cannot fetch data.
            </div>);
            })
        },[])
        return data;
    },
    // remove duplicates of objects sharing the same property value
    RemoveDuplicatesBy: function(key,arr){
        const obj = {};
    
        arr.forEach(x => {
            if (!obj[x[key]]){
                obj[x[key]] = {
                    foodbank_name: x.foodbank_name,
                    foodbank_id: x.foodbank_id,
                    address: x.Address,
                    monday: x.monday,
                    tuesday: x.tuesday,
                    wednesday: x.wednesday,
                    thursday: x.thursday,
                    friday: x.friday,
                    saturday: x.saturday,
                    sunday: x.sunday,
                    inventory: [
                        {
                            food_id: x.food_id,
                            food_name: x.food_name,
                            quantity: x.Quantity,
                            image: x.image,
                            unit: x.unit,
                            unit_type: x.unit_type
                        }
                    ]
                };
            }
            else {
                obj[x[key]].inventory.push({ 
                    food_id: x.food_id, 
                    food_name: x.food_name, 
                    quantity: x.Quantity, 
                    image: x.image,
                    unit: x.unit,
                    unit_type: x.unit_type });
            }
        });
    
        return Object.values(obj);
    },
    // get a bank object by key 
    getBankBy: function(key, arr){
        return (arr.find(obj => {
            return obj.foodbank_id === key;
        }));
    }
}
export default API;