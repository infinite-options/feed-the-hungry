import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const LoginField = ({props, icon}) => {
    return (
        <div className="field">
          <div className={"control has-icons-right"}>
            <input className={props.error.length ? "input is-danger" : "input"} type={props.type} onChange={props.onChange} value={props.value} placeholder={props.name} />
            <span className="icon is-right">
              <FontAwesomeIcon icon={icon} />
            </span>
          </div>
          {/* <p className="help is-danger">{props.error}</p> */}
         
      </div>
    );
}

export default LoginField;