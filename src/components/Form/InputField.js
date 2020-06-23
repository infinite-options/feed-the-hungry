import React from "react";
import './style.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// use this component for all input fields (well, not really all input fields because it still needs modifications)
const InputField = ({props, icon, isDisabled}) => {
  // Handling date inputs with placeholder text (is there a better way?)
  const handleDateName = (e) => {
    if (props.type === "date") {
      if (e.currentTarget.type === "text") e.currentTarget.type = "date";
      else {
        e.currentTarget.type = "text";
      }
    }
  }
  
  if (props.type === "checkbox"){
    return (
      <div className="field">
         <div className="control">
          <label className="checkbox level-item" style={{justifyContent: "flex-start"}}>
            <input type={props.type} onChange={props.onChange} value={props.value} disabled={isDisabled}/>
            <span className="has-margin-left-0-5">{props.name}</span>
            {icon && (
              <span className="icon has-margin-left-0-5">
                <img src={icon} alt=""></img>
              </span>
            )}
          </label>
        </div>
      </div>
    );
  }
  else{
    return (
      <div className="field">
          <div className={icon ? "control has-icons-right" : "control"}>
            <input className={props.error.length > 0 ? "input is-danger" : "input"} type={props.type !== "date" ? props.type : "text"} onChange={props.onChange} value={props.value} placeholder={props.name} 
              onFocus={handleDateName} onBlur={handleDateName}
            />
            {icon ?  (
              <span className="icon is-right">
                <FontAwesomeIcon icon={icon} />
              </span>
            ) : ""}
          </div>
          <p className="help is-danger">{props.error}</p>
      </div>
    );
  }
 
};
export default InputField;
