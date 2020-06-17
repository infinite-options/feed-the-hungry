import React, { useState } from "react";
import StateAPI from 'API/StateAPI';

const useField = (label, type) => {
  const [value, setValue] = useState(type === "checkbox" ? false : '');
  const [error, setError] = useState('');
  
  // handle input if user changes the content of the input 
  const onChange = (event) => {
    setValue(
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value
    );
    // set error msg to '' if input is filled
    if (event.target.value.length > 0 )  setError('');

  };
  // handle input if user clicks submit button.
  // we need this function because onChange event for input 
  // does not get triggered when submit button is clicked
  const onButtonClick = () => {
      // case 1: if input is empty
      if (value.length === 0) setError("This field is required");
      // case 2: if input is a zip code
      else if (label.toLowerCase() === "zip" && !/(^\d{5}$)|(^\d{5}-\d{4}$)/.test(value)) setError("Invalid zip code");
      // case 3: if input is a state name
      else if (label.toLowerCase() === "state"){
          
      } 
      // other conditions:
      // email
      // password
      // address 2
      // etc
      else setError("");
  }
  const validateWith = (data) => {
      if (!data.contain(value)) setError("Invalid " + label);
  }
  return {
    error,
    type,
    label,
    value,
    onChange,
    onButtonClick,
    validateWith
  };
};
export default useField;

// this custom hook handles any type of input
// just do const myInput = useField("text") (it could be text/number/checkbox/... depends on the type of input you want to set)
// then do <input {... myInput} /> and your input will have all of the attributes needed (value, onChange, etc)
// Afther that, you can simply do myInput.value to get its value 
