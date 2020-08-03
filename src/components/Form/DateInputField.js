
import React, { useState, forwardRef} from "react";
import Icons from "components/Icons/Icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateInputField = ({props}) => {
    return (
        <div className="field">
            <div className="control">
            <DatePicker
                selected={
                props.startDate
                }
                value={props.startDate}
                onChange={(date) => props.onChange(date)}
                onBlur={props.onBlur}
                minDate={props.minDate}
                maxDate={props.maxDate}
                showTimeSelect={props.showTimeSelect}
                customInput={<CustomDateField />}
                dateFormat={props.showTimeSelect ? "MM/dd/yyyy h:mm aa": "MM/dd/yyyy"}
                placeholderText={
                props.placeholder
                }
                className={props.error.length === 0 ? "input" : "input is-danger"}
                disabled = {props.disabled}
            />
            </div>
            <p className="help is-danger">{props.error}</p>
        </div>
    )
}
const CustomDateField = forwardRef((props, ref) => {
    return (
      <div className="field">
        <div className="control has-icons-right">
          <input
            ref={ref}
            className={props.className}
            type="text"
            placeholder={props.placeholder}
            value={props.value}
            onChange={props.onChange}
            onBlur={props.onBlur}
            onClick={props.onClick}
            disabled={props.disabled}
            readOnly
          />
          <span className="icon is-small is-right">
            <FontAwesomeIcon icon={Icons.faCalendarAlt} />
          </span>
        </div>
      </div>
    );
  });
export default DateInputField;