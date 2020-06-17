import React from "react";


// use this component for all input fields (well, not really all input fields because it still needs modifications)
const InputField = ({props}) => {
  return (
    <div className="field">
        {/* if the input is a checkbox */}
      {props.type === "checkbox" ? (
        <div className="control">
          <label className="checkbox" >
            <input {...props} />
            <span className="has-margin-left-0-5">{props.label}</span>
          </label>
        </div>
      ) : (
        //   else
        <div>
          <label>{props.label}</label>
          {/* If input is empty, shows red border and red error msg. 
           To see what attributes 'props' has, go to useField.js */}
          <div className="control">
              <input className={props.error.length > 0 ? "input is-danger" : "input"} {...props} required />
          </div>
          <p className="help is-danger">{props.error}</p>
        </div>
      )}
    </div>
  );
};
export default InputField;
