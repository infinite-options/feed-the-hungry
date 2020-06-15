import React from "react";

const InputField = ({ label, props}) => {
  return (
    <div className="field">
      {props.type === "checkbox" ? (
        <div className="control">
          <label className="checkbox" >
            <input {...props} />
            <span className="has-margin-left-0-5">{label}</span>
          </label>
        </div>
      ) : (
        <div>
          <label className="capitalized">{label}</label>
          <div className="control">
              <input className={props.error ? "input is-danger" : "input"} {...props} required />
          </div>
          <p className="help is-danger">{props.error ? "This field is required": ""}</p>
        </div>
      )}
    </div>
  );
};
export default InputField;
