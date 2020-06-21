import React, { useState, useEffect } from "react";

const useField = (name, type, isRequired=true) => {
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
    if (event.target.value.length > 0 ) setError('');
  };

  // validate inputs if user clicks submit button. Returns true if no errors, false if error detected.
  const validate = () => {
      // case 1: if input is required but nothing is entered
      if (isRequired && value.length === 0) setError("This field is required")
      // case 2: if input is a zip code
      else if (name.toLowerCase() === "zip" && !/(^\d{5}$)|(^\d{5}-\d{4}$)/.test(value)) setError("Invalid zip code");
      // case 3: if input is entered but we need to verify it given a data
      // make sure that the data must have method 'contain' (see StateAPI.js, for instance
      else if (name.toLowerCase() === "state" && value ==="") setError("Invalid state");
      else {
          setError("");
          return true;
      }
      return false;
  };

  return {
    error,
    setError,
    type,
    name,
    value,
    onChange,
    isRequired,
    validate,
  };
};
export default useField;

// this custom hook handles any type of input
// just do const myInput = useField("text") (it could be text/number/checkbox/... depends on the type of input you want to set)
// then do <input {... myInput} /> and your input will have all of the attributes needed (value, onChange, etc)
// Afther that, you can simply do myInput.value to get its value 
