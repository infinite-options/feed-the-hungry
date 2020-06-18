import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// use this component for all input fields (well, not really all input fields because it still needs modifications)
const InputField = ({props, icon}) => {
  return (
    <div className="field">
        {/* if the input is a checkbox */}
      {props.type === "checkbox" ? (
        <div className="control">
          <label className="checkbox level-item" style={{justifyContent: "flex-start"}}>
            <input {...props} />
            <span className="has-margin-left-0-5">{props.label}</span>
            {icon && (
              <span className="icon has-margin-left-0-5">
                <img src={icon} alt=""></img>
              </span>
            )}
          </label>
        </div>
      ) : (
        //   else
        <div>
          <label>{props.label}</label>
          {/* If input is empty, shows red border and red error msg. 
           To see what attributes 'props' has, go to useField.js */}
          <div className={icon ? "control has-icons-right" : "control"}>
            <input className={props.error.length > 0 ? "input is-danger" : "input"} {...props} />
            {icon && (
              <span className="icon is-right">
                <FontAwesomeIcon icon={icon} />
              </span>
            )}
          </div>
          <p className="help is-danger">{props.error}</p>
        </div>
      )}
    </div>
  );
};
export default InputField;
