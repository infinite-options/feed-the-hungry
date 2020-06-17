import React, { useState, useRef, forwardRef } from "react";
// import icons
import Icons from "components/Icons/Icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import calendar
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import addDays from "date-fns/addDays";
import DateTime from 'pages/Checkout/DateTime';
// import othe components
import useField from "components/Hooks/useField";
import InputField from "components/Form/InputField";
import Messages from "components/Notifications/Messages";
import StateAPI from "API/StateAPI";

function CheckoutDelivery() {
  const [hidden, setHidden] = useState("hidden"); // to hide error msg

  const states = StateAPI();
  const dateTime = useDateTime();
  const street = useField("Street", "text");
  const city = useField("City", "text");
  const state = useField("State", "text");
  const zip = useField("Zip", "text");
  const checkbox = useField(
    "I want my delivery as soon as possible",
    "checkbox"
  );
  const ref = useRef();
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const handleClick = () => {
    street.validatewith();
    city.validatewith();
    state.validatewith(states);
    zip.validatewith();

    if (dateTime.startDate) console.log(formatDate(dateTime.startDate));
    if (!checkbox.value && !dateTime.startDate) setHidden("");
  };
  return (
    <div className="delivery-confirm">
      <p className="title is-5">Confirm Delivery</p>
      <form onSubmit={handleSubmit}>
        <InputField label="Street" props={street} />
        <InputField label="City" props={city} />
        <div className="columns">
          <div className="column">
            {/* <Select list={states} /> */}
            <InputField props={state} />
          </div>
          <div className="column">
            <InputField props={zip} />
          </div>
        </div>
        <p className="title is-6">Choose delivery time:</p>
        <div className="level">
          <div className="level-left">
            <div className="level-item left-most">
              <DatePicker
                selected={checkbox.value === true ? null : dateTime.startDate}
                value={dateTime.startDate}
                onChange={(date) => dateTime.onChange(date)}
                minDate={dateTime.minDate}
                showTimeSelect
                customInput={<DateTimeInput />}
                dateFormat="MMMM d, yyyy h:mm aa"
                placeholderText={
                  checkbox.value === true
                    ? "No date is selected"
                    : "Select a date and time"
                }
                disabled={checkbox.value === true ? true : false}
              />
            </div>
          </div>
          <div className="level-right">
            <div className="level-item left-most">
              <InputField props={checkbox} />
            </div>
          </div>
        </div>
        {/* if user submits the form and no delivery time is selected, this error message is displayed.
        if the error message is showing and user selects a delivery time, hid the error message */}
        <div
          className={
            hidden === "" && (checkbox.value || dateTime.startDate)
              ? "hidden"
              : hidden
          }
        >
          <div className="error-msg">
            {Messages.Danger(
              "Please make sure that you schedule a delivery date or soonest delivery."
            )}
          </div>
        </div>
        <div className="field">
          <div className="control">
            <button className="button is-success" onClick={handleClick}>
              <span className="icon">
                <FontAwesomeIcon icon={Icons.faTruck} />
              </span>
              <span>Delivery Checkout</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

const DateTimeInput = forwardRef(( props, ref ) => {
  return (
    <div className="field">
      <div className="control has-icons-right">
        <input ref={ref}
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

const useDateTime = () => {
  const [startDate, setStartDate] = useState(null);
  const onChange = (date) => {
    setStartDate(date);
  };
  const minDate = addDays(new Date(), 2);

  return {
    startDate,
    onChange,
    minDate,
  };
};

function formatDate(date) {
  const dayNames = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = hours + ":" + minutes + " " + ampm;
  return (
    (date.getMonth()+1) +
    "/" +
    date.getDate() +
    "/" +
    date.getFullYear() +
    " " +
    strTime
  ).toUpperCase();
}

export default CheckoutDelivery;
