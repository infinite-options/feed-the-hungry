import React, { useState } from "react";

const useLogin = (name, type) => {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  // handle input if user changes the content of the input 
  const onChange = (event) => {
    setValue(event.target.value);
    if (event.target.value) setError("");
    else if(error && !event.target.value) setError("");
  };

  const checkInputs = () => {
    // if not filled
    if (value.length === 0) setError(" ");
    // if filled (checks both optional & required)
    else if (value.length > 0) {
      // if input is an email
      if (type === "email" && !validateEmail(value)) setError("Please use a valid email address");
      else {
        setError("");
        return true;
      }
    }
    return false;
  }

//   const resetinput = () => {
//     setValue("");
//     setError("");
//   }

  return {
    error,
    setError,
    type,
    name,
    value,
    setValue,
    onChange,
    checkInputs,
    // resetinput,
  };
};

function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export default useLogin;
