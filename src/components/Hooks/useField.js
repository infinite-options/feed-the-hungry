import React, { useState } from "react";

const useField = (type) => {
  const [value, setValue] = useState(type === "checkbox" ? false : '');
  const [error, setError] = useState(false);


  const onChange = (event) => {
    setValue(
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value
    );
    setError(event.target.value.length > 0 ? false : true);

  };

  return {
    error,
    setError,
    type,
    value,
    onChange,
  };
};
export default useField;
