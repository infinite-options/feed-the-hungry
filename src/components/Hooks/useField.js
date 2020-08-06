import React, { useState, useEffect } from "react";

const useField = (name, type, isRequired=true) => {
  const [value, setValue] = useState(type === "checkbox" || type ==="switch" ? false : '');
  const [isValid, setIsValid] = useState((isRequired ? false : true));
  const [error, setError] = useState("");
  const [isOnChange, setIsOnChange] = useState(false);
  const [isOnBlur, setIsOnBlur] = useState(false);

  // for file inputs
  const [file, setFile] = useState({});
  // validate input on blur
  const onBlur = () => {
    setIsOnBlur(true);
    setIsOnChange(false);
    if (!checkInputs()) setIsValid(false);
    else setIsValid(true);
  }
  // no validation text on change
  const onChange = (event) => {
    setIsOnChange(true);
    setIsOnBlur(false);

    setValue(
      event.target.type === "checkbox" || event.target.type === "switch"
        ? event.target.checked
        : event.target.value
    );

    if (event.target.type === "file") {
      setFile(event.target.files[0]);
    }
    setError("");
  };
  // no validation text on click
  const onClick = () => {
    setError("");
  }

  // autofill  doesnt trigger onChange so we need these extra code
  useEffect(() => {
      if (!isOnChange && value){  
        if(checkInputs()) setIsValid(true);
        else setIsValid(false);
      }
  }, [value])


  const checkInputs = () => {
    // if required and not filled
    if (isRequired && value.length === 0 ) {
      if (name.toLowerCase().includes("state")) setError("Please select your state.");
      else setError("Please fill in this field.");
      console.log(false);
      return false; 
    }
    // if filled (checks both optional & required)
    else if (value.length > 0){
    // case 1: if input is a zip code
      if (name.toLowerCase() === "zip" && !validateZip(value)) setError("Only number that is 5 digits in length.");
      // case 2: if input is entered but we need to verify it given a data
      // case 3: if input is a phone number
      else if (type === "tel" && !validatePhoneNumber(value)) setError("Only number that is 10 digits in length.");
      // case 4: if input is an email
      else if (type === "email" && !validateEmail(value)) setError("Please check that your email address is correct.");
      // case 5.1: if input is currency
      else if (type === "number" && isCurrency(name) && !validateCurrency(value)) setError("Invalid currency amount");
      // case 5.2: if input is an amount
      else if (type === "number" && !isCurrency(name) && !validateAmount(value)) setError("Invalid amount");
      // case 6: if input is birthdate and date chosen is in the future
      // else if (type ==="date" && maxDate() < value) setError("Please select your date of birth.");
      else {
        setError("");
        return true;
      }
      // failed a case
      console.log(false);
      return false;
    }
    // if optional & not filled
    setError("");
    return true;
  }

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
    onBlur,
    onClick,
    isRequired,
    resetinput,
    file,
    isValid,
    isOnChange,
    checkInputs
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
function isCurrency(inputName) {
  const name = inputName.toLowerCase();
  return name.includes("income") || name.includes("currency"); // other terms may need to be added. Is there a better way to check if number input is currency?
}
function validateCurrency(currency) {
  const re = /^([0-9]{1,3},([0-9]{3},)*[0-9]{3}|[0-9]+)(.[0-9][0-9])?$/;
  return re.test(currency);
}
function validateAmount(amount) {
  const re = /^[1-9]\d*$/;
  return re.test(amount);
}

  // const maxDate = () => {
  //   const today = new Date();
  //   let day = today.getDate();
  //   let month = today.getMonth() + 1;
  //   let year = today.getFullYear();
  //   if (day < 10) day = "0" + day;
  //   if (month < 10) month = "0" + month;
  //   return year + "-" + month + "-" + day;
  // }
export default useField;

