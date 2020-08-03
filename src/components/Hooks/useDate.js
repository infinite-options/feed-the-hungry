import React, { useState, useEffect } from "react";

const useDate = (
  placeholder,
  showTimeSelect=false,
  minDate,
  maxDate,
  disabled=false
) => {
  const [startDate, setStartDate] = useState(null);
  const [isValid, setIsValid] = useState(false);
  const [error, setError] = useState("");


  const onChange = (date) => {
    setStartDate(date);
  };

  const onBlur = () => {
    checkInputs();
  };
  const onClick= () => {
      setError("");
  };
  const onFocus = () => {
      setError("");
  }
  useEffect(() => {
    if (startDate) checkInputs();
  },[startDate])
  
  // date input should always be valid if selected, and invalid if not selected
  const checkInputs = () => {
    if (!startDate) {
      setError("Please fill in this field.");
      return false;
    } 
    setIsValid(true);
    setError("");
    return true;
    
  };
  return {
    startDate,
    minDate,
    maxDate,
    onChange,
    onBlur,
    onClick,
    onFocus,
    placeholder,
    showTimeSelect,
    isValid,
    error,
    setError,
    disabled,
    checkInputs
  };
};
export default useDate;