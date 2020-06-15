import React, { useState } from "react";


const useCheckbox = (type) => {
  const [checked, setChecked] = useState(false);
  const handleClick = () => {
    setChecked(!checked);
  };
  return {
    type,
    checked,
    handleClick,
  };
};
export default useCheckbox;