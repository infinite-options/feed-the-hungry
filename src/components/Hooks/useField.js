import React, { useState, useEffect } from "react";

const useField = (name, type, isRequired=true) => {
  const [value, setValue] = useState(type === "checkbox" || type ==="switch" ? false : '');
  const [isValid, setIsValid] = useState(true);
  const [isOnChange, setIsOnChange] = useState(false);
  const [error, setError] = useState('');
  // for file inputs
  const [file, setFile] = useState({});

  // handle input if user changes the content of the input 
  const onChange = (event) => {
    setIsOnChange(true);
    setValue(
      event.target.type === "checkbox" || event.target.type === "switch"
        ? event.target.checked
        : event.target.value
    );
    if (event.target.type === "file") {
      setFile(event.target.files[0]);
    }
    if (!checkInputs(event.target.value)) setIsValid(false);
    else setIsValid(true);
  };
  // autofill (switch) doesnt trigger onChange so we need these extra code
  useEffect(() => {
    // check if value is changed by autofill
    setIsOnChange(false);
    if (!isOnChange && value.length > 0) {
      if ( !checkInputs(value)) setIsValid(false)
      else setIsValid(true)
    }
  }, [value])

  const maxDate = () => {
    const today = new Date();
    let day = today.getDate();
    let month = today.getMonth() + 1;
    let year = today.getFullYear();
    if (day < 10) day = "0" + day;
    if (month < 10) month = "0" + month;
    return year + "-" + month + "-" + day;
  }

  const checkInputs = (value) => {
    // if required and not filled
    if (isRequired && value.length === 0) {setError("This field is required"); return false; }
    // if filled (checks both optional & required)
    else if (value.length > 0){
    // case 1: if input is a zip code
      if (name.toLowerCase() === "zip" && !validateZip(value)) setError("Invalid zip code");
      // case 2: if input is entered but we need to verify it given a data
      // make sure that the data must have method 'contain' (see StateAPI.js, for instance
      else if (name.toLowerCase() === "state" && value ==="") setError("Invalid state");
      // case 3: if input is a phone number
      else if (type === "tel" && !validatePhoneNumber(value)) setError("Invalid phone number");
      // case 4: if input is an email
      else if (type === "email" && !validateEmail(value)) setError("Invalid email address");
      // case 5: if input is currency. NOTE: if we use the 'number' input type for non-currency values in the future, this will need to be changed
      else if (type === "number" && !validateCurrency(value)) setError("Invalid currency amount");
      // case 6: if input is birthdate and date chosen is in the future
      else if (name.toLowerCase() === "date of birth" && maxDate() < value) setError("Invalid birthdate");
      // else if (type === "checkbox" && value === false) setError("");
      // case 8: everything looks good!
      else {
        setError("");
        return true;
      }
      // failed a case
      return false;
    }
    // if optional & not filled
    setError("");
    return true;
  }

   // WE WONT NEED VALIDATE() ANYMORE
  // validate inputs if user clicks submit button. Returns true if no errors, false if error detected.
  // const validate = () => {
  //   // if input is required and is not filled
  //   if (isRequired && value.length === 0) {
  //     setError("");
  //     return false;
  //   }
  //   // if input is filled. Checks required & not required inputs since even if 
  //   // it's not required we want to validate input if it's filled.
  //   else if (value.length > 0) {
  //     return checkInputs(value);
  //   }
  //   // if input is not required and not filled
  //   else {
  //     setError("");
  //     return true;
  //   }
  // }

  const resetinput = () => {
    setValue("");
    setError("");
  }

  return {
    error,
    setError,
    type,
    name,
    value,
    setValue,
    onChange,
    isRequired,
    // validate,
    resetinput,
    file,
    isValid
  };
};

function validateZip(zip) {
  const re = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
  return re.test(zip);
}
function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
function validatePhoneNumber(phone){
  var phoneRe = /^[2-9]\d{2}[2-9]\d{2}\d{4}$/;
  var digits = phone.replace(/\D/g, "");
  return phoneRe.test(digits);
}
function validateCurrency(currency) {
  const re = /^([0-9]{1,3},([0-9]{3},)*[0-9]{3}|[0-9]+)(.[0-9][0-9])?$/;
  return re.test(currency);
}
export default useField;

// this custom hook handles any type of input
// just do const myInput = useField("text") (it could be text/number/checkbox/... depends on the type of input you want to set)
// then do <input {... myInput} /> and your input will have all of the attributes needed (value, onChange, etc)
// Afther that, you can simply do myInput.value to get its value 
