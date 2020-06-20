import React, { useState, useRef, forwardRef, useEffect } from "react";
// import icons
import Icons from "components/Icons/Icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import calendar
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import addDays from "date-fns/addDays";
import DateTime from "pages/Checkout/DateTime";
// import othe components
import useField from "components/Hooks/useField";
import InputField from "components/Form/InputField";
import Messages from "components/Notifications/Messages";
import CustomerInfo from "pages/Checkout/CustomerInfo";
import Select from "components/Form/Select";
import StateAPI from "API/StateAPI";
import CheckoutPickup from "./CheckoutPickup";
import { useRouteMatch, useParams, Link, useLocation } from "react-router-dom";

function CheckoutDelivery({ obj }) {
  let { hist } = useLocation();
  const [activeTab, setActiveTab] = useState("delivery");
  const [hidden, setHidden] = useState("hidden"); // to hide error msg

  const fname = useField("First Name", "text");
  const lname = useField("Last Name", "text");
  const phone = useField("Phone Number", "text");
  const email = useField("Email", "email");
  const states = StateAPI();
  const dateTime = useDateTime();
  const street = useField("Street", "text");
  const city = useField("City", "text");
  //   const state = useDropdown("Select a state", states.data);
  const state = useField("Select a state", "text");
  const zip = useField("Zip", "text");
  const checkbox = useField(
    "I want my delivery as soon as possible",
    "checkbox"
  );
  useEffect(() => {
    if (checkbox.value || dateTime.startDate) setHidden("hidden");
  }, [checkbox.value || dateTime.startDate]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const handleClick = () => {
    fname.validatewith();
    lname.validatewith();
    email.validatewith();
    phone.validatewith();
    street.validatewith();
    city.validatewith();
    state.validatewith();
    // state.validatewith(states);
    zip.validatewith();

    if (dateTime.startDate) console.log(formatDate(dateTime.startDate));
    if (!checkbox.value && !dateTime.startDate) setHidden("");
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="delivery-confirm">
        <CustomerInfo fname={fname} lname={lname} email={email} phone={phone} />
        {/* <div className="space-2-5"></div> */}
        <div className="divider"></div>
        <p className="title is-5">Delivery Method</p>
        <div class="tabs is-toggle is-fullwidth">
          <ul>
            <li
              className={activeTab === "delivery" ? "is-active" : ""}
              onClick={() => setActiveTab("delivery")}
            >
              <a>
                <span class="icon is-small">
                  <FontAwesomeIcon icon={Icons.faShippingFast} />
                </span>
                <span className="uppercase">Delivery</span>
              </a>
            </li>
            <li
              className={activeTab === "pickup" ? "is-active" : ""}
              onClick={() => setActiveTab("pickup")}
            >
              <a>
                <span class="icon is-small">
                  <FontAwesomeIcon icon={Icons.faBoxOpen} />
                </span>
                <span className="uppercase">Pick Up</span>
              </a>
            </li>
          </ul>
        </div>
        {activeTab === "delivery" ? (
          //   <form onSubmit={handleSubmit}>
          <div>
            <p className="title is-5">Delivery Address</p>
            <InputField props={street} />
            <InputField props={city} />
            <div className="columns">
              <div className="column">
                {/* <DropDown placeholder="Select a state" data={states.data} /> */}
                <Select props={state} data={states.data} />
                {/* <InputField props={state} /> */}
              </div>
              <div className="column">
                <InputField props={zip} />
              </div>
            </div>
            <div className="divider"></div>
            <p className="title is-5">Delivery Options</p>
            <div className="level">
              <div className="level-left">
                <div className="level-item left-most">
                  <DatePicker
                    selected={
                      checkbox.value === true ? null : dateTime.startDate
                    }
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
            <div className={hidden}>
              <div className="error-msg">
                {Messages.Danger(
                  "Please make sure that you schedule a delivery date or soonest delivery."
                )}
              </div>
            </div>
          </div>
        ) : (
          <CheckoutPickup obj={obj} />
        )}
      </div>
      <div className="space-1"></div>
      <div className="field right-most">
        <div className="control">
 
          <button className="button is-success" onClick={handleClick}>
            <span className="icon">
              <FontAwesomeIcon icon={Icons.faLongArrowAltRight} />
            </span>
            <span className="uppercase">Review and Pay</span>
          </button>
        </div>
      </div>
      <div className="space-2-5"></div>
    </form>
  );
}

const DateTimeInput = forwardRef((props, ref) => {
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
const useDropdown = ({ placeholder, data }) => {
  const [value, setValue] = useState("");

  const onChange = (e) => {
    setValue(e.target.value);
  };

  return {
    value,
    onChange,
  };
};
// const DropDown = ({placeholder, data}) => {
//     const [value, setValue] = useState('');

//     return (
//         <div className="select">
//             <select>
//                 <option value="none" onClick={() => setValue("")}>{placeholder}</option>
//                 {Object.keys(data).map(x =>
//                     <option value={x} onClick={() => setValue(x)}>{data[x]}</option>
//                 )
//                 }
//             </select>
//         </div>
//     )

// }
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
    date.getMonth() +
    1 +
    "/" +
    date.getDate() +
    "/" +
    date.getFullYear() +
    " " +
    strTime
  ).toUpperCase();
}

export default CheckoutDelivery;
