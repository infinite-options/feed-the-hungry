import React from "react";
import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Icons from "components/Icons/Icons";

// use this component for all input fields (well, not really all input fields because it still needs modifications)
const InputField = ({
  props,
  icon,
  isDisabled,
  color = "",
  readOnly = false,
}) => {
  // const setMaxDate = () => {
  //   if (props.name.toLowerCase() !== "date of birth") return null;
  //   const today = new Date();
  //   let day = today.getDate();
  //   let month = today.getMonth() + 1;
  //   let year = today.getFullYear();
  //   if (day < 10) day = "0" + day;
  //   if (month < 10) month = "0" + month;
  //   return year + "-" + month + "-" + day;
  // };

  // // Handling date inputs with placeholder text (is there a better way?)
  // const handleDateName = (e) => {
  //   if (e.target.type === "text") e.target.type = "date";
  //   else {
  //     e.target.type = "text";
  //   }
  // };

  const handleImg = (e) => {
    // Since we call onChange handleImg for file inputs, it overwrites the initial onChange function
    // so we add that initial function here so both functions run
    props.onChange(e);
    let selectedFile = e.target.files[0];
    let reader = new FileReader();

    let imgTag = document.getElementById("inputImg");
    imgTag.title = selectedFile.name;

    reader.onload = (e) => {
      imgTag.src = e.target.result;
      // console.log(imgTag.src);
    };
    reader.readAsDataURL(selectedFile);
  };

  if (props.type === "checkbox") {
    return (
      <div className="field">
        <div className="control">
          <label
            className="checkbox level-item"
            style={{ justifyContent: "flex-start" }}
          >
            <input
              type={props.type}
              onChange={props.onChange}
              value={props.value}
              disabled={isDisabled}
            />
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
  } else if (props.type === "switch") {
    return (
      <div className="field">
        <input
          id={props.name}
          type="checkbox"
          name="switchRoundedDefault"
          className="switch is-rounded"
          value={props.value}
          onChange={props.onChange}
        />
        <label htmlFor={props.name}>{props.name}</label>
      </div>
    );
  } else if (props.type === "tel" || props.type === "number") {
    return (
      <div className="field horizontal">
        <div className="field-body">
          <div className="field is-expanded">
            <div className="field has-addons">
              <div className="control">
                {/* may need to change this condition to {isCurrency(props.name) && (...)} */}
                {props.name.toLowerCase() !== "quantity" && (
                  <a className="button is-static">
                    {props.type === "tel" ? "+1" : "$"}
                  </a>
                )}
              </div>
              <div className="control is-expanded">
                <input
                  type="tel"
                  className={props.error.length > 0 ? "input is-danger" : "input"}
                  onChange={props.onChange}
                  onBlur={props.onBlur}
                  value={props.value}
                  onClick={props.onClick}
                  placeholder={props.name}
                  readOnly={readOnly}
                />
              </div>
            </div>
            <p className="help is-danger">{props.error}</p>
            {props.type === "tel" && (
              <p className="help">Do not enter the first zero</p>
            )}
          </div>
        </div>
      </div>
    );
  } else if (props.type === "textarea") {
    return (
      <div className="field">
        <div className="control">
          <textarea
            className={
              props.error.length > 0
                ? `textarea is-danger ${color}`
                : `textarea ${color}`
            }
            placeholder={props.name}
            onChange={props.onChange}
            onBlur={props.onBlur}
            onClick={props.onClick}
            value={props.value}
            readOnly={readOnly}
          ></textarea>
        </div>
        <p className="help is-danger">{props.error}</p>
      </div>
    );
  } 
  else {
    return (
      <div className="field">
        <div className={icon ? "control has-icons-right" : "control"}>
          {props.type === "file" && <img id="inputImg" />}
          <input
            className={
              props.error.length > 0
                ? `input is-danger ${color}`
                : `input ${color}`
            }
            type="text"
            // type={props.type !== "date" ? props.type : "text"}
            onChange={props.onChange}
            onBlur={props.onBlur}
            onClick={props.onClick}
            value={props.value}
            placeholder={props.name}
            // {...(props.type === "date"
            //   ? {
            //       onFocus: handleDateName,
            //       onBlur: handleDateName,
            //       max: setMaxDate(),
            //     }
            //   : {})}
            {...(props.type === "file"
              ? { accept: "image/*", onChange: handleImg }
              : {})}
            readOnly={readOnly}
          />
          {icon ? (
            <span className="icon is-right has-text-danger">
              <FontAwesomeIcon icon={icon} />
            </span>
          ) : (
            ""
          )}
        </div>
        <p className="help is-danger">{props.error}</p>
      </div>
    );
  }
};
export default InputField;
