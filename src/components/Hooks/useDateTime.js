import React, { useState, useEffect } from 'react';
import addDays from "date-fns/addDays";

export const useDateTime = () => {
  const [startDate, setStartDate] = useState(null);
  const [isValid, setIsValid] = useState(false);
  const onChange = (date) => {
    setStartDate(date);
  };
  useEffect(() => {
    if (startDate) setIsValid(true);
    else setIsValid(false)
  }, [startDate])
  const today = new Date();
  const minDate = addDays(new Date(), 2);
  const maxDate = today.getDate();
  
  return {
    startDate,
    onChange,
    minDate,
    maxDate,
    isValid
  };
};
