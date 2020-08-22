import React, { useState, useEffect }  from 'react';

// this custom hook is not being used
const BankAPI = () => {
    const [data, setData] = useState([]);
    // fetch data from json file
    // return an array of objects
    // DataLoader: function(){
    //     const [data, setData] = useState([]);
    useEffect(() => {
        fetch('https://dc3so1gav1.execute-api.us-west-1.amazonaws.com/dev/api/v2/foodbankinfo')
        .then (x=> x.json())
        .then(({  result: { result }  }) => result)
        .then(result => {return removeNull(result)})
        .then(result => {return removeDuplicatesBy('foodbank_id', result)})
        .then(data => setData(data))
    },[])
    //     return data;
    // },
    // remove duplicates of objects sharing the same property value
    const removeDuplicatesBy = (key, arr) => {
        const obj = {};
        arr.forEach(x => {
            if (!obj[x[key]]){
                obj[x[key]] = {
                    name: x.fb_name,
                    logo: x.fb_logo,
                    id: x.foodbank_id,
                    address: x.foodbank_address,
                    monday: x.fb_monday_time,
                    tuesday: x.fb_tuesday_time,
                    wednesday: x.fb_wednesday_time,
                    thursday: x.fb_thursday_time,
                    friday: x.fb_friday_time,
                    saturday: x.fb_saturday_time,
                    sunday: x.fb_sunday_time,
                    latitude: x.fb_latitude,
                    longitude: x.fb_longitude,
                    inventory: [
                        
                            {
                                food_id: x.food_id,
                                food_name: x.food_name,
                                quantity: x.quantity,
                                limit: x.limit,
                                image: x.fl_image,
                                weight: x.fl_amount,
                                unit : x.fl_package_type,
                                type: x.fl_food_type,
                                brand: x.fl_brand,
                                price: x.fl_value_in_dollars,
                                delivery_pickup: x.delivery_pickup
                                
                            }

                                    ]
                };
            }
            else {
                obj[x[key]].inventory.push({
                                    food_id: x.food_id,
                                    food_name: x.food_name,
                                    quantity: x.quantity,
                                    limit: x.limit,
                                    image: x.fl_image,
                                    weight: x.fl_amount,
                                    unit : x.fl_package_type,
                                    type: x.fl_food_type,
                                    brand: x.fl_brand,
                                    price: x.fl_value_in_dollars,
                                    delivery_pickup: x.delivery_pickup
                                });
            
            }
        });
    
        return Object.values(obj);
    }
    // get a bank object by key 
    const getBankBy = (key) => {
        return (data.find(obj => {
            return obj.id === key;
        }));
    }
    const removeNull = (arr) => {
        arr.forEach(x => {
            Object.keys(x).map(function(keyName, keyIndex){
                if (x[keyName] === null){
                    if (keyName === "fb_logo") x[keyName] = "https://bulma.io/images/placeholders/96x96.png";
                    else if(keyName === "fl_food_type") x[keyName] = "";
                    else x[keyName] = "Not Available";
                }
            })
        })
        return arr;
    }
    const getItemsByTag = (inventory, tag) =>{
        return inventory.filter(foodItem => foodItem.type.includes(tag));
    }
    const getCoordinates = () => {
        let coords = [];
        data.forEach(x => {
            coords.push([x.latitude, x.longitude])
        })
        return coords;
    }
    return {
        data,
        removeDuplicatesBy,
        removeNull,
        getBankBy,
        getItemsByTag,
        getCoordinates,
    }
}
export default BankAPI;