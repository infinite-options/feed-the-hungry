import React from "react";
import './style.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// use this component for all input fields (well, not really all input fields because it still needs modifications)
const InputField = ({props, icon, isDisabled}) => {
  
  const setMaxDate = () => {
    const today = new Date();
    // console.log(today);
    let day = today.getDate();
    let month = today.getMonth() + 1;
    let year = today.getFullYear();
    if (day < 10) day = "0" + day;
    if (month < 10) month = "0" + month;
    return year + "-" + month + "-" + day;
  }

  // Handling date inputs with placeholder text (is there a better way?)
  const handleDateName = (e) => {
    if (e.currentTarget.type === "text") e.currentTarget.type = "date";
    else {
      e.currentTarget.type = "text";
    }
  }

  const handleImg = e => {
    // Since we call onChange handleImg for file inputs, it overwrites the initial onChange function
    // so we add that initial function here so both functions run
    props.onChange(e);
    let selectedFile = e.target.files[0];
    let reader = new FileReader();

    let imgTag = document.getElementById("inputImg");
    imgTag.title = selectedFile.name;

    reader.onload = e => {
      imgTag.src = e.target.result;
      // console.log(imgTag.src);
    };
    reader.readAsDataURL(selectedFile);
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
  else if (props.type === "switch"){
    return (
      <div className="field">
        <input id={props.name} type="checkbox" name="switchRoundedDefault" className="switch is-rounded" value={props.value} onChange={props.onChange}/>
        <label htmlFor={props.name}>{props.name}</label>
      </div>
    );
  }
  else if (props.type === "tel"){
    return (
      <div className="field horizontal">
         <label className="help is-danger">*</label>
        <div className="field-body">
          <div className="field is-expanded">
            <div className="field has-addons">
             
              <div className="control">
                <a className="button is-static">+1</a>
              </div>
              <div className="control is-expanded">
                <input type="tel" className={props.error.length > 0 ? "input is-danger" : "input"} onChange={props.onChange} value={props.value} placeholder={props.name} />
              </div>
              
            </div>
            <p className="help is-danger">{props.error}</p>
            <p className="help">Do not enter the first zero</p>
          </div>
        </div>
      </div>
    );
  }
  else{
    return (

      <div className="field">
          <label className="help is-danger">*</label>
          <div className={icon ? "control has-icons-right" : "control"}>
            {props.type === "file" && <img id="inputImg" />}
            <input className={props.error.length > 0 ? "input is-danger" : "input"} type={props.type !== "date" ? props.type : "text"} onChange={props.onChange} value={props.value} placeholder={props.name} 
              {...(props.type === "date" ? {onFocus: handleDateName, onBlur: handleDateName, max: setMaxDate()} : {})} 
              {...(props.type === "file" ? {accept: "image/*", onChange: handleImg} : {})}
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
