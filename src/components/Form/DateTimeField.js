import React, { forwardRef} from "react";
import Icons from "components/Icons/Icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DateTimeField = forwardRef((props, ref) => {
    return (
      <div className="field">
        <div className="control has-icons-right">
          <input
            ref={ref}
            className="input"
            type="text"
            placeholder={props.placeholder}
            value={props.value}
            id={props.id}
            onClick={props.onClick}
            readOnly
            disabled={props.disabled}
          />
          <span className="icon is-small is-right">
            <FontAwesomeIcon icon={Icons.faCalendarAlt} />
          </span>
        </div>
      </div>
    );
  });
  export default DateTimeField;