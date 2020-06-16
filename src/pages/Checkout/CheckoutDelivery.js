import React, { useState } from "react";
import Icons from "components/Icons/Icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import addDays from "date-fns/addDays";
import useField from "components/Hooks/useField";
import InputField from "components/Input/InputField";

function CheckoutDelivery() {
  const dateTime = useDateTime();
  const street = useField("text");
  const city = useField("text");
  const state = useField("text");
  const zip = useField("text");
  const checkbox = useField("checkbox");
  const [hidden, setHidden] = useState("hidden");

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const handleClick = () => {
    if (!checkbox.value && !dateTime.startDate) setHidden("");
    if (street.value.length === 0) street.setError(true);
    if (city.value.length === 0) city.setError(true);
    if (state.value.length === 0) state.setError(true);
    if (zip.value.length === 0) zip.setError(true);
  }
  return (
    <div className="delivery-confirm">
      <p className="title is-5">Confirm Delivery</p>
      <form onSubmit={handleSubmit}>
        <InputField label="Street" props={street} />
        <InputField label="City" props={city} />
        <div className="columns">
          <div className="column">
            <InputField label="State" props={state} />
          </div>
          <div className="column">
            <InputField label="Zip" props={zip} />
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
                placeholderText={checkbox.value === true ? "No date is selected": "Select a date and time"}
                disabled={checkbox.value === true ? true : false}
              />
            </div>
          </div>
          <div className="level-right">
            <div className="level-item left-most">
              <InputField
                label="I want my delivery as soon as possible"
                props={checkbox}
              />
            </div>
          </div>
        </div>
        <div className={hidden === "" && (checkbox.value || dateTime.startDate) ? "hidden" : hidden}>
        <article class="message is-danger error-msg">
            <div class="message-body">
                Please make sure that you schedule a delivery date or soonest delivery.
            </div>
        </article>
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

const DateTimeInput = ({ placeholder, value, id, onClick, disabled }) => {
  return (
    <div className="field">
      <div className="control has-icons-right">
        <input
          className="input"
          type="text"
          placeholder={placeholder}
          value={value}
          id={id}
          onClick={onClick}
          readOnly
          disabled={disabled}
        />
        <span className="icon is-small is-right">
          <FontAwesomeIcon icon={Icons.faCalendarAlt} />
        </span>
      </div>
    </div>
  );
};

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
export default CheckoutDelivery;
